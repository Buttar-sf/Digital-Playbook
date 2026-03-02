import { Badge } from '../components/Badge';

export default function Demarrage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Démarrage de projet</h1>
          <p className="page-header-sub">BPMN du processus de démarrage, tâches et responsabilités</p>
        </div>
      </div>

      <div className="alert alert-info section">
        Le processus de démarrage de projet sera détaillé dans une prochaine version du guide.
        Il inclura le BPMN spécifique au démarrage, la description des tâches et la table des responsabilités contrôle qualité.
      </div>

      <div className="card">
        <div className="card-body">
          <h4 style={{ marginBottom: 16 }}>Étapes clés du démarrage</h4>
          {[
            { step: '1', label: 'Check-in post attribution', desc: 'Analyse du scope, réunion kick-off, mise en place de la gouvernance', status: 'À configurer' },
            { step: '2', label: 'Mise en place ECD', desc: 'Configuration de l\'environnement commun de données du projet', status: 'À configurer' },
            { step: '3', label: 'Élaboration Post-BEP', desc: 'Rédaction du BEP projet détaillé à partir du pré-BEP de l\'offre', status: 'À configurer' },
            { step: '4', label: 'Organisation des équipes', desc: 'Désignation des BIM/SIG coordinateurs de discipline, formation', status: 'À configurer' },
            { step: '5', label: 'Lancement production', desc: 'Définition des TIDP, mise en production des maquettes et livrables', status: 'À configurer' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--color-gray-100)', alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-md)',
                background: 'var(--egis-green-50)', color: 'var(--egis-green-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0,
              }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>{item.label}</strong>
                  <Badge variant="neutral">{item.status}</Badge>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
