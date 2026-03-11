import { GlossaryTerm } from '../components/Tooltip';

export default function Processus() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Processus d'intégration du digital dans les offres</h1>
          <p className="page-header-sub">Intégration du digital dans les offres</p>
        </div>
      </div>

      <div className="card section">
        <div className="card-body" style={{ maxWidth: 800 }}>
          <p className="doc-paragraph">
            L'absence d'une structuration claire et formalisée de la démarche numérique interne pour la
            réponse aux appels a généré des dysfonctionnements, tels qu'un manque de coordination
            entre les différents acteurs impliqués, et une optimisation limitée des processus de soumission.
          </p>

          <div className="doc-callout" style={{ margin: '20px 0' }}>
            <h4 style={{ color: 'var(--color-error)', marginBottom: 12 }}>Constats identifiés :</h4>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li className="doc-li">Les <GlossaryTerm term="CDC" /> des clients insuffisamment précis : les attentes et exigences <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> des <GlossaryTerm term="MOA" /> ne sont pas suffisamment détaillées.</li>
              <li className="doc-li">Une appréhension insuffisante de la portée des engagements pris lors de la réponse aux <GlossaryTerm term="AO" /> et leurs implications par les responsables d'offre.</li>
              <li className="doc-li">Une implication relativement faible des équipes techniques aux côtés des opérationnelles.</li>
              <li className="doc-li">Une forte hétérogénéité dans la qualité des méthodologies appliquées pour les offres.</li>
              <li className="doc-li">Des demandes d'interventions dans l'urgence et à la dernière minute.</li>
            </ul>
          </div>

          <p className="doc-paragraph">
            Pour pallier ces insuffisances, la <GlossaryTerm term="BL" /> a mis en place une équipe dédiée, chargée d'accompagner
            les responsables d'offre tout au long du processus d'<GlossaryTerm term="AO" /> avec des exigences <GlossaryTerm term="BIM" /> ou non
            et lors du démarrage des projets.
          </p>

          <h3 style={{ marginTop: 32, marginBottom: 16 }}>Nouveau processus d'intégration du digital</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { phase: 'En phase démarrage offre', color: 'var(--egis-green-400)', text: 'Sur l\'ensemble des offres, en amont de la réunion de lancement, le responsable d\'offre doit prendre contact avec le référent AO de l\'équipe BIM-SIG de la BL. Une réunion de lancement sera organisée avec la participation du référent afin de recenser les besoins.' },
              { phase: 'En production d\'offre', color: 'var(--role-referent-ao)', text: 'Le référent AO effectuera une première analyse des exigences BIM-SIG du client afin de proposer une stratégie qui répondra parfaitement aux enjeux digitaux pour l\'offre.' },
              { phase: 'En phase de remise d\'offre', color: 'var(--role-bim-manager)', text: 'Une fois l\'offre remise, le référent AO doit mettre à jour le tableau de suivi des offres. Ce qui permettra de garder une traçabilité des intervenants et de la solution proposée.' },
            ].map(item => (
              <div key={item.phase} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 4, minHeight: 40, background: item.color, borderRadius: 2, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ marginBottom: 4 }}>{item.phase}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 32, marginBottom: 16 }}>Positionnement de l'équipe <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /></h3>
          <p className="doc-paragraph">
            L'équipe de Management <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> occupe une fonction centrale et fédératrice.
            Elle a pour mission principale de piloter et d'accompagner l'ensemble des équipes de management de
            projet sur toutes les problématiques liées au <GlossaryTerm term="BIM" /> et au <GlossaryTerm term="SIG" />.
          </p>

          <div className="doc-callout" style={{ marginTop: 16 }}>
            <h4 style={{ color: 'var(--egis-green-700)', marginBottom: 12 }}>Valeur ajoutée de l'intégration précoce :</h4>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li className="doc-li">Identifier en amont les enjeux, risques et opportunités liés au <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /></li>
              <li className="doc-li">Définir une stratégie <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> adaptée et partagée</li>
              <li className="doc-li">Assurer la cohérence et l'interopérabilité des données</li>
              <li className="doc-li">Garantir la conformité aux exigences contractuelles et réglementaires</li>
              <li className="doc-li">Optimiser la qualité, la traçabilité et la valeur ajoutée des livrables</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
