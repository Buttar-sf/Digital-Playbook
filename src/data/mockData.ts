/* Mock data — realistic Egis BIM/SIG project data */

export type OffreStatut = 'Brouillon' | 'En cours' | 'Soumise' | 'Gagnée' | 'Perdue';
export type DocStatut = 'WIP' | 'Shared' | 'Published' | 'Archive';
export type QRStatut = 'Ouverte' | 'En attente' | 'Répondue' | 'Clôturée';
export type ProjetPhase = 'Démarrage' | 'Production' | 'Livraison' | 'Clôturé';

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
  resumeExigences: string;
}

export interface Projet {
  id: string;
  nom: string;
  client: string;
  pays: string;
  phase: ProjetPhase;
  bimManager: string;
  sigManager: string;
  chefProjet: string;
  progression: number;
  ecdChoisi: string;
  bepStatut: string;
  tidpProgression: number;
  dernActivite: string;
}

export interface MembreEquipe {
  id: string;
  nom: string;
  role: string;
  email: string;
  organisation: string;
  disponibilite: 'Disponible' | 'Partiel' | 'Indisponible';
}

export interface QuestionReponse {
  id: string;
  question: string;
  poseePar: string;
  destinataire: string;
  statut: QRStatut;
  theme: string;
  projetId: string;
  projetNom: string;
  dateCreation: string;
  relanceLe: string;
  reponse: string;
  piecesJointes: number;
}

export interface TIDPLivrable {
  id: string;
  discipline: string;
  livrable: string;
  proprietaire: string;
  dependances: string;
  format: string;
  lod: string;
  loi: string;
  dateEcheance: string;
  statut: DocStatut;
  validateurs: string[];
}

export interface Controle {
  id: string;
  type: string;
  description: string;
  statut: 'Conforme' | 'Non-conforme' | 'En cours' | 'Non vérifié';
  projetNom: string;
  date: string;
  responsable: string;
}

export const offres: Offre[] = [
  { id: 'AO-2025-001', client: 'SNCF Réseau', pays: 'France', titre: 'LGV Bordeaux–Toulouse – Lot Ouvrages d\'Art', deadline: '2025-04-15', referentAO: 'Marie Dupont', bimRequis: true, sigRequis: true, statut: 'En cours', dernActivite: '2025-03-28', resumeExigences: 'BEP + TIDP exigés, LOD 300 min., ECD ACC' },
  { id: 'AO-2025-002', client: 'Grand Paris Express', pays: 'France', titre: 'Ligne 18 – Études techniques gares', deadline: '2025-05-02', referentAO: 'Thomas Bernard', bimRequis: true, sigRequis: false, statut: 'Brouillon', dernActivite: '2025-03-25', resumeExigences: 'Pré-BEP requis, IFC 4.0' },
  { id: 'AO-2025-003', client: 'ADOT – Abu Dhabi', pays: 'EAU', titre: 'Étude routière Al Ain Highway', deadline: '2025-03-30', referentAO: 'Sophie Martin', bimRequis: true, sigRequis: true, statut: 'Soumise', dernActivite: '2025-03-20', resumeExigences: 'ISO 19650, BIM Level 2, SIG intégration cadastre' },
  { id: 'AO-2025-004', client: 'Métropole de Lyon', pays: 'France', titre: 'Réseau cyclable – SIG & cartographie', deadline: '2025-06-01', referentAO: 'Pierre Lefèvre', bimRequis: false, sigRequis: true, statut: 'Gagnée', dernActivite: '2025-03-15', resumeExigences: 'GPKG, WGS84, dashboards SIG' },
  { id: 'AO-2025-005', client: 'ONCF', pays: 'Maroc', titre: 'LGV Kénitra–Marrakech – BIM coordination', deadline: '2025-04-20', referentAO: 'Marie Dupont', bimRequis: true, sigRequis: false, statut: 'En cours', dernActivite: '2025-03-27', resumeExigences: 'BEP complet, maquettes LOD 350' },
  { id: 'AO-2025-006', client: 'TfL', pays: 'Royaume-Uni', titre: 'Elizabeth Line – Asset Information', deadline: '2025-03-10', referentAO: 'Thomas Bernard', bimRequis: true, sigRequis: true, statut: 'Perdue', dernActivite: '2025-03-12', resumeExigences: 'UK BIM Framework, COBie, Uniclass' },
];

export const projets: Projet[] = [
  { id: 'PRJ-001', nom: 'Réseau cyclable Lyon', client: 'Métropole de Lyon', pays: 'France', phase: 'Démarrage', bimManager: '—', sigManager: 'Julie Morel', chefProjet: 'Pierre Lefèvre', progression: 15, ecdChoisi: 'SharePoint', bepStatut: 'Non applicable', tidpProgression: 0, dernActivite: '2025-03-28' },
  { id: 'PRJ-002', nom: 'Pont de Nouméa – OA', client: 'Gouv. Nouvelle-Calédonie', pays: 'Nouvelle-Calédonie', phase: 'Production', bimManager: 'Alain Roche', sigManager: 'Julie Morel', chefProjet: 'Claire Faure', progression: 62, ecdChoisi: 'ACC', bepStatut: 'Post BEP validé', tidpProgression: 78, dernActivite: '2025-03-27' },
  { id: 'PRJ-003', nom: 'Tramway Rabat – Ligne 3', client: 'STRS', pays: 'Maroc', phase: 'Production', bimManager: 'Karim Bennani', sigManager: 'Nadia El Amrani', chefProjet: 'Youssef Tazi', progression: 45, ecdChoisi: 'ProjectWise', bepStatut: 'Post BEP en cours', tidpProgression: 55, dernActivite: '2025-03-26' },
  { id: 'PRJ-004', nom: 'A69 Castres–Toulouse', client: 'Atosca', pays: 'France', phase: 'Livraison', bimManager: 'Marie Dupont', sigManager: 'Luc Garnier', chefProjet: 'Anne Bertrand', progression: 90, ecdChoisi: 'ACC', bepStatut: 'Post BEP validé', tidpProgression: 95, dernActivite: '2025-03-25' },
];

export const equipe: MembreEquipe[] = [
  { id: 'E-001', nom: 'Marie Dupont', role: 'BIM Manager', email: 'marie.dupont@egis.fr', organisation: 'Egis Structures', disponibilite: 'Disponible' },
  { id: 'E-002', nom: 'Julie Morel', role: 'SIG Manager', email: 'julie.morel@egis.fr', organisation: 'Egis Géotechnique', disponibilite: 'Disponible' },
  { id: 'E-003', nom: 'Thomas Bernard', role: 'Référent AO', email: 'thomas.bernard@egis.fr', organisation: 'Egis Rail', disponibilite: 'Partiel' },
  { id: 'E-004', nom: 'Pierre Lefèvre', role: 'Chef de projet', email: 'pierre.lefevre@egis.fr', organisation: 'Egis Villes & Transports', disponibilite: 'Disponible' },
  { id: 'E-005', nom: 'Sophie Martin', role: 'Responsable AO', email: 'sophie.martin@egis.fr', organisation: 'Egis International', disponibilite: 'Disponible' },
  { id: 'E-006', nom: 'Alain Roche', role: 'BIM Coordinateur', email: 'alain.roche@egis.fr', organisation: 'Egis Structures', disponibilite: 'Partiel' },
  { id: 'E-007', nom: 'Claire Faure', role: 'Gestionnaire documentaire', email: 'claire.faure@egis.fr', organisation: 'Egis Bâtiments', disponibilite: 'Disponible' },
  { id: 'E-008', nom: 'Karim Bennani', role: 'BIM Manager', email: 'karim.bennani@egis.fr', organisation: 'Egis Maroc', disponibilite: 'Disponible' },
  { id: 'E-009', nom: 'Nadia El Amrani', role: 'Géomaticien', email: 'nadia.elamrani@egis.fr', organisation: 'Egis Maroc', disponibilite: 'Disponible' },
  { id: 'E-010', nom: 'Luc Garnier', role: 'Chef de discipline', email: 'luc.garnier@egis.fr', organisation: 'Egis Route', disponibilite: 'Indisponible' },
];

export const questionsReponses: QuestionReponse[] = [
  { id: 'QR-001', question: 'Quel LOD est attendu pour les ouvrages d\'art en phase AVP ?', poseePar: 'Marie Dupont', destinataire: 'MOA – SNCF', statut: 'Ouverte', theme: 'BEP', projetId: 'AO-2025-001', projetNom: 'LGV Bordeaux–Toulouse', dateCreation: '2025-03-20', relanceLe: '2025-04-01', reponse: '', piecesJointes: 1 },
  { id: 'QR-002', question: 'L\'ECD doit-il supporter les formats GPKG natifs ?', poseePar: 'Julie Morel', destinataire: 'MOA – Métropole Lyon', statut: 'Répondue', theme: 'ECD', projetId: 'PRJ-001', projetNom: 'Réseau cyclable Lyon', dateCreation: '2025-03-18', relanceLe: '', reponse: 'Oui, le format GPKG est requis pour toutes les couches SIG.', piecesJointes: 2 },
  { id: 'QR-003', question: 'Confirmation du système de coordonnées pour les études routières', poseePar: 'Nadia El Amrani', destinataire: 'MOA – ADOT', statut: 'En attente', theme: 'SIG', projetId: 'AO-2025-003', projetNom: 'Al Ain Highway', dateCreation: '2025-03-15', relanceLe: '2025-03-29', reponse: '', piecesJointes: 0 },
  { id: 'QR-004', question: 'Circuit de validation des livrables IFC : combien de niveaux ?', poseePar: 'Alain Roche', destinataire: 'MOA – STRS', statut: 'Répondue', theme: 'TIDP', projetId: 'PRJ-003', projetNom: 'Tramway Rabat – Ligne 3', dateCreation: '2025-03-10', relanceLe: '', reponse: '3 niveaux : auto-contrôle, BIM coordinateur, BIM manager projet.', piecesJointes: 1 },
  { id: 'QR-005', question: 'Les maquettes de coordination doivent-elles inclure le terrain ?', poseePar: 'Karim Bennani', destinataire: 'MOA – STRS', statut: 'Ouverte', theme: 'BEP', projetId: 'PRJ-003', projetNom: 'Tramway Rabat – Ligne 3', dateCreation: '2025-03-22', relanceLe: '2025-04-05', reponse: '', piecesJointes: 0 },
];

export const tidpLivrables: TIDPLivrable[] = [
  { id: 'T-001', discipline: 'Structure', livrable: 'Maquette OA – Tablier', proprietaire: 'Alain Roche', dependances: 'Topographie', format: 'IFC 4.0', lod: '300', loi: 'LOI 3', dateEcheance: '2025-05-15', statut: 'WIP', validateurs: ['Marie Dupont', 'Claire Faure'] },
  { id: 'T-002', discipline: 'Structure', livrable: 'Maquette OA – Appuis', proprietaire: 'Alain Roche', dependances: 'Géotechnique', format: 'IFC 4.0', lod: '300', loi: 'LOI 3', dateEcheance: '2025-05-15', statut: 'WIP', validateurs: ['Marie Dupont'] },
  { id: 'T-003', discipline: 'Route', livrable: 'Axe en plan + profil en long', proprietaire: 'Luc Garnier', dependances: 'Topographie', format: 'DWG / LandXML', lod: '200', loi: 'LOI 2', dateEcheance: '2025-04-30', statut: 'Shared', validateurs: ['Pierre Lefèvre'] },
  { id: 'T-004', discipline: 'SIG', livrable: 'Couche cadastrale zone projet', proprietaire: 'Julie Morel', dependances: '—', format: 'GPKG', lod: '—', loi: 'LOI 2', dateEcheance: '2025-04-20', statut: 'Published', validateurs: ['Nadia El Amrani'] },
  { id: 'T-005', discipline: 'SIG', livrable: 'Carte des contraintes environnementales', proprietaire: 'Nadia El Amrani', dependances: 'Données cadastre', format: 'GeoJSON', lod: '—', loi: 'LOI 3', dateEcheance: '2025-05-10', statut: 'WIP', validateurs: ['Julie Morel'] },
  { id: 'T-006', discipline: 'Coordination', livrable: 'Maquette fédérée – Phase AVP', proprietaire: 'Marie Dupont', dependances: 'Toutes disciplines', format: 'IFC 4.0', lod: '300', loi: 'LOI 3', dateEcheance: '2025-06-01', statut: 'WIP', validateurs: ['Claire Faure', 'Pierre Lefèvre'] },
  { id: 'T-007', discipline: 'Géotechnique', livrable: 'Modèle géologique 3D', proprietaire: 'Marc Duval', dependances: 'Sondages', format: 'IFC / CSV', lod: '200', loi: 'LOI 2', dateEcheance: '2025-04-25', statut: 'Shared', validateurs: ['Alain Roche'] },
];

export const controles: Controle[] = [
  { id: 'C-001', type: 'Nommage fichiers', description: 'Vérification convention ISO 19650 nommage', statut: 'Conforme', projetNom: 'Pont de Nouméa', date: '2025-03-25', responsable: 'Claire Faure' },
  { id: 'C-002', type: 'LOD / LOI', description: 'Contrôle LOD maquettes structure vs exigences BEP', statut: 'Non-conforme', projetNom: 'Tramway Rabat', date: '2025-03-24', responsable: 'Karim Bennani' },
  { id: 'C-003', type: 'Clash detection', description: 'Détection de clashs Structure vs Route', statut: 'En cours', projetNom: 'Pont de Nouméa', date: '2025-03-26', responsable: 'Alain Roche' },
  { id: 'C-004', type: 'Classification', description: 'Vérification Uniclass / classification éléments IFC', statut: 'Conforme', projetNom: 'A69 Castres–Toulouse', date: '2025-03-23', responsable: 'Marie Dupont' },
  { id: 'C-005', type: 'Géoréférencement', description: 'Vérification SCR et point d\'origine maquettes', statut: 'Non vérifié', projetNom: 'Tramway Rabat', date: '2025-03-27', responsable: 'Nadia El Amrani' },
];

export const raciData = {
  tasks: [
    'Analyser CDC / Charte BIM',
    'Constituer équipe BIM/SIG',
    'Choisir ECD',
    'Rédiger Pré-BEP',
    'Soumettre offre AO',
    'Élaborer Post-BEP',
    'Définir TIDP par discipline',
    'Consolider MIDP',
    'Configurer ECD',
    'Contrôle qualité maquettes',
    'Détection de clashs',
    'Publier livrables',
    'Intégration SIG',
    'Formation équipe projet',
  ],
  roles: ['Resp. AO', 'Réf. AO', 'BIM Mgr', 'SIG Mgr', 'Chef Projet', 'Chef Discipline', 'BIM Coord.', 'Gest. Doc.', 'Géomaticien'],
  matrix: [
    ['A', 'R', 'C', 'C', 'I', 'I', '', '', ''],
    ['A', 'R', 'R', 'R', 'C', '', '', '', ''],
    ['I', 'C', 'R', 'C', 'A', '', '', 'C', ''],
    ['I', 'C', 'R', 'C', 'A', '', 'C', '', ''],
    ['A', 'R', 'C', 'C', 'I', '', '', '', ''],
    ['I', '', 'R', 'C', 'A', 'C', 'C', '', ''],
    ['', '', 'A', 'C', 'I', 'R', 'C', '', 'C'],
    ['', '', 'R', 'C', 'A', 'I', 'C', '', ''],
    ['', '', 'C', 'C', 'A', '', '', 'R', ''],
    ['', '', 'A', '', 'I', 'C', 'R', '', ''],
    ['', '', 'A', '', 'I', 'C', 'R', '', ''],
    ['', '', 'A', 'C', 'I', 'R', 'C', 'R', 'C'],
    ['', '', 'C', 'A', 'I', '', '', '', 'R'],
    ['', '', 'R', 'R', 'A', 'I', 'C', 'C', 'C'],
  ],
};

export const ecdCriteres = [
  { critere: 'Gestion maquettes BIM (IFC)', acc: 5, projectwise: 5, sharepoint: 2 },
  { critere: 'GED / gestion documentaire', acc: 4, projectwise: 5, sharepoint: 4 },
  { critere: 'Sécurité & droits granulaires', acc: 4, projectwise: 5, sharepoint: 4 },
  { critere: 'Collaboration temps réel', acc: 5, projectwise: 3, sharepoint: 4 },
  { critere: 'Intégration SIG', acc: 3, projectwise: 3, sharepoint: 2 },
  { critere: 'Coût / licence', acc: 3, projectwise: 2, sharepoint: 5 },
  { critere: 'Interopérabilité formats', acc: 4, projectwise: 4, sharepoint: 3 },
  { critere: 'Facilité de déploiement', acc: 4, projectwise: 2, sharepoint: 5 },
];
