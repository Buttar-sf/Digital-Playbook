import { useState } from 'react';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import { controles as initialControles, type Controle } from '../data/mockData';
import { ControleStatutBadge } from '../components/Badge';

export default function Qualite() {
  const [activeTab, setActiveTab] = useState<'controles' | 'rapports'>('controles');
  const [data] = useState<Controle[]>([...initialControles]);

  const conforme = data.filter(c => c.statut === 'Conforme').length;
  const nonConforme = data.filter(c => c.statut === 'Non-conforme').length;
  const enCours = data.filter(c => c.statut === 'En cours').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Qualité</h1>
          <p className="page-header-sub">Contrôles, validations et rapports de conformité</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Exporter rapport</button>
          <button className="btn btn-primary"><ShieldCheck size={16} /> Nouveau contrôle</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-4 section">
        <div className="kpi-card">
          <span className="kpi-label">Total contrôles</span>
          <span className="kpi-value">{data.length}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Conformes</span>
          <span className="kpi-value" style={{ color: 'var(--color-success)' }}>{conforme}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Non-conformes</span>
          <span className="kpi-value" style={{ color: 'var(--color-error)' }}>{nonConforme}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">En cours</span>
          <span className="kpi-value" style={{ color: 'var(--color-info)' }}>{enCours}</span>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'controles' ? 'active' : ''}`} onClick={() => setActiveTab('controles')}>Contrôles</button>
        <button className={`tab ${activeTab === 'rapports' ? 'active' : ''}`} onClick={() => setActiveTab('rapports')}>Rapports de conformité</button>
      </div>

      {activeTab === 'controles' && (
        <div className="table-container">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Réf.</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Projet</th>
                  <th>Date</th>
                  <th>Responsable</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {data.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }} className="td-bold">{c.id}</td>
                    <td className="td-bold">{c.type}</td>
                    <td style={{ fontSize: 'var(--text-sm)', maxWidth: 300 }}>{c.description}</td>
                    <td>{c.projetNom}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{c.date}</td>
                    <td>{c.responsable}</td>
                    <td><ControleStatutBadge statut={c.statut} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rapports' && (
        <div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <h3>Checklist pré-publication</h3>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {[
                  { label: 'Convention de nommage ISO 19650', checked: true },
                  { label: 'LOD conforme au BEP', checked: true },
                  { label: 'LOI conforme au BEP', checked: false },
                  { label: 'Classification Uniclass appliquée', checked: true },
                  { label: 'Géoréférencement vérifié', checked: false },
                  { label: 'Clash detection exécuté', checked: false },
                  { label: 'Métadonnées complètes', checked: true },
                  { label: 'Revue BIM Coordinateur', checked: true },
                  { label: 'Validation BIM Manager', checked: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid var(--color-gray-100)' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, border: '2px solid', flexShrink: 0,
                      borderColor: item.checked ? 'var(--color-success)' : 'var(--color-gray-300)',
                      background: item.checked ? 'var(--color-success)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.checked && <CheckCircle2 size={14} color="white" />}
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', color: item.checked ? 'var(--color-gray-500)' : 'var(--color-gray-800)', textDecoration: item.checked ? 'line-through' : 'none' }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: '56%' }} />
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>5/9 complétés</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Historique des non-conformités</h3>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {[
                  { date: '2025-03-24', projet: 'Tramway Rabat', issue: 'LOD maquettes structure insuffisant (200 au lieu de 300)', severity: 'Majeure', resolution: 'Correction en cours par Karim Bennani' },
                  { date: '2025-03-20', projet: 'Pont de Nouméa', issue: 'Nommage fichiers non conforme lot 3', severity: 'Mineure', resolution: 'Corrigé et re-publié le 22/03' },
                  { date: '2025-03-15', projet: 'A69 Castres', issue: 'Métadonnées IFC incomplètes (auteur, version)', severity: 'Mineure', resolution: 'Corrigé via script batch' },
                  { date: '2025-03-10', projet: 'Tramway Rabat', issue: 'Clash non résolu structure/route au PK 3+200', severity: 'Majeure', resolution: 'Réunion coordination planifiée' },
                ].map((nc, i) => (
                  <div key={i} style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-gray-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <AlertTriangle size={14} style={{ color: nc.severity === 'Majeure' ? 'var(--color-error)' : 'var(--color-warning)', flexShrink: 0 }} />
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{nc.issue}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', display: 'flex', gap: 16 }}>
                      <span>{nc.date}</span>
                      <span>{nc.projet}</span>
                      <span style={{ color: nc.severity === 'Majeure' ? 'var(--color-error)' : 'var(--color-warning)' }}>{nc.severity}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)', marginTop: 4 }}>
                      <FileText size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      {nc.resolution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
