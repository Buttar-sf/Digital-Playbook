import { Badge } from '../components/Badge';

const contributeurs = [
  {
    role: 'Responsable AO',
    desc: 'Il pilote l\'ensemble du processus de constitution des dossiers de soumission, depuis la veille commerciale jusqu\'à la transmission des réponses, dans le respect des exigences techniques, administratives et réglementaires. Son rôle est aussi d\'assurer l\'interface directe avec la maîtrise d\'ouvrage, faciliter les échanges techniques et administratifs. Il mobilise le référent AO ainsi que l\'équipe de management BIM afin de préparer l\'ensemble des livrables attendus conformément aux exigences du marché.',
    phases: ['AO', 'Démarrage'],
    color: 'var(--role-responsable-ao)',
  },
  {
    role: 'Référent AO',
    desc: 'Le référent d\'appel d\'offre est le référent interne de l\'équipe BIM au sein de la Business Line Transports et Territoires. Il est le premier interlocuteur du responsable AO et est chargé de centraliser les offres reçues et de les attribuer de manière optimale aux BIM Managers et SIG Managers de son équipe qui seront chargés de rédiger un pré-BEP et les livrables attendus.',
    phases: ['AO'],
    color: 'var(--role-referent-ao)',
  },
  {
    role: 'BIM Manager',
    desc: 'Le BIM Manager est le référent BIM désigné pour répondre aux exigences spécifiques du client dans le cadre d\'un appel d\'offre BIM ou d\'un projet BIM. En phase projet, il assure la mise en œuvre des procédures de gestion de l\'information. Il est le responsable de la stratégie, de la coordination, et du contrôle des maquettes numériques et du processus BIM.',
    phases: ['AO', 'Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-bim-manager)',
  },
  {
    role: 'SIG Manager',
    desc: 'Le SIG Manager est le référent SIG désigné pour répondre aux exigences spécifiques du client. Il prend en charge l\'analyse des attentes SIG du client, la contribution au pré-BEP pour le SIG et veille à la conformité avec l\'ensemble des exigences techniques et contractuelles. En phase projet, il assure l\'intégration du SIG.',
    phases: ['AO', 'Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-sig-manager)',
  },
  {
    role: 'Chef de projet',
    desc: 'Gérer le contrat, les prestations (coût, délai, qualité), l\'équipe projet, les sous-traitances, les relations client, les parties prenantes, les risques et opportunités. Prend le Leadership de l\'équipe et du management des contrats.',
    phases: ['Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-chef-projet)',
  },
  {
    role: 'Chef de discipline',
    desc: 'Supervise l\'ensemble des activités techniques de sa spécialité (rail, pont, route, etc.). Assure la qualité et la conformité des livrables, coordonne l\'équipe, valide les choix techniques et représente la discipline auprès de la direction du projet.',
    phases: ['Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-chef-discipline)',
  },
  {
    role: 'Responsable de synthèse',
    desc: 'Assure la cohérence technique, la compatibilité spatiale et la bonne intégration des contributions de toutes les disciplines d\'un projet. Garantit que toutes les solutions peuvent être réalisées sans conflit. Produit la synthèse spatiale (plan de synthèse 2D/3D).',
    phases: ['AVP', 'PRO', 'EXE', 'DOE'],
    color: '#888',
  },
  {
    role: 'BIM Coordinateur général de projet',
    desc: 'Responsable de la coordination des différents lots ou disciplines à l\'échelle du projet. Assure l\'intégration des modèles de production provenant de l\'ensemble des intervenants. Garant du respect du processus de travail défini dans le BEP.',
    phases: ['Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-bim-manager)',
  },
  {
    role: 'BIM Coordinateur de discipline',
    desc: 'Assure la coordination BIM au sein de sa discipline, veille à la bonne intégration des modèles BIM dans la maquette globale, contrôle la cohérence des données, gère les interfaces et coordonne les BIM Modeleurs.',
    phases: ['Démarrage', 'AVP', 'PRO', 'EXE', 'DOE'],
    color: 'var(--role-bim-manager)',
  },
  {
    role: 'Gestionnaire documentaire',
    desc: 'Chargé d\'assurer la gestion efficace et rigoureuse de tous les documents liés au projet. Réceptionne, enregistre dans la GED, classe selon une nomenclature précise. Assure traçabilité des versions, diffusion et archivage.',
    phases: ['AVP', 'PRO', 'EXE', 'DOE'],
    color: '#888',
  },
  {
    role: 'BIM Modeleur de discipline',
    desc: 'Responsable de la création, de la mise à jour et de la cohérence de la maquette numérique relative à sa discipline. Réalise la modélisation et l\'intégration des données techniques, garantissant la qualité des livrables.',
    phases: ['AVP', 'PRO', 'EXE', 'DOE'],
    color: '#888',
  },
  {
    role: 'Géomaticien',
    desc: 'Spécialiste de l\'information géographique au sein de l\'équipe. Acquiert, organise, analyse et valorise les données spatiales. Collecte, contrôle et met à jour les données topographiques, cadastrales, réseaux, environnementales. Prépare les données SIG pour l\'intégration dans les maquettes BIM.',
    phases: ['AVP', 'PRO', 'EXE', 'DOE', 'Exploitation'],
    color: 'var(--role-sig-manager)',
  },
];

export default function Contributeurs() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Liste des contributeurs</h1>
          <p className="page-header-sub">Méthodologies — Rôles, missions et phases d'intervention</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {contributeurs.map(c => (
          <div key={c.role} className="card">
            <div className="card-body" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 4, minHeight: 60, borderRadius: 2,
                background: c.color, flexShrink: 0, marginTop: 2,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <h4 style={{ margin: 0 }}>{c.role}</h4>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {c.phases.map(p => (
                      <Badge key={p} variant="neutral">{p}</Badge>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
                  {c.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
