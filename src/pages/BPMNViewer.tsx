import { useState, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';
import { bpmnTasks } from '../data/mockData';

export default function BPMNViewer() {
  const [scale, setScale] = useState(1);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWidth = 1160;
  const svgHeight = 380;

  const zoomIn = () => setScale(s => Math.min(s + 0.15, 2));
  const zoomOut = () => setScale(s => Math.max(s - 0.15, 0.4));
  const resetZoom = () => setScale(1);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setScale(s => Math.max(0.4, Math.min(2, s - e.deltaY * 0.001)));
    }
  }, []);

  function handleTaskClick(taskId: string) {
    setSelectedTask(selectedTask === taskId ? null : taskId);
    const el = document.getElementById(`task-desc-${taskId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>BPMN — Traitement des offres</h1>
          <p className="page-header-sub">Processus de traitement des offres — Version 0.1</p>
        </div>
      </div>

      {/* BPMN diagram */}
      <div className="card section">
        <div className="card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3>Processus de traitement des offres</h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>BPMN N°1</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn btn-ghost btn-sm" onClick={zoomOut} title="Dézoomer"><ZoomOut size={16} /></button>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', minWidth: 40, textAlign: 'center', lineHeight: '28px' }}>{Math.round(scale * 100)}%</span>
            <button className="btn btn-ghost btn-sm" onClick={zoomIn} title="Zoomer"><ZoomIn size={16} /></button>
            <button className="btn btn-ghost btn-sm" onClick={resetZoom} title="Centrer"><Maximize2 size={16} /></button>
          </div>
        </div>
        <div
          ref={containerRef}
          onWheel={handleWheel}
          style={{ overflow: 'auto', background: 'var(--color-gray-50)', padding: 16, minHeight: 300 }}
        >
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.15s ease' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width={svgWidth} height={svgHeight} style={{ fontFamily: 'var(--font-family)' }}>
              {/* Swim lanes */}
              <rect x="0" y="0" width={svgWidth} height="90" fill="white" stroke="#dee2e6" />
              <text x="20" y="30" fontSize="9" fontWeight="700" fill="#495057" transform="rotate(-90 20 50)" textAnchor="middle">Exigences</text>
              <rect x="0" y="90" width={svgWidth} height="180" fill="white" stroke="#dee2e6" />
              <text x="20" y="180" fontSize="9" fontWeight="700" fill="#495057" transform="rotate(-90 20 180)" textAnchor="middle">Processus</text>
              <rect x="0" y="270" width={svgWidth} height="110" fill="white" stroke="#dee2e6" />
              <text x="20" y="325" fontSize="9" fontWeight="700" fill="#495057" transform="rotate(-90 20 325)" textAnchor="middle">Échanges</text>

              {/* Exigences documents */}
              {[
                { label: 'Programme &\nréférences', x: 60, y: 15 },
                { label: 'Règlement de\nconsultation', x: 60, y: 50 },
                { label: 'Cahier des\ncharges', x: 60, y: 75 },
                { label: 'Charte BIM\nMOA', x: 190, y: 10 },
                { label: 'CDC BIM-SIG', x: 190, y: 40 },
                { label: 'Programme &\nRéférences', x: 190, y: 65 },
              ].map((doc, i) => (
                <g key={i}>
                  <rect x={doc.x} y={doc.y} width="90" height="20" rx="2" fill="var(--color-gray-100)" stroke="var(--color-gray-300)" strokeWidth="0.5" />
                  {doc.label.split('\n').map((line, li) => (
                    <text key={li} x={doc.x + 45} y={doc.y + 10 + li * 9} textAnchor="middle" fontSize="6" fill="var(--color-gray-600)">{line}</text>
                  ))}
                </g>
              ))}

              {/* Start event */}
              <circle cx="50" cy="170" r="12" fill="white" stroke="var(--egis-green-400)" strokeWidth="2" />

              {/* Arrows between tasks */}
              {[
                { x1: 62, y1: 170, x2: 75, y2: 170 },
                { x1: 230, y1: 170, x2: 285, y2: 170 },
                { x1: 430, y1: 170, x2: 485, y2: 170 },
                { x1: 650, y1: 170, x2: 635, y2: 170 },
                { x1: 790, y1: 170, x2: 805, y2: 170 },
                { x1: 350, y1: 210, x2: 350, y2: 240 },
                { x1: 460, y1: 265, x2: 485, y2: 210 },
              ].map((arrow, i) => (
                <line key={i} x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2} stroke="var(--color-gray-400)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              ))}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="var(--color-gray-400)" />
                </marker>
              </defs>

              {/* BPMN Task boxes */}
              {bpmnTasks.map(task => {
                const isSelected = selectedTask === task.id;
                return (
                  <g key={task.id} style={{ cursor: 'pointer' }} onClick={() => handleTaskClick(task.id)}>
                    <rect
                      x={task.x} y={task.y} width={task.width} height={task.height}
                      rx="6" fill="white"
                      stroke={isSelected ? 'var(--egis-green-500)' : 'var(--color-gray-300)'}
                      strokeWidth={isSelected ? 2.5 : 1}
                      filter={isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : undefined}
                    />
                    <text x={task.x + 10} y={task.y - 4} fontSize="7" fontWeight="600" fill="var(--color-gray-400)">
                      Tâche {task.id}
                    </text>
                    {task.label.split('\n').map((line, li) => (
                      <text key={li} x={task.x + task.width / 2} y={task.y + 22 + li * 12} textAnchor="middle" fontSize="8" fill="var(--color-gray-800)">
                        {line}
                      </text>
                    ))}
                    {/* Role badge */}
                    <rect x={task.x + 10} y={task.y + task.height - 18} width={task.width - 20} height="14" rx="7" fill={task.roleColor} opacity="0.85" />
                    <text x={task.x + task.width / 2} y={task.y + task.height - 8} textAnchor="middle" fontSize="6.5" fontWeight="600" fill="white">
                      {task.responsable}
                    </text>
                    {/* Info button */}
                    <circle cx={task.x + task.width - 10} cy={task.y + 10} r="7" fill={isSelected ? 'var(--egis-green-400)' : 'var(--color-gray-200)'} />
                    <text x={task.x + task.width - 10} y={task.y + 13} textAnchor="middle" fontSize="8" fontWeight="700" fill={isSelected ? 'white' : 'var(--color-gray-500)'}>i</text>
                  </g>
                );
              })}

              {/* Decision diamond (validation) */}
              <polygon points="870,145 900,170 870,195 840,170" fill="white" stroke="var(--color-gray-400)" strokeWidth="1" />
              <text x="870" y="167" textAnchor="middle" fontSize="6" fill="var(--color-gray-600)">Valider ?</text>
              <text x="905" y="152" fontSize="6" fill="var(--color-gray-500)">Non</text>
              <text x="905" y="190" fontSize="6" fill="var(--egis-green-600)">Oui</text>

              {/* End event */}
              <circle cx={svgWidth - 30} cy="170" r="10" fill="white" stroke="var(--color-error)" strokeWidth="2.5" />

              {/* Deliverables in Échanges lane */}
              {[
                { label: 'Données d\'entrées\nAO sur l\'ECD', x: 480, y: 295, icon: '💾' },
                { label: 'Pré-BEP', x: 620, y: 285, icon: '📄' },
                { label: 'Livrables\nadditionnels', x: 620, y: 320, icon: '📄' },
              ].map((d, i) => (
                <g key={i}>
                  <text x={d.x} y={d.y} fontSize="7" fill="var(--color-gray-500)">{d.icon}</text>
                  {d.label.split('\n').map((line, li) => (
                    <text key={li} x={d.x + 20} y={d.y + 4 + li * 10} fontSize="7" fill="var(--color-gray-600)">{line}</text>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>
        <div className="card-footer" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>Légende :</span>
          {[
            { label: 'Responsable AO', color: 'var(--role-responsable-ao)' },
            { label: 'Référent AO', color: 'var(--role-referent-ao)' },
            { label: 'BIM Manager AO', color: 'var(--role-bim-manager)' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: l.color }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>{l.label}</span>
            </div>
          ))}
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', marginLeft: 'auto' }}>
            <Info size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Cliquez sur une tâche pour voir sa description ci-dessous
          </span>
        </div>
      </div>

      {/* Task descriptions — collapsible */}
      <div className="section">
        <h3 className="section-title">Description des tâches</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bpmnTasks.map(task => {
            const isOpen = selectedTask === task.id;
            return (
              <div key={task.id} id={`task-desc-${task.id}`} className="card" style={{ border: isOpen ? '2px solid var(--egis-green-400)' : undefined }}>
                <button
                  className="card-header"
                  style={{ cursor: 'pointer', background: isOpen ? 'var(--egis-green-50)' : undefined, border: 'none', width: '100%' }}
                  onClick={() => setSelectedTask(isOpen ? null : task.id)}
                  aria-expanded={isOpen}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: task.roleColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--text-xs)', fontWeight: 700, flexShrink: 0 }}>
                      {task.id}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: 'var(--text-sm)' }}>{task.label.replace(/\n/g, ' ')}</h4>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{task.responsable}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>{isOpen ? '▾' : '▸'}</span>
                </button>
                {isOpen && (
                  <div className="card-body">
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
                      {task.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
