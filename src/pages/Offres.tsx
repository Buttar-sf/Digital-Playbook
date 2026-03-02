import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Download, Search, ArrowRightCircle, Check, X } from 'lucide-react';
import { offres as initialOffres, type Offre, type OffreStatut } from '../data/mockData';
// Badge not used directly but available for future

const statutOptions: OffreStatut[] = ['Brouillon', 'En cours', 'Soumise', 'Gagnée', 'Perdue'];

const statutColors: Record<OffreStatut, { bg: string; color: string }> = {
  Brouillon:  { bg: 'var(--color-gray-100)', color: 'var(--color-gray-700)' },
  'En cours': { bg: 'var(--color-info-bg)', color: 'var(--color-info)' },
  Soumise:    { bg: 'var(--color-shared-bg)', color: 'var(--color-shared)' },
  Gagnée:     { bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  Perdue:     { bg: 'var(--color-error-bg)', color: 'var(--color-error)' },
};

export default function Offres() {
  const navigate = useNavigate();
  const [data, setData] = useState<Offre[]>([...initialOffres]);
  const [filterStatut, setFilterStatut] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Offre>>({});
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const filtered = data.filter(o => {
    if (filterStatut !== 'Tous' && o.statut !== filterStatut) return false;
    if (searchTerm && !o.titre.toLowerCase().includes(searchTerm.toLowerCase()) && !o.client.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  function handleStatutChange(id: string, newStatut: OffreStatut) {
    setData(prev => prev.map(o => o.id === id ? { ...o, statut: newStatut } : o));
  }

  function handleConvert(offre: Offre) {
    setConvertingId(offre.id);
    setTimeout(() => { setConvertingId(null); navigate('/demarrage/bpmn'); }, 800);
  }

  function startEdit(o: Offre) { setEditingId(o.id); setEditForm({ ...o }); }
  function saveEdit() {
    if (!editingId) return;
    setData(prev => prev.map(o => o.id === editingId ? { ...o, ...editForm } as Offre : o));
    setEditingId(null);
  }

  const steps = ['Informations générales', 'Exigences BIM/SIG', 'Équipe dédiée', 'Synthèse'];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tableau des offres en cours</h1>
          <p className="page-header-sub">Intégration du digital dans les offres</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Exporter</button>
          <button className="btn btn-primary" onClick={() => { setShowWizard(true); setWizardStep(0); }}><Plus size={16} /> Nouvelle offre</button>
        </div>
      </div>

      {/* Wizard */}
      {showWizard && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 700, maxHeight: '90vh', overflow: 'auto' }}>
            <div className="card-header">
              <h3>Créer une offre</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowWizard(false)}><X size={18} /></button>
            </div>
            <div className="card-body">
              <div className="stepper">
                {steps.map((s, i) => (
                  <div key={i} style={{ display: 'contents' }}>
                    <div className={`stepper-step ${i === wizardStep ? 'active' : i < wizardStep ? 'done' : ''}`}>
                      <div className="stepper-circle">{i < wizardStep ? <Check size={14} /> : i + 1}</div>
                      <span className="stepper-label">{s}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`stepper-line ${i < wizardStep ? 'done' : ''}`} />}
                  </div>
                ))}
              </div>
              {wizardStep === 0 && (
                <div>
                  <div className="form-group"><label className="form-label">Titre de l'offre</label><input className="form-input" placeholder="Ex: LGV Bordeaux–Toulouse" /></div>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label">Client</label><input className="form-input" placeholder="Nom du client" /></div>
                    <div className="form-group"><label className="form-label">Pays</label><input className="form-input" placeholder="France" /></div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label">Deadline</label><input className="form-input" type="date" /></div>
                    <div className="form-group"><label className="form-label">Référent AO</label><select className="form-select"><option>— Sélectionner —</option><option>Marie Dupont</option><option>Thomas Bernard</option><option>Sophie Martin</option></select></div>
                  </div>
                </div>
              )}
              {wizardStep === 1 && (
                <div>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label">BIM requis ?</label><select className="form-select"><option>Oui</option><option>Non</option></select></div>
                    <div className="form-group"><label className="form-label">SIG requis ?</label><select className="form-select"><option>Oui</option><option>Non</option></select></div>
                  </div>
                  <div className="form-group"><label className="form-label">Résumé des exigences</label><textarea className="form-textarea" placeholder="Décrire les exigences BIM/SIG du CDC…" /></div>
                </div>
              )}
              {wizardStep === 2 && (
                <div>
                  {['BIM Manager', 'SIG Manager', 'Chef de projet'].map(r => (
                    <div className="form-group" key={r}><label className="form-label">{r}</label><select className="form-select"><option>— Sélectionner —</option><option>Marie Dupont</option><option>Julie Morel</option><option>Thomas Bernard</option></select></div>
                  ))}
                </div>
              )}
              {wizardStep === 3 && (
                <div className="alert alert-success"><Check size={18} style={{ flexShrink: 0 }} /> L'offre est prête à être créée.</div>
              )}
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>Précédent</button>
              {wizardStep < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setWizardStep(wizardStep + 1)}>Suivant</button>
              ) : (
                <button className="btn btn-primary" onClick={() => setShowWizard(false)} style={{ background: 'var(--egis-green-500)' }}>Créer l'offre</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 550 }}>
            <div className="card-header"><h3>Éditer l'offre</h3><button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Fermer</button></div>
            <div className="card-body">
              <div className="form-group"><label className="form-label">Titre</label><input className="form-input" value={editForm.titre || ''} onChange={e => setEditForm({ ...editForm, titre: e.target.value })} /></div>
              <div className="grid-2">
                <div className="form-group"><label className="form-label">Client</label><input className="form-input" value={editForm.client || ''} onChange={e => setEditForm({ ...editForm, client: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Statut</label>
                  <select className="form-select" value={editForm.statut || ''} onChange={e => setEditForm({ ...editForm, statut: e.target.value as OffreStatut })}>
                    {statutOptions.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={saveEdit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            <div className="table-filter">
              <Filter size={14} />
              <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
                <option>Tous</option>{statutOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="table-filter">
              <Search size={14} />
              <input style={{ border: 'none', background: 'transparent', fontSize: 'var(--text-xs)', outline: 'none', width: 120 }} placeholder="Rechercher…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{filtered.length} offre(s)</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Réf.</th><th>Titre / Client</th><th>Pays</th><th>Deadline</th><th>Référent AO</th><th>BIM</th><th>SIG</th><th>Statut</th><th>Dern. activité</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="td-bold" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{o.id}</td>
                  <td><div className="td-bold">{o.titre}</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{o.client}</div></td>
                  <td>{o.pays}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{o.deadline}</td>
                  <td>{o.referentAO}</td>
                  <td>{o.bimRequis ? '✓' : '—'}</td>
                  <td>{o.sigRequis ? '✓' : '—'}</td>
                  <td>
                    <select className="status-select" value={o.statut} onChange={e => handleStatutChange(o.id, e.target.value as OffreStatut)} style={{ background: statutColors[o.statut].bg, color: statutColors[o.statut].color }}>
                      {statutOptions.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{o.dernActivite}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => startEdit(o)} title="Éditer">✏️</button>
                      {o.statut === 'Gagnée' && (
                        <button className="btn btn-sm" onClick={() => handleConvert(o)} disabled={convertingId === o.id} style={{ background: 'var(--egis-green-500)', color: 'white', fontSize: 'var(--text-xs)' }} title="Convertir en projet">
                          {convertingId === o.id ? '…' : <><ArrowRightCircle size={12} /> Projet</>}
                        </button>
                      )}
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
