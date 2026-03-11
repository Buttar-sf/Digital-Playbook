import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Rocket, Info } from 'lucide-react';
import { GlossaryTerm } from '../components/Tooltip';

export default function Accueil() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Accueil</h1>
          <p className="page-header-sub">Egis Digital Standards Assistant — Business Line Transport & Territoire</p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="section">
        <div className="quick-actions">
          <Link to="/methodologies/introduction" className="quick-action-btn">
            <BookOpen className="icon" size={22} />
            <div>
              <strong>Méthodologie</strong>
              <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: 400 }}>
                Guide et principes
              </span>
            </div>
          </Link>
          <Link to="/offres/tableau" className="quick-action-btn">
            <Briefcase className="icon" size={22} />
            <div>
              <strong>Nouvelle offre</strong>
              <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: 400 }}>
                Créer un dossier AO
              </span>
            </div>
          </Link>
          <Link to="/demarrage/bpmn" className="quick-action-btn">
            <Rocket className="icon" size={22} />
            <div>
              <strong>Nouveau projet</strong>
              <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: 400 }}>
                Démarrer un projet
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* ISO 19650 importance */}
      <div className="section">
        <div className="card">
          <div className="card-body" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-md)',
              background: 'var(--egis-green-50)', color: 'var(--egis-green-600)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Info size={22} />
            </div>
            <div>
              <h3 style={{ marginBottom: 8, color: 'var(--egis-green-700)' }}>L'importance du respect des normes ISO 19650</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)' }}>
                La norme <GlossaryTerm term="BIM" /> ISO 19650 structure la gestion de l'information tout au long du cycle de vie des actifs bâtis.
                En suivant ses principes — <GlossaryTerm term="BEP" /> (pré et post contrat), <GlossaryTerm term="TIDP" />/<GlossaryTerm term="MIDP" />,
                {' '}<GlossaryTerm term="ECD" /> avec statuts normalisés — les équipes Egis garantissent la traçabilité, la qualité et
                l'interopérabilité des livrables <GlossaryTerm term="BIM" /> et <GlossaryTerm term="SIG" />.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)', marginTop: 8 }}>
                La standardisation des solutions numériques constitue une nécessité stratégique pour répondre efficacement
                aux exigences de nos clients. Ce guide accompagne la mise en œuvre du processus <GlossaryTerm term="BIM" /> à l'échelle
                de la Business Line Transport et Territoire, de la réponse à l'<GlossaryTerm term="AO" /> jusqu'à la livraison finale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections overview */}
      <div className="section">
        <h3 className="section-title">Explorez le guide</h3>
        <div className="grid-2">
          {[
            {
              to: '/methodologies/introduction',
              title: 'Introduction & méthodologie',
              desc: 'Cadre structuré pour la standardisation des solutions numériques BIM-SIG. Quatre axes majeurs : exigences, organisation, environnement, production.',
              color: 'var(--egis-green-400)',
            },
            {
              to: '/offres/processus',
              title: 'Intégration du digital dans les offres',
              desc: 'Nouveau processus de structuration des offres, BPMN des tâches, rôles et responsabilités pour une réponse optimale aux AO.',
              color: 'var(--role-referent-ao)',
            },
            {
              to: '/demarrage/bpmn',
              title: 'Démarrage de projet',
              desc: 'Processus de démarrage, organisation des équipes, contrôle qualité. Du kick-off à la mise en production.',
              color: 'var(--color-info)',
            },
            {
              to: '/documentation',
              title: 'Documentation & glossaire',
              desc: 'Référentiels normatifs, acronymes, définitions. Tout le vocabulaire BIM-SIG standardisé pour les projets Egis.',
              color: 'var(--color-gray-500)',
            },
          ].map(item => (
            <Link key={item.to} to={item.to} className="card" style={{ textDecoration: 'none', transition: 'all var(--transition-fast)' }}>
              <div className="card-body">
                <div style={{ width: '100%', height: 4, background: item.color, borderRadius: 2, marginBottom: 16 }} />
                <h4 style={{ marginBottom: 8, color: 'var(--color-gray-800)' }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
