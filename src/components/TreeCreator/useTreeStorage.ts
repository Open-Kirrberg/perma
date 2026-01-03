import {useState, useEffect, useCallback} from 'react';
import type {TreeEntry, InventarData} from './types';

const STORAGE_KEY = 'baumschule-inventar';

export function useTreeStorage() {
  const [trees, setTrees] = useState<TreeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data: InventarData = JSON.parse(stored);
          setTrees(data.trees || []);
        } catch (e) {
          console.error('Failed to parse stored data:', e);
        }
      }
      setLoading(false);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((updatedTrees: TreeEntry[]) => {
    const data: InventarData = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      trees: updatedTrees,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setTrees(updatedTrees);
  }, []);

  // Add a new tree
  const addTree = useCallback(
    (tree: TreeEntry) => {
      saveToStorage([...trees, tree]);
    },
    [trees, saveToStorage],
  );

  // Update an existing tree
  const updateTree = useCallback(
    (id: string, updates: Partial<TreeEntry>) => {
      const updated = trees.map((t) =>
        t.id === id ? {...t, ...updates, updatedAt: new Date().toISOString()} : t,
      );
      saveToStorage(updated);
    },
    [trees, saveToStorage],
  );

  // Delete a tree
  const deleteTree = useCallback(
    (id: string) => {
      saveToStorage(trees.filter((t) => t.id !== id));
    },
    [trees, saveToStorage],
  );

  // Export data as JSON file download
  const exportData = useCallback(() => {
    const data: InventarData = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      trees,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventar.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [trees]);

  // Import data from JSON file
  const importData = useCallback(
    (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data: InventarData = JSON.parse(e.target?.result as string);
            if (data.trees && Array.isArray(data.trees)) {
              saveToStorage(data.trees);
              resolve();
            } else {
              reject(new Error('Ungültiges Datenformat'));
            }
          } catch (err) {
            reject(new Error('Fehler beim Lesen der Datei'));
          }
        };
        reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden'));
        reader.readAsText(file);
      });
    },
    [saveToStorage],
  );

  // Check if a tree with given ID exists
  const treeExists = useCallback(
    (id: string) => {
      return trees.some((t) => t.id === id);
    },
    [trees],
  );

  return {
    trees,
    loading,
    addTree,
    updateTree,
    deleteTree,
    exportData,
    importData,
    treeExists,
  };
}
