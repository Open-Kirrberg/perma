import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import TreeForm from './TreeForm';
import TreeInventory from './TreeInventory';
import ImportExport from './ImportExport';
import {useTreeStorage} from './useTreeStorage';
import type {TreeEntry} from './types';
import styles from './styles.module.css';

function TreeCreatorContent(): JSX.Element {
  const {trees, loading, addTree, updateTree, deleteTree, exportData, importData} =
    useTreeStorage();
  const [showForm, setShowForm] = useState(false);
  const [editingTree, setEditingTree] = useState<TreeEntry | null>(null);

  const handleSubmit = (tree: TreeEntry) => {
    if (editingTree) {
      updateTree(tree.id, tree);
      setEditingTree(null);
    } else {
      addTree(tree);
    }
    setShowForm(false);
  };

  const handleEdit = (tree: TreeEntry) => {
    setEditingTree(tree);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTree(null);
  };

  if (loading) {
    return <div className={styles.loading}>Lade Inventar...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ImportExport
          onExport={exportData}
          onImport={importData}
          treeCount={trees.length}
        />
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className={`button button--primary button--lg ${styles.addButton}`}>
          + Neuen Baum anlegen
        </button>
      ) : (
        <div className={styles.formContainer}>
          <h3>{editingTree ? 'Baum bearbeiten' : 'Neuen Baum anlegen'}</h3>
          <TreeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingTree || undefined}
            existingIds={trees.map((t) => t.id)}
          />
        </div>
      )}

      <TreeInventory trees={trees} onEdit={handleEdit} onDelete={deleteTree} />
    </div>
  );
}

// Wrap in BrowserOnly since localStorage is not available during SSR
export default function TreeCreator(): JSX.Element {
  return (
    <BrowserOnly fallback={<div className={styles.loading}>Lade Baum-Inventar...</div>}>
      {() => <TreeCreatorContent />}
    </BrowserOnly>
  );
}
