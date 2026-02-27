import { useState } from 'react';
import { Map, Globe, Layers, Database, RefreshCw, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/Badge';

export default function SIG() {
  const [activeTab, setActiveTab] = useState<'integration' | 'coordonnees' | 'usages'>('integration');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>SIG — Intégration & cas d'usage</h1>
          <p className="page-header-sub">Géoréférencement, interopérabilité BIM–SIG, gouvernance données spatiales</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'integration' ? 'active' : ''}`} onClick={() => setActiveTab('integration')}>Étapes d'intégration</button>
        <button className={`tab ${activeTab === 'coordonnees' ? 'active' : ''}`} onClick={() => setActiveTab('coordonnees')}>Système de coordonnées</button>
        <button className={`tab ${activeTab === 'usages' ? 'active' : ''}`} onClick={() => setActiveTab('usages')}>Cas d'usage SIG</button>
      </div>

      {activeTab === 'integration' && (
        <div className="card">
          <div className="card-body">
            <h4 style={{ marginBottom: 20 }}>Étapes d'intégration SIG — ISO 19650</h4>
            {[
              { icon: Database, title: 'Analyse des exigences SIG', desc: 'Identifier les données géospatiales requises (cadastre, ortho, MNT, réseaux). Vérifier les exigences EIR/CDC.', status: 'done' },
              { icon: Layers, title: 'Définition des cas d\'usage', desc: 'Cartographie thématique, analyse spatiale, suivi chantier, overlays contraintes environnementales.', status: 'done' },
              { icon: Globe, title: 'Géoréférencement', desc: 'Définir le SCR projet, point d\'origine, calibration avec maquettes BIM. Vérifier cohérence Lambert 93 / WGS84.', status: 'active' },
              { icon: RefreshCw, title: 'Interopérabilité BIM–SIG', desc: 'Pipeline de conversion IFC ↔ GPKG / GeoJSON via FME. Tests d\'intégration maquettes + couches SIG.', status: 'active' },
              { icon: Map, title: 'Gouvernance données spatiales', desc: 'Fréquence de synchronisation, responsabilités, versionnement des couches, archivage.', status: 'pending' },
              { icon: ShieldCheck, title: 'QA SIG', desc: 'Contrôle topologie, validation attributs, vérification projections, complétude des métadonnées.', status: 'pending' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < 5 ? '1px solid var(--color-gray-100)' : 'none' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: step.status === 'done' ? 'var(--color-success-bg)' : step.status === 'active' ? 'var(--color-info-bg)' : 'var(--color-gray-100)',
                  color: step.status === 'done' ? 'var(--color-success)' : step.status === 'active' ? 'var(--color-info)' : 'var(--color-gray-400)',
                }}>
                  <step.icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>{step.title}</strong>
                    {step.status === 'done' && <Badge variant="success">Terminé</Badge>}
                    {step.status === 'active' && <Badge variant="info">En cours</Badge>}
                    {step.status === 'pending' && <Badge variant="neutral">À faire</Badge>}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'coordonnees' && (
        <div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header"><h3>Paramétrage système de coordonnées</h3></div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">SCR projet (principal)</label>
                  <select className="form-select" defaultValue="EPSG:2154">
                    <option value="EPSG:2154">Lambert 93 — EPSG:2154</option>
                    <option value="EPSG:32631">UTM Zone 31N — EPSG:32631</option>
                    <option value="EPSG:4326">WGS 84 — EPSG:4326</option>
                    <option value="EPSG:3857">Web Mercator — EPSG:3857</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">SCR secondaire (échange)</label>
                  <select className="form-select" defaultValue="EPSG:4326">
                    <option value="EPSG:4326">WGS 84 — EPSG:4326</option>
                    <option value="EPSG:3857">Web Mercator — EPSG:3857</option>
                  </select>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Point d'origine X (Est)</label>
                    <input className="form-input" defaultValue="843 456.789" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Point d'origine Y (Nord)</label>
                    <input className="form-input" defaultValue="6 328 123.456" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Altitude de référence (NGF/IGN69)</label>
                  <input className="form-input" defaultValue="45.00 m" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Conversions & vérifications</h3></div>
              <div className="card-body">
                <div className="alert alert-info" style={{ marginBottom: 16 }}>
                  Les maquettes BIM doivent être calées sur le même point d'origine que les couches SIG. Utiliser le pipeline FME pour vérifier la cohérence.
                </div>
                <div className="table-container">
                  <table>
                    <thead><tr><th>Conversion</th><th>Outil</th><th>Statut</th></tr></thead>
                    <tbody>
                      {[
                        ['Lambert 93 → WGS84', 'FME / PROJ', 'Validé'],
                        ['IFC → GPKG (géolocalisé)', 'FME', 'En test'],
                        ['DWG → GeoJSON', 'QGIS + ogr2ogr', 'À configurer'],
                        ['BIM origin → SCR projet', 'Revit shared coords', 'Validé'],
                      ].map(row => (
                        <tr key={row[0]}>
                          <td style={{ fontSize: 'var(--text-xs)' }}><code>{row[0]}</code></td>
                          <td style={{ fontSize: 'var(--text-xs)' }}>{row[1]}</td>
                          <td>
                            <Badge variant={row[2] === 'Validé' ? 'success' : row[2] === 'En test' ? 'info' : 'neutral'}>{row[2]}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usages' && (
        <div>
          <h3 className="section-title">Cas d'usage SIG du projet</h3>
          <div className="grid-3">
            {[
              { title: 'Cartographie des contraintes', desc: 'Zones protégées, servitudes, risques naturels', format: 'GPKG / GeoJSON', freq: 'Mensuel', responsable: 'Géomaticien' },
              { title: 'Suivi avancement chantier', desc: 'Overlays progression sur fond ortho', format: 'GeoJSON / WMS', freq: 'Hebdomadaire', responsable: 'SIG Manager' },
              { title: 'Analyse d\'impact', desc: 'Buffer zones, études de bruit, trafic', format: 'GPKG', freq: 'Par phase', responsable: 'Géomaticien' },
              { title: 'Intégration cadastrale', desc: 'Parcelles, propriétaires, emprises', format: 'GPKG / SHP', freq: 'Initial + MAJ', responsable: 'SIG Manager' },
              { title: 'Jumeau numérique terrain', desc: 'MNT/MNS + maquettes BIM géolocalisées', format: 'IFC + GPKG + LAS', freq: 'Par jalon', responsable: 'BIM + SIG Managers' },
              { title: 'Dashboard MOA', desc: 'Cartes interactives KPI projet', format: 'WMS / WMTS', freq: 'Temps réel', responsable: 'SIG Manager' },
            ].map(usage => (
              <div key={usage.title} className="card">
                <div className="card-body">
                  <h4 style={{ marginBottom: 8 }}>{usage.title}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 12 }}>{usage.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Format</span>
                      <code style={{ fontSize: 11 }}>{usage.format}</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Fréquence</span>
                      <span>{usage.freq}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Responsable</span>
                      <span>{usage.responsable}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
