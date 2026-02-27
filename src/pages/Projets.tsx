import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FolderOpen, BookOpen, ClipboardList, Map, ChevronRight, Edit3, Eye } from 'lucide-react';
import { projets as initialProjets, type Projet, type ProjetPhase } from '../data/mockData';
import { PhaseStatutBadge } from '../components/Badge';

const phaseOptions: ProjetPhase[] = ['Démarrage', 'Production', 'Livraison', 'Clôturé'];

export default function Projets() {
  const [data, setData] = useState<Projet[]>([...initialProjets]);
  const [filterPhase, setFilterPhase] = useState<string>('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Projet>>({});

  const filtered = data.filter(p => {
    if (filterPhase !== 'Tous' && p.phase !== filterPhase) return false;
    if (searchTerm && !p.nom.toLowerCase().includes(searchTerm.toLowerCase()) && !p.client.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  function startEdit(p: Projet) {
    setEditingId(p.id);
    setEditForm({ ...p });
  }

  function saveEdit() {
    if (!editingId) return;
    setData(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Projet : p));
    setEditingId(null);
    setEditForm({});
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Démarrage de projet</h1>
          <p className="page-header-sub">Suivez et gérez l'avancement de vos projets BIM/SIG</p>
        </div>
      </div>

      {/* Sub-navigation cards */}
      <div className="section">
        <div className="grid-4">
          {[
            { to: '/projets/ecd', icon: FolderOpen, label: 'ECD / CDE', desc: 'Choisir et configurer l\'environnement de données' },
            { to: '/projets/bep', icon: BookOpen, label: 'BEP', desc: 'Pré-BEP et Post-BEP projet' },
            { to: '/projets/tidp', icon: ClipboardList, label: 'Plans d\'information', desc: 'TIDP par discipline, MIDP consolidé' },
            { to: '/projets/sig', icon: Map, label: 'SIG', desc: 'Intégration SIG, géoréférencement' },
          ].map(item => (
            <Link key={item.to} to={item.to} className="quick-action-btn" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <item.icon className="icon" size={20} />
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.4 }} />
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: 400 }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 600 }}>
            <div className="card-header">
              <h3>Éditer le projet</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Fermer</button>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Nom du projet</label>
                <input className="form-input" value={editForm.nom || ''} onChange={e => setEditForm({ ...editForm, nom: e.target.value })} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Client</label>
                  <input className="form-input" value={editForm.client || ''} onChange={e => setEditForm({ ...editForm, client: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phase</label>
                  <select className="form-select" value={editForm.phase || ''} onChange={e => setEditForm({ ...editForm, phase: e.target.value as ProjetPhase })}>
                    {phaseOptions.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">BIM Manager</label>
                  <input className="form-input" value={editForm.bimManager || ''} onChange={e => setEditForm({ ...editForm, bimManager: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">SIG Manager</label>
                  <input className="form-input" value={editForm.sigManager || ''} onChange={e => setEditForm({ ...editForm, sigManager: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Progression (%)</label>
                <input className="form-input" type="number" min="0" max="100" value={editForm.progression || 0} onChange={e => setEditForm({ ...editForm, progression: parseInt(e.target.value) })} />
              </div>
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={saveEdit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            <div className="table-filter">
              <Filter size={14} />
              <select value={filterPhase} onChange={e => setFilterPhase(e.target.value)}>
                <option>Tous</option>
                {phaseOptions.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="table-filter">
              <Search size={14} />
              <input style={{ border: 'none', background: 'transparent', fontSize: 'var(--text-xs)', outline: 'none', width: 120 }} placeholder="Rechercher…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{filtered.length} projet(s)</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Projet</th>
                <th>Client / Pays</th>
                <th>Phase</th>
                <th>BIM Manager</th>
                <th>SIG Manager</th>
                <th>ECD</th>
                <th>BEP</th>
                <th>Progression</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="td-bold">{p.nom}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', fontFamily: 'var(--font-mono)' }}>{p.id}</div>
                  </td>
                  <td>
                    <div>{p.client}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{p.pays}</div>
                  </td>
                  <td><PhaseStatutBadge phase={p.phase} /></td>
                  <td>{p.bimManager}</td>
                  <td>{p.sigManager}</td>
                  <td><code style={{ fontSize: 'var(--text-xs)' }}>{p.ecdChoisi}</code></td>
                  <td style={{ fontSize: 'var(--text-xs)' }}>{p.bepStatut}</td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className={`progress-fill ${p.progression >= 80 ? 'green' : p.progression >= 40 ? '' : 'amber'}`} style={{ width: `${p.progression}%` }} />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', minWidth: 30 }}>{p.progression}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" title="Voir détails"><Eye size={14} /></button>
                      <button className="btn btn-ghost btn-sm" title="Éditer" onClick={() => startEdit(p)}><Edit3 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
