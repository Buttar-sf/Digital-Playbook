import { useState } from 'react';
import { Download, Filter, Search, Bell } from 'lucide-react';
import { tidpLivrables as initialData, type TIDPLivrable, type DocStatut } from '../data/mockData';

const statutOptions: DocStatut[] = ['WIP', 'Shared', 'Published', 'Archive'];

export default function TIDP() {
  const [activeTab, setActiveTab] = useState<'tidp' | 'midp'>('tidp');
  const [data, setData] = useState<TIDPLivrable[]>([...initialData]);
  const [filterDiscipline, setFilterDiscipline] = useState('Tous');
  const [filterStatut, setFilterStatut] = useState('Tous');

  const disciplines = ['Tous', ...Array.from(new Set(data.map(t => t.discipline)))];
  const filtered = data.filter(t => {
    if (filterDiscipline !== 'Tous' && t.discipline !== filterDiscipline) return false;
    if (filterStatut !== 'Tous' && t.statut !== filterStatut) return false;
    return true;
  });

  function handleStatutChange(id: string, newStatut: DocStatut) {
    setData(prev => prev.map(t => t.id === id ? { ...t, statut: newStatut } : t));
  }

  const milestones = [
    { date: '20 avr.', label: 'TIDP SIG dû', items: 2, color: 'var(--color-info)' },
    { date: '25 avr.', label: 'Modèle géol. dû', items: 1, color: 'var(--color-warning)' },
    { date: '30 avr.', label: 'Axe route dû', items: 1, color: 'var(--color-info)' },
    { date: '15 mai', label: 'Maquettes OA', items: 2, color: 'var(--color-error)' },
    { date: '10 mai', label: 'Carte contraintes', items: 1, color: 'var(--color-warning)' },
    { date: '1 juin', label: 'Maq. fédérée AVP', items: 1, color: 'var(--color-primary-500)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Plans d'information</h1>
          <p className="page-header-sub">TIDP par discipline & MIDP consolidé</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Bell size={16} /> Notifications</button>
          <button className="btn btn-secondary"><Download size={16} /> Exporter Excel</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'tidp' ? 'active' : ''}`} onClick={() => setActiveTab('tidp')}>TIDP — Par discipline</button>
        <button className={`tab ${activeTab === 'midp' ? 'active' : ''}`} onClick={() => setActiveTab('midp')}>MIDP — Consolidé</button>
      </div>

      {activeTab === 'tidp' && (
        <div className="table-container">
          <div className="table-toolbar">
            <div className="table-toolbar-left">
              <div className="table-filter">
                <Filter size={14} />
                <select value={filterDiscipline} onChange={e => setFilterDiscipline(e.target.value)}>
                  {disciplines.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="table-filter">
                <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
                  <option value="Tous">Tous statuts</option>
                  {statutOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="table-filter">
                <Search size={14} />
                <input style={{ border: 'none', background: 'transparent', fontSize: 'var(--text-xs)', outline: 'none', width: 100 }} placeholder="Rechercher…" />
              </div>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{filtered.length} livrable(s)</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Discipline</th>
                  <th>Livrable</th>
                  <th>Propriétaire</th>
                  <th>Dépendances</th>
                  <th>Format</th>
                  <th>LOD</th>
                  <th>LOI</th>
                  <th>Échéance</th>
                  <th>Statut</th>
                  <th>Validateurs</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id}>
                    <td className="td-bold">{t.discipline}</td>
                    <td>{t.livrable}</td>
                    <td>{t.proprietaire}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{t.dependances}</td>
                    <td><code style={{ fontSize: 'var(--text-xs)' }}>{t.format}</code></td>
                    <td style={{ textAlign: 'center' }}>{t.lod}</td>
                    <td style={{ textAlign: 'center' }}>{t.loi}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{t.dateEcheance}</td>
                    <td>
                      <select
                        className="status-select"
                        value={t.statut}
                        onChange={e => handleStatutChange(t.id, e.target.value as DocStatut)}
                        style={{
                          background: t.statut === 'WIP' ? 'var(--color-wip-bg)' : t.statut === 'Shared' ? 'var(--color-shared-bg)' : t.statut === 'Published' ? 'var(--color-published-bg)' : 'var(--color-archive-bg)',
                          color: t.statut === 'WIP' ? 'var(--color-wip)' : t.statut === 'Shared' ? 'var(--color-shared)' : t.statut === 'Published' ? 'var(--color-published)' : 'var(--color-archive)',
                        }}
                      >
                        {statutOptions.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)' }}>{t.validateurs.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'midp' && (
        <div>
          <h3 className="section-title">MIDP — Gantt des livrables</h3>
          <div className="card">
            <div className="card-body">
              <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
                {milestones.map((m, i) => (
                  <div key={i} style={{ flex: '1 0 140px', textAlign: 'center', padding: '16px 8px', position: 'relative' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: m.color, margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: 4 }}>{m.date}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)', marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)' }}>{m.items} livrable(s)</div>
                    {i < milestones.length - 1 && (
                      <div style={{ position: 'absolute', top: 21, left: '50%', width: '100%', height: 2, background: 'var(--color-gray-200)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Summary table */}
              <div className="table-container" style={{ marginTop: 24 }}>
                <table>
                  <thead>
                    <tr><th>Jalon</th><th>Livrables associés</th><th>Validation</th><th>Risque</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ['TIDP SIG dû', 'Cadastre GPKG, Carte contraintes', 'SIG Manager → Chef projet', 'Faible'],
                      ['Maquettes OA dues', 'Tablier IFC, Appuis IFC', 'BIM Coord. → BIM Manager', 'Moyen'],
                      ['Maq. fédérée AVP', 'Maquette fédérée toutes disciplines', 'BIM Manager → Chef projet → MOA', 'Élevé'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td className="td-bold">{row[0]}</td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[1]}</td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[2]}</td>
                        <td>{
                          row[3] === 'Élevé' ? <span style={{ color: 'var(--color-error)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>● Élevé</span> :
                          row[3] === 'Moyen' ? <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>● Moyen</span> :
                          <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>● Faible</span>
                        }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
