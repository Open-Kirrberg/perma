import React, {useState, useMemo} from 'react';
import type {TreeEntry, PflegeStatus, Unterlage, Edelreis, Veredelungsart} from './types';
import {generateTreeId, getCompatibleUnterlagen} from './utils';
import styles from './styles.module.css';

// Import data
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

const PFLEGE_STATUS_OPTIONS: PflegeStatus[] = [
  'Gesund',
  'Schnitt fällig',
  'Bewässerung nötig',
  'Krankheit',
  'Schädlingsbefall',
  'Winterruhe',
];

interface TreeFormProps {
  onSubmit: (tree: TreeEntry) => void;
  onCancel?: () => void;
  initialData?: Partial<TreeEntry>;
  existingIds?: string[];
}

export default function TreeForm({
  onSubmit,
  onCancel,
  initialData,
  existingIds = [],
}: TreeFormProps): JSX.Element {
  const [selectedEdelreis, setSelectedEdelreis] = useState<string>(
    initialData?.edelreisId || '',
  );
  const [selectedUnterlage, setSelectedUnterlage] = useState<string>(
    initialData?.unterlageId || '',
  );
  const [selectedVeredelungsart, setSelectedVeredelungsart] = useState<string>(
    initialData?.veredelungsartId || '',
  );
  const [pflanzjahr, setPflanzjahr] = useState<number>(
    initialData?.pflanzjahr || new Date().getFullYear(),
  );
  const [standort, setStandort] = useState<string>(initialData?.standort || '');
  const [pflegeStatus, setPflegeStatus] = useState<PflegeStatus>(
    initialData?.pflegeStatus || 'Gesund',
  );
  const [notizen, setNotizen] = useState<string>(initialData?.notizen || '');
  const [error, setError] = useState<string>('');

  // Get selected Edelreis object
  const currentEdelreis = useMemo(
    () => allEdelreiser.find((e) => e.id === selectedEdelreis) || null,
    [selectedEdelreis],
  );

  // Filter compatible Unterlagen based on selected Edelreis
  const compatibleUnterlagen = useMemo(
    () => getCompatibleUnterlagen(unterlagenData as Unterlage[], currentEdelreis),
    [currentEdelreis],
  );

  // Auto-generated tree ID preview (with counter for uniqueness)
  const previewId = useMemo(() => {
    if (selectedUnterlage && selectedEdelreis) {
      // When editing, keep the original ID
      if (initialData?.id) {
        return initialData.id;
      }
      return generateTreeId(selectedUnterlage, selectedEdelreis, pflanzjahr, existingIds);
    }
    return '---';
  }, [selectedUnterlage, selectedEdelreis, pflanzjahr, existingIds, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedEdelreis || !selectedUnterlage || !selectedVeredelungsart) {
      setError('Bitte alle Pflichtfelder ausfüllen');
      return;
    }

    if (!standort.trim()) {
      setError('Bitte einen Standort angeben');
      return;
    }

    const now = new Date().toISOString();
    const tree: TreeEntry = {
      id: initialData?.id || generateTreeId(selectedUnterlage, selectedEdelreis, pflanzjahr, existingIds),
      unterlageId: selectedUnterlage,
      edelreisId: selectedEdelreis,
      veredelungsartId: selectedVeredelungsart,
      pflanzjahr,
      standort: standort.trim(),
      pflegeStatus,
      notizen: notizen.trim() || undefined,
      createdAt: initialData?.createdAt || now,
      updatedAt: now,
    };

    onSubmit(tree);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.idPreview}>
        <strong>Baum-ID:</strong> <code>{previewId}</code>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Edelreis Selection - First, to filter Unterlagen */}
      <div className={styles.formGroup}>
        <label htmlFor="edelreis">Edelreis (Scion) *</label>
        <select
          id="edelreis"
          value={selectedEdelreis}
          onChange={(e) => {
            setSelectedEdelreis(e.target.value);
            setSelectedUnterlage(''); // Reset unterlage when edelreis changes
          }}
          required>
          <option value="">-- Edelreis wählen --</option>
          {allEdelreiser.map((e) => (
            <option key={e.id} value={e.id}>
              {e.id} - {e.name} ({e.fruchtart})
            </option>
          ))}
        </select>
      </div>

      {/* Unterlage Selection - Filtered by Edelreis */}
      <div className={styles.formGroup}>
        <label htmlFor="unterlage">Unterlage (Rootstock) *</label>
        <select
          id="unterlage"
          value={selectedUnterlage}
          onChange={(e) => setSelectedUnterlage(e.target.value)}
          required
          disabled={!selectedEdelreis}>
          <option value="">-- Unterlage wählen --</option>
          {compatibleUnterlagen.map((u) => (
            <option key={u.id} value={u.id}>
              {u.id} - {u.name} ({u.typ})
            </option>
          ))}
        </select>
        {!selectedEdelreis && (
          <small className={styles.hint}>Bitte zuerst Edelreis wählen</small>
        )}
      </div>

      {/* Veredelungsart Selection */}
      <div className={styles.formGroup}>
        <label htmlFor="veredelungsart">Veredelungsart *</label>
        <select
          id="veredelungsart"
          value={selectedVeredelungsart}
          onChange={(e) => setSelectedVeredelungsart(e.target.value)}
          required>
          <option value="">-- Veredelungsart wählen --</option>
          {(veredelungsartenData as Veredelungsart[]).map((v) => (
            <option key={v.id} value={v.id}>
              {v.id} - {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pflanzjahr */}
      <div className={styles.formGroup}>
        <label htmlFor="pflanzjahr">Pflanzjahr *</label>
        <input
          id="pflanzjahr"
          type="number"
          min="2000"
          max="2100"
          value={pflanzjahr}
          onChange={(e) => setPflanzjahr(parseInt(e.target.value, 10))}
          required
        />
      </div>

      {/* Standort */}
      <div className={styles.formGroup}>
        <label htmlFor="standort">Standort *</label>
        <input
          id="standort"
          type="text"
          value={standort}
          onChange={(e) => setStandort(e.target.value)}
          placeholder="z.B. Garten West, Feld Nord"
          required
        />
      </div>

      {/* Pflege-Status */}
      <div className={styles.formGroup}>
        <label htmlFor="pflegeStatus">Pflege-Status</label>
        <select
          id="pflegeStatus"
          value={pflegeStatus}
          onChange={(e) => setPflegeStatus(e.target.value as PflegeStatus)}>
          {PFLEGE_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Notizen */}
      <div className={styles.formGroup}>
        <label htmlFor="notizen">Notizen (optional)</label>
        <textarea
          id="notizen"
          value={notizen}
          onChange={(e) => setNotizen(e.target.value)}
          placeholder="Zusätzliche Informationen..."
          rows={3}
        />
      </div>

      {/* Buttons */}
      <div className={styles.formActions}>
        <button type="submit" className="button button--primary">
          {initialData ? 'Änderungen speichern' : 'Baum anlegen'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="button button--secondary">
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
}
