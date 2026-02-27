import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Download, Search, ArrowRightCircle, Check, X } from 'lucide-react';
import { offres as initialOffres, type Offre, type OffreStatut } from '../data/mockData';

const statutOptions: OffreStatut[] = ['Brouillon', 'En cours', 'Soumise', 'Gagnée', 'Perdue'];

const statutSelectColors: Record<OffreStatut, { bg: string; color: string }> = {
  Brouillon:  { bg: 'var(--color-gray-100)', color: 'var(--color-gray-700)' },
  'En cours': { bg: 'var(--color-info-bg)', color: 'var(--color-info)' },
  Soumise:    { bg: 'var(--color-shared-bg)', color: 'var(--color-shared)' },
  Gagnée:     { bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  Perdue:     { bg: 'var(--color-error-bg)', color: 'var(--color-error)' },
};

export default function Offres() {
  const navigate = useNavigate();
  const [data, setData] = useState<Offre[]>([...initialOffres]);
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterBim, setFilterBim] = useState<string>('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const filtered = data.filter(o => {
    if (filterStatut !== 'Tous' && o.statut !== filterStatut) return false;
    if (filterBim === 'BIM' && !o.bimRequis) return false;
    if (filterBim === 'SIG' && !o.sigRequis) return false;
    if (searchTerm && !o.titre.toLowerCase().includes(searchTerm.toLowerCase()) && !o.client.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  function handleStatutChange(id: string, newStatut: OffreStatut) {
    setData(prev => prev.map(o => o.id === id ? { ...o, statut: newStatut } : o));
  }

  function handleConvertToProject(offre: Offre) {
    setConvertingId(offre.id);
    setTimeout(() => {
      setConvertingId(null);
      navigate('/projets');
    }, 1000);
  }

  const wizardSteps = [
    'Import CDC & Charte BIM',
    'Constitution équipe',
    'Choix ECD',
    'Pré-BEP',
    'Livrables additionnels',
    'Revue & Soumission',
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Offres (AO)</h1>
          <p className="page-header-sub">Gérez vos réponses aux appels d'offres BIM/SIG</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Exporter</button>
          <button className="btn btn-primary" onClick={() => { setShowWizard(true); setWizardStep(0); }}><Plus size={16} /> Nouvelle offre</button>
        </div>
      </div>

      {/* Wizard Modal */}
      {showWizard && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 800, maxHeight: '90vh', overflow: 'auto' }}>
            <div className="card-header">
              <h3>Réponse à un appel d'offres</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowWizard(false)}><X size={18} /></button>
            </div>
            <div className="card-body">
              {/* Stepper */}
              <div className="stepper">
                {wizardSteps.map((step, i) => (
                  <div key={i} style={{ display: 'contents' }}>
                    <div className={`stepper-step ${i === wizardStep ? 'active' : i < wizardStep ? 'done' : ''}`}>
                      <div className="stepper-circle">{i < wizardStep ? <Check size={14} /> : i + 1}</div>
                      <span className="stepper-label">{step}</span>
                    </div>
                    {i < wizardSteps.length - 1 && <div className={`stepper-line ${i < wizardStep ? 'done' : ''}`} />}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              {wizardStep === 0 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Importer le cahier des charges et la charte BIM</h4>
                  <div className="dropzone">
                    <Download size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                    <p><strong>Glissez-déposez</strong> vos fichiers ici</p>
                    <p style={{ fontSize: 'var(--text-xs)', marginTop: 4 }}>PDF, DOCX, XLS — Max 50 Mo</p>
                  </div>
                  <div className="form-group" style={{ marginTop: 16 }}>
                    <label className="form-label">Client</label>
                    <input className="form-input" placeholder="Nom du client" />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Pays</label>
                      <input className="form-input" placeholder="France" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date limite</label>
                      <input className="form-input" type="date" />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 1 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Constitution de l'équipe projet</h4>
                  <div className="alert alert-info" style={{ marginBottom: 16 }}>
                    <span>Les rôles <strong>BIM Manager</strong> et <strong>SIG Manager</strong> sont obligatoires.</span>
                  </div>
                  {['BIM Manager *', 'SIG Manager *', 'Chef de projet', 'BIM Coordinateur', 'Gestionnaire documentaire'].map(role => (
                    <div className="form-group" key={role}>
                      <label className="form-label">{role}</label>
                      <select className="form-select"><option>— Sélectionner —</option><option>Marie Dupont</option><option>Julie Morel</option><option>Thomas Bernard</option></select>
                    </div>
                  ))}
                </div>
              )}

              {wizardStep === 2 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Choix de l'Environnement Commun de Données</h4>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>Sélectionnez l'ECD selon les exigences du projet.</p>
                  <div className="grid-3">
                    {['Autodesk ACC', 'Bentley ProjectWise', 'SharePoint / Teams'].map((ecd, i) => (
                      <div key={ecd} className="card" style={{ cursor: 'pointer', border: i === 0 ? '2px solid var(--color-primary-500)' : undefined }}>
                        <div className="card-body" style={{ textAlign: 'center', padding: 24 }}>
                          <FolderOpen size={32} style={{ color: 'var(--color-primary-500)', marginBottom: 8 }} />
                          <h4>{ecd}</h4>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', marginTop: 4 }}>
                            {i === 0 ? 'Maquettes BIM + GED intégrée' : i === 1 ? 'GED enterprise + workflows' : 'GED Microsoft 365'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Structure du Pré-BEP</h4>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>Le pré-BEP sera généré automatiquement à partir des informations saisies.</p>
                  {['Organisation & RACI', 'Stratégie d\'échange', 'Usages & objectifs BIM/SIG', 'Normes & conventions de nommage', 'Outils & versions', 'Jalons & livrables'].map(section => (
                    <div key={section} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--color-gray-100)' }}>
                      <Check size={16} style={{ color: 'var(--color-success)' }} />
                      <span style={{ fontSize: 'var(--text-sm)' }}>{section}</span>
                    </div>
                  ))}
                </div>
              )}

              {wizardStep === 4 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Livrables additionnels</h4>
                  <div className="form-group">
                    <label className="form-label">Livrables complémentaires</label>
                    <textarea className="form-textarea" placeholder="Liste des livrables additionnels demandés par le client…" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes internes</label>
                    <textarea className="form-textarea" placeholder="Commentaires pour l'équipe…" />
                  </div>
                </div>
              )}

              {wizardStep === 5 && (
                <div>
                  <h4 style={{ marginBottom: 16 }}>Revue finale & Soumission</h4>
                  <div className="alert alert-success" style={{ marginBottom: 16 }}>
                    <Check size={20} style={{ flexShrink: 0 }} />
                    <span>Tous les éléments requis sont renseignés. Le dossier de soumission est prêt à être généré.</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary">Sauvegarder brouillon</button>
                    <button className="btn btn-primary">Générer dossier de soumission</button>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>Précédent</button>
              {wizardStep < wizardSteps.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setWizardStep(wizardStep + 1)}>Suivant</button>
              ) : (
                <button className="btn btn-success" onClick={() => setShowWizard(false)}>Terminer</button>
              )}
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
                <option>Tous</option>
                {statutOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="table-filter">
              <select value={filterBim} onChange={e => setFilterBim(e.target.value)}>
                <option value="Tous">BIM / SIG</option>
                <option value="BIM">BIM requis</option>
                <option value="SIG">SIG requis</option>
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
              <tr>
                <th>Réf.</th>
                <th>Titre / Client</th>
                <th>Pays</th>
                <th>Deadline</th>
                <th>Référent AO</th>
                <th>BIM</th>
                <th>SIG</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="td-bold" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{o.id}</td>
                  <td>
                    <div className="td-bold">{o.titre}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{o.client}</div>
                  </td>
                  <td>{o.pays}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{o.deadline}</td>
                  <td>{o.referentAO}</td>
                  <td>{o.bimRequis ? '✓' : '—'}</td>
                  <td>{o.sigRequis ? '✓' : '—'}</td>
                  <td>
                    <select
                      className="status-select"
                      value={o.statut}
                      onChange={e => handleStatutChange(o.id, e.target.value as OffreStatut)}
                      style={{
                        background: statutSelectColors[o.statut].bg,
                        color: statutSelectColors[o.statut].color,
                      }}
                    >
                      {statutOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    {o.statut === 'Gagnée' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleConvertToProject(o)}
                        disabled={convertingId === o.id}
                        title="Convertir en projet"
                      >
                        {convertingId === o.id ? 'Conversion…' : <><ArrowRightCircle size={14} /> Convertir en projet</>}
                      </button>
                    )}
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

function FolderOpen(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
