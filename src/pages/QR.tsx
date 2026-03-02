import { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Badge } from '../components/Badge';
import { GlossaryTerm } from '../components/Tooltip';

interface QR { id: string; question: string; reponse: string; theme: string; }

const faqData: QR[] = [
  { id: '1', question: 'Qu\'est-ce que le BEP et quand doit-il être rédigé ?', reponse: 'Le BEP (BIM Execution Plan) est le plan d\'exécution BIM. Le pré-BEP est rédigé en phase d\'offre (AO) par le BIM Manager désigné. Le post-BEP (BEP projet) est élaboré au démarrage du projet avec plus de détails.', theme: 'BEP' },
  { id: '2', question: 'Quel est le rôle du Référent AO ?', reponse: 'Le Référent AO est le référent interne de l\'équipe BIM au sein de la BL Transports et Territoires. Il est le premier interlocuteur du Responsable AO, centralise les offres et les attribue aux BIM/SIG Managers.', theme: 'Rôles' },
  { id: '3', question: 'Comment choisir l\'ECD pour un projet ?', reponse: 'Le choix de l\'ECD dépend des exigences du client, de la taille du projet, des besoins de collaboration et des formats à gérer. Le BIM Manager configure l\'ECD en phase AO (tâche 1.4).', theme: 'ECD' },
  { id: '4', question: 'Quels sont les livrables attendus en phase AO ?', reponse: 'Les livrables principaux sont : le pré-BEP, l\'analyse des exigences BIM/SIG MOA, la méthodologie d\'intégration SIG, et les livrables additionnels demandés dans le CDC.', theme: 'Livrables' },
  { id: '5', question: 'Qui valide les livrables avant soumission de l\'offre ?', reponse: 'La validation est effectuée par le BIM Manager AO, le SIG Manager AO et le Responsable AO (tâche 1.6). En cas de non-conformité, retour à la production.', theme: 'Processus' },
  { id: '6', question: 'Comment fonctionne la matrice RACI du processus AO ?', reponse: 'R = Responsable (celui qui exécute), C = Consulté (donne un avis), I = Informé (tenu au courant). Chaque tâche du BPMN a une répartition claire des responsabilités entre les acteurs.', theme: 'RACI' },
];

export default function QR() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const filtered = faqData.filter(q => !search || q.question.toLowerCase().includes(search.toLowerCase()) || q.theme.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Questions / Réponses</h1>
          <p className="page-header-sub">FAQ sur les processus <GlossaryTerm term="BIM" />-<GlossaryTerm term="SIG" /> et le guide méthodologique</p>
        </div>
      </div>

      <div className="section">
        <div className="table-filter" style={{ maxWidth: 400, marginBottom: 16 }}>
          <Search size={14} />
          <input style={{ border: 'none', background: 'transparent', fontSize: 'var(--text-sm)', outline: 'none', flex: 1 }} placeholder="Rechercher une question…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(q => {
          const isOpen = openId === q.id;
          return (
            <div key={q.id} className="card">
              <button
                className="card-header"
                onClick={() => setOpenId(isOpen ? null : q.id)}
                style={{ cursor: 'pointer', border: 'none', width: '100%', background: isOpen ? 'var(--egis-green-50)' : undefined }}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <MessageSquare size={16} style={{ color: 'var(--egis-green-500)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 500, fontSize: 'var(--text-sm)', textAlign: 'left' }}>{q.question}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge variant="neutral">{q.theme}</Badge>
                  <span style={{ color: 'var(--color-gray-400)' }}>{isOpen ? '▾' : '▸'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="card-body" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>{q.reponse}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
