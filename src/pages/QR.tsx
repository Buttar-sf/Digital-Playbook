import { useState } from 'react';
import { Plus, Filter, Search, Paperclip, Clock, Download } from 'lucide-react';
import { questionsReponses as initialData, type QuestionReponse, type QRStatut } from '../data/mockData';

const statutOptions: QRStatut[] = ['Ouverte', 'En attente', 'Répondue', 'Clôturée'];
const themes = ['Tous', 'BEP', 'ECD', 'TIDP', 'SIG'];

export default function QR() {
  const [data, setData] = useState<QuestionReponse[]>([...initialData]);
  const [filterStatut, setFilterStatut] = useState('Tous');
  const [filterTheme, setFilterTheme] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = data.filter(q => {
    if (filterStatut !== 'Tous' && q.statut !== filterStatut) return false;
    if (filterTheme !== 'Tous' && q.theme !== filterTheme) return false;
    if (searchTerm && !q.question.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  function handleStatutChange(id: string, newStatut: QRStatut) {
    setData(prev => prev.map(q => q.id === id ? { ...q, statut: newStatut } : q));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Q/R — Questions–Réponses MOA</h1>
          <p className="page-header-sub">Registre central des questions avec traçabilité et relances</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Download size={16} /> Exporter</button>
          <button className="btn btn-primary" onClick={() => setShowNew(!showNew)}><Plus size={16} /> Nouvelle question</button>
        </div>
      </div>

      {/* New question form */}
      {showNew && (
        <div className="card section">
          <div className="card-header"><h3>Poser une nouvelle question</h3></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Question</label>
              <textarea className="form-textarea" placeholder="Décrivez votre question…" />
            </div>
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Destinataire</label>
                <input className="form-input" placeholder="MOA / Client" />
              </div>
              <div className="form-group">
                <label className="form-label">Thème</label>
                <select className="form-select">
                  <option>BEP</option><option>ECD</option><option>TIDP</option><option>SIG</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Projet</label>
                <select className="form-select">
                  <option>LGV Bordeaux–Toulouse</option>
                  <option>Al Ain Highway</option>
                  <option>Tramway Rabat</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary">Soumettre</button>
              <button className="btn btn-secondary" onClick={() => setShowNew(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid-4 section">
        <div className="kpi-card">
          <span className="kpi-label">Total</span>
          <span className="kpi-value">{data.length}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Ouvertes</span>
          <span className="kpi-value" style={{ color: 'var(--color-warning)' }}>{data.filter(q => q.statut === 'Ouverte').length}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">En attente</span>
          <span className="kpi-value" style={{ color: 'var(--color-info)' }}>{data.filter(q => q.statut === 'En attente').length}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Répondues</span>
          <span className="kpi-value" style={{ color: 'var(--color-success)' }}>{data.filter(q => q.statut === 'Répondue').length}</span>
        </div>
      </div>

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
              <select value={filterTheme} onChange={e => setFilterTheme(e.target.value)}>
                {themes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="table-filter">
              <Search size={14} />
              <input style={{ border: 'none', background: 'transparent', fontSize: 'var(--text-xs)', outline: 'none', width: 140 }} placeholder="Rechercher…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{filtered.length} question(s)</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Réf.</th>
                <th>Question</th>
                <th>Posée par</th>
                <th>Destinataire</th>
                <th>Thème</th>
                <th>Projet</th>
                <th>Date</th>
                <th>Relance</th>
                <th>PJ</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <>
                  <tr key={q.id} style={{ cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }} className="td-bold">{q.id}</td>
                    <td style={{ maxWidth: 260 }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.question}</div>
                    </td>
                    <td>{q.poseePar}</td>
                    <td style={{ fontSize: 'var(--text-xs)' }}>{q.destinataire}</td>
                    <td><code style={{ fontSize: 11 }}>{q.theme}</code></td>
                    <td style={{ fontSize: 'var(--text-xs)' }}>{q.projetNom}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 'var(--text-xs)' }}>{q.dateCreation}</td>
                    <td>
                      {q.relanceLe ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--color-warning)' }}>
                          <Clock size={12} />{q.relanceLe}
                        </span>
                      ) : '—'}
                    </td>
                    <td>
                      {q.piecesJointes > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                          <Paperclip size={12} />{q.piecesJointes}
                        </span>
                      )}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={q.statut}
                        onChange={e => { e.stopPropagation(); handleStatutChange(q.id, e.target.value as QRStatut); }}
                        onClick={e => e.stopPropagation()}
                        style={{
                          background: q.statut === 'Ouverte' ? 'var(--color-warning-bg)' : q.statut === 'En attente' ? 'var(--color-info-bg)' : q.statut === 'Répondue' ? 'var(--color-success-bg)' : 'var(--color-gray-100)',
                          color: q.statut === 'Ouverte' ? 'var(--color-warning)' : q.statut === 'En attente' ? 'var(--color-info)' : q.statut === 'Répondue' ? 'var(--color-success)' : 'var(--color-gray-700)',
                        }}
                      >
                        {statutOptions.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expandedId === q.id && (
                    <tr key={`${q.id}-detail`}>
                      <td colSpan={10} style={{ background: 'var(--color-gray-50)', padding: 20 }}>
                        <div style={{ maxWidth: 700 }}>
                          <strong style={{ fontSize: 'var(--text-sm)' }}>Question complète :</strong>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', margin: '8px 0 16px' }}>{q.question}</p>
                          {q.reponse && (
                            <>
                              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>Réponse :</strong>
                              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', margin: '8px 0' }}>{q.reponse}</p>
                            </>
                          )}
                          {!q.reponse && (
                            <div className="alert alert-warning">
                              En attente de réponse du destinataire.
                              {q.relanceLe && <span> Prochaine relance : <strong>{q.relanceLe}</strong></span>}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
