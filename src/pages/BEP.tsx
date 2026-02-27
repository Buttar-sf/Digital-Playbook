import { useState } from 'react';
import { FileText, Download, GitCompare, Check } from 'lucide-react';
import { Badge } from '../components/Badge';

const preBepTabs = ['Organisation & RACI', 'Stratégie d\'échange', 'Usages & objectifs', 'Normes & nommage', 'Outils & versions', 'Jalons & livrables', 'Annexes'];
const postBepTabs = [...preBepTabs.slice(0, -1), 'Contrôle qualité', 'Gestion des changements', 'Sécurité & confidentialité', 'Interopérabilité', 'Annexes'];

export default function BEP() {
  const [mode, setMode] = useState<'pre' | 'post'>('pre');
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const tabs = mode === 'pre' ? preBepTabs : postBepTabs;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>BEP — BIM Execution Plan</h1>
          <p className="page-header-sub">Pré-BEP (réponse AO) et Post-BEP (contrat projet)</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><GitCompare size={16} /> Comparer aux EIR/CDC</button>
          <button className="btn btn-secondary"><Download size={16} /> Exporter PDF</button>
          <button className="btn btn-primary"><FileText size={16} /> Générer gabarit</button>
        </div>
      </div>

      {/* Toggle pre/post */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button className={`btn ${mode === 'pre' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setMode('pre'); setActiveTabIdx(0); }}>
          Pré-BEP <Badge variant="info">pré-contrat</Badge>
        </button>
        <button className={`btn ${mode === 'post' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setMode('post'); setActiveTabIdx(0); }}>
          Post-BEP <Badge variant="success">contrat projet</Badge>
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ overflowX: 'auto' }}>
        {tabs.map((tab, i) => (
          <button key={tab} className={`tab ${activeTabIdx === i ? 'active' : ''}`} onClick={() => setActiveTabIdx(i)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content per tab */}
      <div className="card">
        <div className="card-body">
          {activeTabIdx === 0 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Organisation & RACI</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 16 }}>
                Définition de l'organigramme BIM/SIG du projet et de la matrice RACI associée.
              </p>
              <div className="table-container" style={{ marginBottom: 16 }}>
                <table>
                  <thead><tr><th>Rôle</th><th>Nom</th><th>Organisation</th><th>Responsabilités clés</th></tr></thead>
                  <tbody>
                    {[
                      ['BIM Manager', 'Marie Dupont', 'Egis Structures', 'Pilotage BIM, BEP, coordination maquettes'],
                      ['SIG Manager', 'Julie Morel', 'Egis Géotechnique', 'Stratégie SIG, interop, gouvernance données'],
                      ['Chef de projet', 'Pierre Lefèvre', 'Egis V&T', 'Pilotage projet, validation livrables'],
                      ['BIM Coordinateur', 'Alain Roche', 'Egis Structures', 'Fédération, clash detection, contrôle qualité'],
                      ['Gest. documentaire', 'Claire Faure', 'Egis Bâtiments', 'Gestion ECD, circuit de validation, archivage'],
                    ].map(row => (
                      <tr key={row[1]}>
                        <td className="td-bold">{row[0]}</td>
                        <td>{row[1]}</td>
                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{row[2]}</td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTabIdx === 1 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Stratégie d'échange d'information</h4>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Format d'échange principal</label>
                  <select className="form-select" defaultValue="IFC 4.0">
                    <option>IFC 2x3</option><option>IFC 4.0</option><option>IFC 4.3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Formats complémentaires</label>
                  <input className="form-input" defaultValue="DWG, LandXML, GPKG, GeoJSON" />
                </div>
                <div className="form-group">
                  <label className="form-label">Fréquence d'échange</label>
                  <select className="form-select" defaultValue="Bi-mensuel">
                    <option>Hebdomadaire</option><option>Bi-mensuel</option><option>Mensuel</option><option>À chaque jalon</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Plateforme d'échange</label>
                  <input className="form-input" defaultValue="ACC (Autodesk Construction Cloud)" />
                </div>
              </div>
            </div>
          )}

          {activeTabIdx === 2 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Usages & objectifs BIM/SIG</h4>
              <div className="table-container">
                <table>
                  <thead><tr><th>Usage</th><th>Type</th><th>Phase</th><th>Responsable</th><th>Objectif</th></tr></thead>
                  <tbody>
                    {[
                      ['Coordination 3D', 'BIM', 'AVP → PRO', 'BIM Coordinateur', 'Détecter les clashs entre disciplines'],
                      ['Quantitatifs', 'BIM', 'PRO → EXE', 'Chef discipline', 'Extraction automatique des métrés'],
                      ['Visualisation', 'BIM', 'Toutes', 'BIM Manager', 'Revues de projet, communication MOA'],
                      ['Analyse spatiale', 'SIG', 'AVP', 'SIG Manager', 'Études d\'impact, contraintes environnementales'],
                      ['Cartographie', 'SIG', 'Toutes', 'Géomaticien', 'Cartes thématiques, overlays terrain'],
                      ['Géoréférencement', 'BIM+SIG', 'Toutes', 'BIM+SIG Managers', 'Alignement maquettes / données terrain'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td className="td-bold">{row[0]}</td>
                        <td><Badge variant={row[1] === 'BIM' ? 'info' : row[1] === 'SIG' ? 'success' : 'warning'}>{row[1]}</Badge></td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[2]}</td>
                        <td>{row[3]}</td>
                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTabIdx === 3 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Normes & conventions de nommage</h4>
              <div className="alert alert-info" style={{ marginBottom: 16 }}>
                <span>Convention de nommage conforme à la norme <strong>ISO 19650-2</strong> et aux pratiques Egis.</span>
              </div>
              <div className="form-group">
                <label className="form-label">Structure de nommage des fichiers</label>
                <code style={{ display: 'block', padding: 16, background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', lineHeight: 2 }}>
                  [Projet]-[Émetteur]-[Discipline]-[Type]-[Zone]-[Niveau]-[Numéro]-[Révision]<br />
                  Exemple : <strong>PRJ001-EGS-STR-M3-Z01-N00-0001-P01</strong>
                </code>
              </div>
              <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="form-group">
                  <label className="form-label">Classification utilisée</label>
                  <select className="form-select" defaultValue="Uniclass 2015"><option>Uniclass 2015</option><option>OmniClass</option><option>Personnalisée</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Système de coordonnées</label>
                  <input className="form-input" defaultValue="Lambert 93 (EPSG:2154)" />
                </div>
              </div>
            </div>
          )}

          {activeTabIdx === 4 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Outils & versions</h4>
              <div className="table-container">
                <table>
                  <thead><tr><th>Outil</th><th>Version</th><th>Usage</th><th>Licence</th></tr></thead>
                  <tbody>
                    {[
                      ['Revit', '2024', 'Modélisation BIM structures & bâtiments', 'Autodesk'],
                      ['Civil 3D', '2024', 'Modélisation infrastructure, routes', 'Autodesk'],
                      ['Navisworks', '2024', 'Coordination, clash detection', 'Autodesk'],
                      ['QGIS', '3.34', 'Analyses SIG, cartographie', 'Open source'],
                      ['FME', '2024', 'ETL, interopérabilité BIM ↔ SIG', 'Safe Software'],
                      ['Solibri', '2024', 'Contrôle qualité IFC, vérification règles', 'Nemetschek'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td className="td-bold">{row[0]}</td>
                        <td><code>{row[1]}</code></td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[2]}</td>
                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTabIdx === 5 && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Jalons & livrables</h4>
              <div className="table-container">
                <table>
                  <thead><tr><th>Jalon</th><th>Date</th><th>Livrables</th><th>Statut</th></tr></thead>
                  <tbody>
                    {[
                      ['Kick-off BIM', '15 avril 2025', 'Pré-BEP validé, organigramme', 'done'],
                      ['Setup ECD', '30 avril 2025', 'ECD configuré, droits attribués', 'done'],
                      ['TIDP finalisé', '15 mai 2025', 'TIDP par discipline, MIDP consolidé', 'active'],
                      ['1ère coordination', '1 juin 2025', 'Maquette fédérée AVP, rapport clashs', 'pending'],
                      ['Livraison AVP', '30 juin 2025', 'Maquettes publiées, rapports qualité', 'pending'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td className="td-bold">{row[0]}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{row[1]}</td>
                        <td style={{ fontSize: 'var(--text-xs)' }}>{row[2]}</td>
                        <td>
                          {row[3] === 'done' && <Badge variant="success"><Check size={12} /> Terminé</Badge>}
                          {row[3] === 'active' && <Badge variant="info">En cours</Badge>}
                          {row[3] === 'pending' && <Badge variant="neutral">À venir</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTabIdx >= 6 && mode === 'pre' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Annexes</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Documents annexes : gabarits, templates, références normatives, exemples.</p>
              <div className="dropzone" style={{ marginTop: 16 }}>
                <p><strong>Glissez-déposez</strong> vos annexes ici</p>
                <p style={{ fontSize: 'var(--text-xs)', marginTop: 4, color: 'var(--color-gray-400)' }}>PDF, DOCX, XLS, images</p>
              </div>
            </div>
          )}

          {activeTabIdx === 6 && mode === 'post' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Contrôle qualité</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 16 }}>
                Processus de contrôle qualité des maquettes et livrables avant publication.
              </p>
              {['Auto-contrôle par l\'auteur (checklist LOD/LOI)', 'Revue BIM Coordinateur (clashs, cohérence)', 'Validation BIM Manager (conformité BEP)', 'Contrôle gestionnaire documentaire (nommage, métadonnées)'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--color-gray-100)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{step}</span>
                </div>
              ))}
            </div>
          )}

          {activeTabIdx === 7 && mode === 'post' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Gestion des changements</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                Processus de gestion des modifications (scope changes, évolutions CDC, demandes MOA). Chaque changement est tracé avec un circuit d'approbation.
              </p>
            </div>
          )}

          {activeTabIdx === 8 && mode === 'post' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Sécurité & confidentialité</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                Politique d'accès aux données, chiffrement, NDA, gestion des comptes, audit des accès.
              </p>
            </div>
          )}

          {activeTabIdx === 9 && mode === 'post' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Interopérabilité</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 16 }}>
                Stratégie d'interopérabilité entre outils BIM, SIG et GED.
              </p>
              <div className="grid-2">
                {[
                  { from: 'Revit → IFC', desc: 'Export IFC 4.0 avec MVD Coordination View' },
                  { from: 'IFC → GPKG', desc: 'Conversion via FME pour intégration SIG' },
                  { from: 'QGIS → GeoJSON', desc: 'Export couches pour visualisation web' },
                  { from: 'Civil 3D → LandXML', desc: 'Échange axes et profils entre disciplines' },
                ].map(item => (
                  <div key={item.from} className="kpi-card">
                    <code style={{ fontSize: 'var(--text-xs)' }}>{item.from}</code>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTabIdx >= 10 && mode === 'post' && (
            <div>
              <h4 style={{ marginBottom: 16 }}>Annexes</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Documents annexes au Post-BEP.</p>
              <div className="dropzone" style={{ marginTop: 16 }}>
                <p><strong>Glissez-déposez</strong> vos annexes ici</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
