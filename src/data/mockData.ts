export type OffreStatut = 'Brouillon' | 'En cours' | 'Soumise' | 'Gagnée' | 'Perdue';

export interface Offre {
  id: string;
  client: string;
  pays: string;
  titre: string;
  deadline: string;
  referentAO: string;
  bimRequis: boolean;
  sigRequis: boolean;
  statut: OffreStatut;
  dernActivite: string;
}

export const offres: Offre[] = [
  { id: 'AO-2025-001', client: 'SNCF Réseau', pays: 'France', titre: 'LGV Bordeaux–Toulouse – Lot OA', deadline: '2025-04-15', referentAO: 'Marie Dupont', bimRequis: true, sigRequis: true, statut: 'En cours', dernActivite: '2025-03-28' },
  { id: 'AO-2025-002', client: 'Grand Paris Express', pays: 'France', titre: 'Ligne 18 – Études techniques gares', deadline: '2025-05-02', referentAO: 'Thomas Bernard', bimRequis: true, sigRequis: false, statut: 'Brouillon', dernActivite: '2025-03-25' },
  { id: 'AO-2025-003', client: 'ADOT – Abu Dhabi', pays: 'EAU', titre: 'Étude routière Al Ain Highway', deadline: '2025-03-30', referentAO: 'Sophie Martin', bimRequis: true, sigRequis: true, statut: 'Soumise', dernActivite: '2025-03-20' },
  { id: 'AO-2025-004', client: 'Métropole de Lyon', pays: 'France', titre: 'Réseau cyclable – SIG & cartographie', deadline: '2025-06-01', referentAO: 'Pierre Lefèvre', bimRequis: false, sigRequis: true, statut: 'Gagnée', dernActivite: '2025-03-15' },
  { id: 'AO-2025-005', client: 'ONCF', pays: 'Maroc', titre: 'LGV Kénitra–Marrakech – BIM coordination', deadline: '2025-04-20', referentAO: 'Marie Dupont', bimRequis: true, sigRequis: false, statut: 'En cours', dernActivite: '2025-03-27' },
  { id: 'AO-2025-006', client: 'TfL', pays: 'Royaume-Uni', titre: 'Elizabeth Line – Asset Information', deadline: '2025-03-10', referentAO: 'Thomas Bernard', bimRequis: true, sigRequis: true, statut: 'Perdue', dernActivite: '2025-03-12' },
];

export interface BPMNTask {
  id: string;
  label: string;
  description: string;
  responsable: string;
  roleColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const bpmnTasks: BPMNTask[] = [
  {
    id: '1.1', label: 'Analyse du programme &\ntransfert des données au\nréférent BIM-SIG',
    description: 'Le Responsable AO réceptionne le cahier des charges, le programme, le règlement de consultation et la charte BIM MOA. Il effectue une première analyse des documents et transmet l\'ensemble des données au référent AO de l\'équipe BIM-SIG pour analyse approfondie.',
    responsable: 'Responsable AO', roleColor: '#f5d033', x: 60, y: 140, width: 170, height: 70,
  },
  {
    id: '1.2', label: 'Assemblage et analyse\ndes données de l\'offre',
    description: 'Le Référent AO réceptionne les données transmises par le Responsable AO. Il assemble les documents, effectue une analyse détaillée des exigences BIM-SIG du client (CDC, charte BIM, EIR) et identifie les enjeux numériques de l\'offre.',
    responsable: 'Référent AO', roleColor: '#ff6699', x: 270, y: 140, width: 160, height: 70,
  },
  {
    id: '1.3', label: 'Constitution de l\'équipe\nBIM-SIG pour l\'offre',
    description: 'Le Référent AO constitue l\'équipe BIM-SIG dédiée à l\'offre. Il désigne un BIM Manager et un SIG Manager parmi les ressources disponibles, en fonction des compétences requises et de la charge de travail.',
    responsable: 'Référent AO', roleColor: '#ff6699', x: 380, y: 240, width: 160, height: 60,
  },
  {
    id: '1.4', label: 'Mise en œuvre de l\'ECD\nd\'échange des données offre',
    description: 'Le BIM Manager AO met en place l\'Environnement Commun de Données pour l\'offre. Il configure la structure de dossiers, définit les droits d\'accès et prépare les espaces de travail collaboratif pour la production des livrables.',
    responsable: 'BIM Manager AO', roleColor: '#00cc66', x: 470, y: 140, width: 180, height: 70,
  },
  {
    id: '1.5', label: 'Production des livrables\nBIM-SIG AO',
    description: 'Le BIM Manager AO et le SIG Manager AO produisent l\'ensemble des livrables requis : analyse des exigences BIM/SIG MOA, définition de la méthodologie SIG, élaboration du pré-BEP, livrables additionnels. Cette tâche comprend les sous-tâches 1.5-2 à 1.5-8.',
    responsable: 'BIM Manager AO / SIG Manager AO', roleColor: '#00cc66', x: 620, y: 140, width: 170, height: 70,
  },
  {
    id: '1.6', label: 'Validation des livrables AO',
    description: 'Le BIM Manager AO, le SIG Manager AO et le Responsable AO effectuent une revue de l\'ensemble des livrables produits. Ils vérifient la conformité aux exigences du client, la cohérence des documents et la qualité globale du dossier. Si non conforme, retour à la production.',
    responsable: 'BIM Manager AO / Responsable AO', roleColor: '#00cc66', x: 790, y: 140, width: 160, height: 70,
  },
  {
    id: '1.7', label: 'Publication des livrables\npour soumission de l\'AO',
    description: 'Le Responsable AO compile et publie l\'ensemble des livrables validés pour constituer le dossier de soumission final. Il s\'assure de la complétude du dossier et de la conformité aux exigences de la consultation.',
    responsable: 'Responsable AO', roleColor: '#f5d033', x: 940, y: 140, width: 170, height: 70,
  },
];

export const responsabilitesOffres = {
  header: ['Tâches', 'Responsable AO', 'Référent AO', 'BIM Manager', 'SIG Manager', 'Chefs de discipline'],
  rows: [
    ['Tâche 1.1 — Analyse du programme & transfert des données', 'R', 'C', 'I', 'I', 'I'],
    ['Tâche 1.2 — Assemblage des données du projet', 'C', 'R', 'I', 'I', 'I'],
    ['Tâche 1.3 — Constitution de l\'équipe BIM-SIG', 'I', 'R', 'I', 'I', 'I'],
    ['Tâche 1.4 — Mise en œuvre du ECD d\'échange', 'I', 'I', 'R', 'C', 'I'],
    ['Tâche 1.5-2 — Analyse des exigences BIM MOA', 'I', 'I', 'R', 'I', 'I'],
    ['Tâche 1.5-3 — Analyse des exigences SIG MOA', 'I', 'I', 'I', 'R', 'I'],
    ['Tâche 1.5-4 — Échange AO & Doc complémentaires', 'R', 'I', 'C', 'C', 'I'],
    ['Tâche 1.5-5 — Définition méthodologie SIG', 'I', 'I', 'C', 'R', 'I'],
    ['Tâche 1.5-6 — Élaboration pré-BEP & livrables', 'I', 'I', 'R', 'C', 'I'],
    ['Tâche 1.5-7 — Analyse conformité pré-BEP', 'I', 'I', 'R', 'C', 'I'],
    ['Tâche 1.5-8 — Réunion présentation pré-BEP', 'C', 'I', 'R', 'C', 'C'],
    ['Tâche 1.6 — Validation des livrables AO', 'I', 'I', 'R', 'C', 'I'],
    ['Tâche 1.7 — Publication livrables soumission', 'R', 'I', 'I', 'I', 'I'],
  ],
};
