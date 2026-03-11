import { GlossaryTerm } from '../components/Tooltip';

export default function Introduction() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Introduction</h1>
          <p className="page-header-sub">Méthodologies — Cadre structuré pour la standardisation des solutions numériques</p>
        </div>
      </div>

      <div className="card section">
        <div className="card-body" style={{ maxWidth: 800 }}>
          <p className="doc-paragraph">
            La transformation digitale est devenue indispensable pour améliorer la performance et
            la compétitivité des projets, face à leur complexité et aux exigences croissantes
            notamment à l'intégration des processus <GlossaryTerm term="BIM" /> et <GlossaryTerm term="SIG" />.
          </p>
          <p className="doc-paragraph">
            La standardisation des solutions numériques constitue désormais une nécessité
            stratégique pour répondre efficacement aux exigences de nos clients.
          </p>
          <p className="doc-paragraph">
            Dans un contexte où les projets deviennent de plus en plus complexes, interconnectés
            et soumis à des exigences croissantes en matière de performance, la quantité de
            données à gérer ne cesse d'augmenter. Ces évolutions renforcent également les attentes
            autour de nos modèles numériques dans les processus <GlossaryTerm term="BIM" /> et <GlossaryTerm term="SIG" />.
          </p>
          <p className="doc-paragraph">
            La transformation digitale s'impose donc comme un levier majeur de compétitivité pour
            répondre efficacement aux exigences de nos clients.
          </p>
          <p className="doc-paragraph">
            L'intégration harmonisée des méthodes et outils numériques dans le processus <GlossaryTerm term="BIM" /> –
            <GlossaryTerm term="SIG" />, les plateformes collaboratives, la gestion documentaire ou les systèmes d'analyse
            de données, révolutionne la façon dont les infrastructures sont conçues, réalisées et exploitées.
          </p>
          <p className="doc-paragraph">
            Pourtant, l'hétérogénéité des méthodes, outils et des pratiques freinent souvent
            l'efficacité de nos équipes <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> et engendrent
            parfois des incohérences et des difficultés d'organisation autour des projets.
          </p>
          <p className="doc-paragraph">
            Face à ces enjeux, ce guide vise à fournir un cadre structuré, opérationnel et pragmatique
            pour la standardisation des solutions numériques, garantissant la cohérence, la qualité
            et la pérennité des informations tout au long des phases des projets.
          </p>

          <div className="doc-callout" style={{ marginTop: 24, marginBottom: 24 }}>
            <h4 style={{ color: 'var(--egis-green-700)', marginBottom: 12 }}>Ce guide s'articule autour de quatre axes majeurs :</h4>
            <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li className="doc-li">L'identification et le traitement des exigences numériques présentés dans les cahiers de charges des projets.</li>
              <li className="doc-li">L'organisation des équipes de production pour une réponse adéquate à ces exigences clients.</li>
              <li className="doc-li">Le choix et la mise en place d'un environnement numérique d'outils le plus adapté pour la production des projets.</li>
              <li className="doc-li">La production des cas d'usage numériques <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> et l'interdépendance entre ces cas d'usages.</li>
            </ol>
          </div>

          <p className="doc-paragraph">
            Ce guide s'adresse à l'ensemble des contributeurs des projets : Chef de projet, chef de
            discipline, ingénieurs, <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> manager,{' '}
            <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> coordinateur,{' '}
            <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> modeleur.
          </p>
          <p className="doc-paragraph">
            Son objectif est d'accompagner la mise en œuvre du processus <GlossaryTerm term="BIM" /> à l'échelle de la
            Business Line Transport et Territoire sur les projets, de faciliter la collaboration et de
            maximiser la valeur ajoutée des solutions digitales, au service de la réussite des projets.
          </p>
          <p className="doc-paragraph" style={{ fontStyle: 'italic', color: 'var(--color-gray-500)' }}>
            Il n'a pas vocation à figer les pratiques, mais à offrir une base commune, adaptable aux
            spécificités des projets.
          </p>
          <p className="doc-paragraph">
            En adoptant une approche standardisée, chaque projet bénéficiera d'une meilleure
            maîtrise des risques, d'une optimisation des processus et d'une valorisation accrue des
            données produites. Ce guide est donc un outil essentiel pour impulser et encadrer notre
            dynamique collective, garantir la performance de nos équipes sur les projets.
          </p>
        </div>
      </div>
    </div>
  );
}
