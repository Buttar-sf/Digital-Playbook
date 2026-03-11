import { responsabilitesOffres } from '../data/mockData';

export default function Responsabilites() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Table des responsabilités</h1>
          <p className="page-header-sub">Intégration du digital dans les offres — Matrice RACI des tâches AO</p>
        </div>
      </div>

      <div className="alert alert-info section">
        <strong>R</strong> = Responsable (exécute) · <strong style={{ color: 'var(--color-error)' }}>C</strong> = Consulté · <strong style={{ color: 'var(--color-gray-400)' }}>I</strong> = Informé
      </div>

      <div className="table-container">
        <div style={{ overflowX: 'auto' }}>
          <table className="raci-table">
            <thead>
              <tr>
                {responsabilitesOffres.header.map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {responsabilitesOffres.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j > 0 ? `raci-${cell}` : ''} style={j === 0 ? { fontWeight: 500, textAlign: 'left' } : undefined}>
                      {j > 0 ? (cell || '—') : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
