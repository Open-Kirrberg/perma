import React, {useRef, useState} from 'react';
import styles from './styles.module.css';

interface ImportExportProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  treeCount: number;
}

export default function ImportExport({
  onExport,
  onImport,
  treeCount,
}: ImportExportProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error'; text: string} | null>(
    null,
  );

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImporting(true);
      setMessage(null);
      try {
        await onImport(file);
        setMessage({type: 'success', text: 'Daten erfolgreich importiert!'});
      } catch (err) {
        setMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Import fehlgeschlagen',
        });
      } finally {
        setImporting(false);
        e.target.value = ''; // Reset for re-upload
      }
    }
  };

  return (
    <div className={styles.importExport}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{display: 'none'}}
      />

      <div className={styles.importExportButtons}>
        <button
          onClick={handleImportClick}
          className="button button--secondary"
          disabled={importing}>
          {importing ? 'Importiere...' : 'JSON importieren'}
        </button>

        <button
          onClick={onExport}
          className="button button--primary"
          disabled={treeCount === 0}>
          JSON exportieren ({treeCount})
        </button>
      </div>

      {message && (
        <div
          className={`${styles.message} ${message.type === 'error' ? styles.messageError : styles.messageSuccess}`}>
          {message.text}
        </div>
      )}

      <p className={styles.importExportHint}>
        Exportierte Datei nach <code>data/inventar.json</code> kopieren und committen,
        um sie mit anderen zu teilen.
      </p>
    </div>
  );
}
