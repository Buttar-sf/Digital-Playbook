import type { DocStatut, OffreStatut, QRStatut, ProjetPhase } from '../data/mockData';

type BadgeVariant = 'wip' | 'shared' | 'published' | 'archive' | 'info' | 'success' | 'warning' | 'error' | 'neutral';

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  wip:       { background: 'var(--color-wip-bg)',       color: 'var(--color-wip)' },
  shared:    { background: 'var(--color-shared-bg)',     color: 'var(--color-shared)' },
  published: { background: 'var(--color-published-bg)',  color: 'var(--color-published)' },
  archive:   { background: 'var(--color-archive-bg)',    color: 'var(--color-archive)' },
  info:      { background: 'var(--color-info-bg)',       color: 'var(--color-info)' },
  success:   { background: 'var(--color-success-bg)',    color: 'var(--color-success)' },
  warning:   { background: 'var(--color-warning-bg)',    color: 'var(--color-warning)' },
  error:     { background: 'var(--color-error-bg)',      color: 'var(--color-error)' },
  neutral:   { background: 'var(--color-gray-100)',      color: 'var(--color-gray-700)' },
};

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 10px',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  lineHeight: '20px',
  whiteSpace: 'nowrap',
};

export function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return <span style={{ ...base, ...variantStyles[variant] }}>{children}</span>;
}

const docStatutMap: Record<DocStatut, BadgeVariant> = { WIP: 'wip', Shared: 'shared', Published: 'published', Archive: 'archive' };
export function DocStatutBadge({ statut }: { statut: DocStatut }) {
  return <Badge variant={docStatutMap[statut]}>{statut}</Badge>;
}

const offreStatutMap: Record<OffreStatut, BadgeVariant> = { Brouillon: 'neutral', 'En cours': 'info', Soumise: 'shared', Gagnée: 'success', Perdue: 'error' };
export function OffreStatutBadge({ statut }: { statut: OffreStatut }) {
  return <Badge variant={offreStatutMap[statut]}>{statut}</Badge>;
}

const qrStatutMap: Record<QRStatut, BadgeVariant> = { Ouverte: 'warning', 'En attente': 'info', Répondue: 'success', Clôturée: 'neutral' };
export function QRStatutBadge({ statut }: { statut: QRStatut }) {
  return <Badge variant={qrStatutMap[statut]}>{statut}</Badge>;
}

const phaseMap: Record<ProjetPhase, BadgeVariant> = { Démarrage: 'info', Production: 'shared', Livraison: 'success', Clôturé: 'neutral' };
export function PhaseStatutBadge({ phase }: { phase: ProjetPhase }) {
  return <Badge variant={phaseMap[phase]}>{phase}</Badge>;
}

const controleMap: Record<string, BadgeVariant> = { Conforme: 'success', 'Non-conforme': 'error', 'En cours': 'info', 'Non vérifié': 'neutral' };
export function ControleStatutBadge({ statut }: { statut: string }) {
  return <Badge variant={controleMap[statut] || 'neutral'}>{statut}</Badge>;
}
