import React, {useState, useMemo} from 'react';
import type {TreeEntry, Unterlage, Edelreis, Veredelungsart} from './types';
import styles from './styles.module.css';

// Import lookup data
import unterlagenData from '@site/data/unterlagen.json';
import apfel from '@site/data/apfel.json';
import birne from '@site/data/birne.json';
import kirsche from '@site/data/kirsche.json';
import mirabelle from '@site/data/mirabelle.json';
import pflaumen from '@site/data/pflaumen.json';
import pfirsiche from '@site/data/pfirsiche.json';
import veredelungsartenData from '@site/data/veredelungsarten.json';

const allEdelreiser: Edelreis[] = [
  ...apfel,
  ...birne,
  ...kirsche,
  ...mirabelle,
  ...pflaumen,
  ...pfirsiche,
] as Edelreis[];

interface TreeInventoryProps {
  trees: TreeEntry[];
  onEdit?: (tree: TreeEntry) => void;
  onDelete?: (id: string) => void;
}

export default function TreeInventory({
  trees,
  onEdit,
  onDelete,
}: TreeInventoryProps): JSX.Element {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof TreeEntry>('pflanzjahr');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Create lookup maps for display names
  const unterlagenMap = useMemo(
    () => new Map((unterlagenData as Unterlage[]).map((u) => [u.id, u])),
    [],
  );
  const edelreiserMap = useMemo(() => new Map(allEdelreiser.map((e) => [e.id, e])), []);
  const veredelungsartenMap = useMemo(
    () => new Map((veredelungsartenData as Veredelungsart[]).map((v) => [v.id, v])),
    [],
  );

  // Filter and sort trees
  const displayedTrees = useMemo(() => {
    let filtered = trees.filter((tree) => {
      const unterlage = unterlagenMap.get(tree.unterlageId);
      const edelreis = edelreiserMap.get(tree.edelreisId);
      const searchLower = search.toLowerCase();

      return (
        tree.id.toLowerCase().includes(searchLower) ||
        tree.standort.toLowerCase().includes(searchLower) ||
        unterlage?.name.toLowerCase().includes(searchLower) ||
        edelreis?.name.toLowerCase().includes(searchLower)
      );
    });

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [trees, search, sortBy, sortOrder, unterlagenMap, edelreiserMap]);

  // Get status badge class
  const getStatusClass = (status: string): string => {
    const statusClasses: Record<string, string> = {
      Gesund: styles.statusGesund,
      'Schnitt fällig': styles.statusSchnitt,
      'Bewässerung nötig': styles.statusWasser,
      Krankheit: styles.statusKrank,
      Schädlingsbefall: styles.statusSchaedling,
      Winterruhe: styles.statusWinter,
    };
    return statusClasses[status] || '';
  };

  if (trees.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Noch keine Bäume im Inventar.</p>
        <p>Erstelle deinen ersten Baum mit dem Formular oben!</p>
      </div>
    );
  }

  return (
    <div className={styles.inventory}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Suchen nach ID, Name, Standort..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field as keyof TreeEntry);
            setSortOrder(order as 'asc' | 'desc');
          }}
          className={styles.sortSelect}>
          <option value="pflanzjahr-desc">Pflanzjahr (neueste)</option>
          <option value="pflanzjahr-asc">Pflanzjahr (älteste)</option>
          <option value="standort-asc">Standort (A-Z)</option>
          <option value="pflegeStatus-asc">Pflege-Status</option>
          <option value="createdAt-desc">Zuletzt hinzugefügt</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Baum-ID</th>
              <th>Edelreis</th>
              <th>Unterlage</th>
              <th>Veredelung</th>
              <th>Jahr</th>
              <th>Standort</th>
              <th>Status</th>
              {(onEdit || onDelete) && <th>Aktionen</th>}
            </tr>
          </thead>
          <tbody>
            {displayedTrees.map((tree) => {
              const unterlage = unterlagenMap.get(tree.unterlageId);
              const edelreis = edelreiserMap.get(tree.edelreisId);
              const veredelungsart = veredelungsartenMap.get(tree.veredelungsartId);

              return (
                <tr key={tree.id}>
                  <td>
                    <code className={styles.treeId}>{tree.id}</code>
                  </td>
                  <td title={edelreis?.beschreibung}>
                    <strong>{edelreis?.name || tree.edelreisId}</strong>
                    <br />
                    <small>{edelreis?.fruchtart}</small>
                  </td>
                  <td title={unterlage?.beschreibung}>
                    {unterlage?.name || tree.unterlageId}
                  </td>
                  <td title={veredelungsart?.beschreibung}>
                    {veredelungsart?.name || tree.veredelungsartId}
                  </td>
                  <td>{tree.pflanzjahr}</td>
                  <td>{tree.standort}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(tree.pflegeStatus)}`}>
                      {tree.pflegeStatus}
                    </span>
                  </td>
                  {(onEdit || onDelete) && (
                    <td className={styles.actions}>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(tree)}
                          className={styles.actionButton}
                          title="Bearbeiten">
                          Bearbeiten
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(`Baum ${tree.id} wirklich löschen?`)
                            ) {
                              onDelete(tree.id);
                            }
                          }}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Löschen">
                          Löschen
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.summary}>
        Zeige {displayedTrees.length} von {trees.length} Bäumen
      </div>
    </div>
  );
}
