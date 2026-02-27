import { Link } from 'react-router-dom';
import {
  FileText, Rocket, FolderOpen, BookOpen, Map, ClipboardList,
  MessageSquare, ShieldCheck, TrendingUp, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { projets, offres, questionsReponses, tidpLivrables, controles } from '../data/mockData';
import { OffreStatutBadge, PhaseStatutBadge } from '../components/Badge';

export default function Accueil() {
  const offresEnCours = offres.filter(o => o.statut === 'En cours').length;
  const projetsActifs = projets.filter(p => p.phase !== 'Clôturé').length;
  const qrOuvertes = questionsReponses.filter(q => q.statut === 'Ouverte' || q.statut === 'En attente').length;
  const tidpTotal = tidpLivrables.length;
  const tidpPublished = tidpLivrables.filter(t => t.statut === 'Published').length;
  const clashsOuverts = controles.filter(c => c.type === 'Clash detection' && c.statut === 'En cours').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Accueil</h1>
          <p className="page-header-sub">Bienvenue sur l'assistant de standards numériques Egis</p>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="section">
        <div className="quick-actions">
          <Link to="/offres" className="quick-action-btn">
            <FileText className="icon" size={20} />
            Nouvelle offre AO
          </Link>
          <Link to="/projets" className="quick-action-btn">
            <Rocket className="icon" size={20} />
            Voir les projets
          </Link>
          <Link to="/projets/ecd" className="quick-action-btn">
            <FolderOpen className="icon" size={20} />
            Choisir un ECD
          </Link>
          <Link to="/projets/bep" className="quick-action-btn">
            <BookOpen className="icon" size={20} />
            Rédiger un BEP
          </Link>
          <Link to="/projets/tidp" className="quick-action-btn">
            <ClipboardList className="icon" size={20} />
            Plans d'information
          </Link>
          <Link to="/projets/sig" className="quick-action-btn">
            <Map className="icon" size={20} />
            Intégration SIG
          </Link>
          <Link to="/qr" className="quick-action-btn">
            <MessageSquare className="icon" size={20} />
            Registre Q/R
          </Link>
          <Link to="/qualite" className="quick-action-btn">
            <ShieldCheck className="icon" size={20} />
            Contrôles qualité
          </Link>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="section">
        <div className="alert alert-info">
          <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Pourquoi respecter la méthodologie ISO 19650 ?</strong>
            <p style={{ marginTop: 4 }}>
              La norme ISO 19650 structure la gestion de l'information tout au long du cycle de vie des actifs
              bâtis. En suivant ses principes — BEP (pré et post contrat), TIDP/MIDP, ECD avec statuts
              normalisés (WIP → Shared → Published → Archive) — les équipes Egis garantissent la traçabilité,
              la qualité et l'interopérabilité des livrables BIM et SIG. Cet outil vous accompagne étape par
              étape, de la réponse à l'appel d'offres jusqu'à la livraison finale.
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="section">
        <h3 className="section-title">Indicateurs clés</h3>
        <div className="grid-4">
          <div className="kpi-card">
            <span className="kpi-label">Offres en cours</span>
            <span className="kpi-value">{offresEnCours}</span>
            <span className="kpi-sub">{offres.length} offres au total</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Projets actifs</span>
            <span className="kpi-value">{projetsActifs}</span>
            <span className="kpi-sub">{projets.length} projets suivis</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">TIDP complétés</span>
            <span className="kpi-value">{Math.round((tidpPublished / tidpTotal) * 100)}%</span>
            <div className="progress-bar" style={{ marginTop: 4 }}>
              <div className="progress-fill" style={{ width: `${(tidpPublished / tidpTotal) * 100}%` }} />
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Q/R ouvertes</span>
            <span className="kpi-value">{qrOuvertes}</span>
            <span className="kpi-sub">{clashsOuverts} clash(s) en cours</span>
          </div>
        </div>
      </div>

      {/* Tasks by Role + Recent Activity */}
      <div className="grid-2">
        <div className="section">
          <h3 className="section-title">À faire — BIM Manager</h3>
          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              {[
                { icon: FileText, text: 'Analyser CDC AO — LGV Bordeaux–Toulouse', priority: 'high' },
                { icon: BookOpen, text: 'Valider pré-BEP — ONCF LGV Kénitra', priority: 'medium' },
                { icon: FolderOpen, text: 'Choisir ECD — Réseau cyclable Lyon', priority: 'medium' },
                { icon: ShieldCheck, text: 'Contrôle LOD maquettes — Pont de Nouméa', priority: 'low' },
                { icon: ClipboardList, text: 'Compléter TIDP Structure — Tramway Rabat', priority: 'high' },
              ].map((task, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 4 ? '1px solid var(--color-gray-100)' : 'none' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: task.priority === 'high' ? 'var(--color-error)' : task.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-gray-400)'
                  }} />
                  <task.icon size={16} style={{ color: 'var(--color-gray-400)', flexShrink: 0 }} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)' }}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Jalons & Conformité ISO 19650</h3>
          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              {[
                { icon: CheckCircle2, text: 'Pré-BEP soumis — Al Ain Highway', date: '20 mars', done: true },
                { icon: Clock, text: 'Deadline AO — LGV Bordeaux–Toulouse', date: '15 avril', done: false },
                { icon: Clock, text: 'TIDP Structure due — Pont de Nouméa', date: '15 mai', done: false },
                { icon: Clock, text: 'Revue MIDP consolidé — Tramway Rabat', date: '20 mai', done: false },
                { icon: CheckCircle2, text: 'ECD configuré — A69 Castres–Toulouse', date: '10 mars', done: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 4 ? '1px solid var(--color-gray-100)' : 'none' }}>
                  <item.icon size={16} style={{ color: item.done ? 'var(--color-success)' : 'var(--color-gray-400)', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: item.done ? 'var(--color-gray-400)' : 'var(--color-gray-700)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', whiteSpace: 'nowrap' }}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Offres + Projects */}
      <div className="grid-2">
        <div className="section">
          <h3 className="section-title">Offres récentes</h3>
          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              {offres.slice(0, 4).map((o, i) => (
                <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 3 ? '1px solid var(--color-gray-100)' : 'none' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.titre}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{o.client} · {o.pays}</div>
                  </div>
                  <OffreStatutBadge statut={o.statut} />
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Link to="/offres" style={{ fontSize: 'var(--text-sm)' }}>Voir toutes les offres →</Link>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Projets en cours</h3>
          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              {projets.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < projets.length - 1 ? '1px solid var(--color-gray-100)' : 'none' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-gray-800)' }}>{p.nom}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{p.client} · {p.ecdChoisi}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp size={14} style={{ color: 'var(--color-gray-400)' }} />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{p.progression}%</span>
                    <PhaseStatutBadge phase={p.phase} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Link to="/projets" style={{ fontSize: 'var(--text-sm)' }}>Voir tous les projets →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
