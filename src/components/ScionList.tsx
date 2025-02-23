import React, { useState } from 'react';
// Importiert die JSON-Daten (Pfad anpassen, falls nötig)
import apples from '../../data/apfel.json';
import pears from '../../data/birne.json';
import cherries from '../../data/kirsche.json';
import mirabelle from '../../data/mirabelle.json';
import pflaumen from '../../data/pflaumen.json';
import pfirsiche from '../../data/pfirsiche.json';


// Alle Daten zusammenführen
const allScions = [...apples, ...pears, ...cherries, ...mirabelle, ...pflaumen, ...pfirsiche];

export default function ScionList() {
  const [search, setSearch] = useState('');

  const filteredScions = allScions.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.fruchtart.toLowerCase().includes(search.toLowerCase()) ||
    item.beschreibung.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <input 
         type="text" 
         placeholder="Filter suchen..." 
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         style={{ padding: '8px', marginBottom: '12px', width: '100%', fontSize: '1rem' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name / Sorte</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fruchtart</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Beschreibung</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {filteredScions.map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.fruchtart}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.beschreibung}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Details
                </a>
              </td>
            </tr>
          ))}
          {filteredScions.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>
                Kein Eintrag gefunden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
