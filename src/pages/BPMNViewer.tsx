import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Info } from 'lucide-react';
import { bpmnTasks } from '../data/mockData';
import { TaskNode, StartNode, EndNode, GatewayNode, DocNode, LaneLabel } from '../components/BPMNNodes';

const nodeTypes = {
  task: TaskNode,
  start: StartNode,
  end: EndNode,
  gateway: GatewayNode,
  doc: DocNode,
  lane: LaneLabel,
};

const LANE_Y_REF = 0;
const LANE_Y_PROC = 150;
const LANE_Y_EXCH = 370;

function buildGraph(onInfo: (id: string) => void): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    // Swim lane labels
    { id: 'lane-ref', type: 'lane', position: { x: 0, y: LANE_Y_REF + 10 }, data: { label: 'Exigences &\nRéférences' }, draggable: false, selectable: false },
    { id: 'lane-proc', type: 'lane', position: { x: 0, y: LANE_Y_PROC + 10 }, data: { label: 'Processus' }, draggable: false, selectable: false },
    { id: 'lane-exch', type: 'lane', position: { x: 0, y: LANE_Y_EXCH + 10 }, data: { label: 'Échanges &\nLivrables' }, draggable: false, selectable: false },

    // Reference documents (top lane)
    { id: 'doc-prog', type: 'doc', position: { x: 60, y: LANE_Y_REF + 10 }, data: { label: 'Programme &\nréférences', icon: '📋' }, draggable: false, selectable: false },
    { id: 'doc-reglement', type: 'doc', position: { x: 60, y: LANE_Y_REF + 65 }, data: { label: 'Règlement de\nconsultation', icon: '📋' }, draggable: false, selectable: false },
    { id: 'doc-cdc', type: 'doc', position: { x: 200, y: LANE_Y_REF + 10 }, data: { label: 'Charte BIM\nMOA', icon: '📘' }, draggable: false, selectable: false },
    { id: 'doc-cdcbim', type: 'doc', position: { x: 200, y: LANE_Y_REF + 65 }, data: { label: 'CDC BIM-SIG', icon: '📘' }, draggable: false, selectable: false },

    // Start event
    { id: 'start', type: 'start', position: { x: 50, y: LANE_Y_PROC + 55 }, data: {}, draggable: false },

    // Task nodes (process lane)
    ...bpmnTasks.map((t, i) => ({
      id: `task-${t.id}`,
      type: 'task' as const,
      position: { x: 110 + i * 220, y: LANE_Y_PROC + (t.id === '1.3' ? 120 : 20) },
      data: { label: t.label, taskId: t.id, responsable: t.responsable, roleColor: t.roleColor, onInfo },
    })),

    // Gateway (validation)
    { id: 'gateway-valid', type: 'gateway', position: { x: 110 + 5 * 220 + 200, y: LANE_Y_PROC + 42 }, data: { label: 'Valider ?' }, draggable: false },

    // End event
    { id: 'end', type: 'end', position: { x: 110 + 6 * 220 + 210, y: LANE_Y_PROC + 55 }, data: {}, draggable: false },

    // Deliverable documents (exchange lane)
    { id: 'doc-ecd', type: 'doc', position: { x: 110 + 3 * 220 + 40, y: LANE_Y_EXCH + 10 }, data: { label: 'Données d\'entrées\nAO sur l\'ECD', icon: '💾' }, draggable: false, selectable: false },
    { id: 'doc-prebep', type: 'doc', position: { x: 110 + 4 * 220 + 20, y: LANE_Y_EXCH + 10 }, data: { label: 'Pré-BEP', icon: '📄' }, draggable: false, selectable: false },
    { id: 'doc-livrables', type: 'doc', position: { x: 110 + 4 * 220 + 20, y: LANE_Y_EXCH + 70 }, data: { label: 'Livrables\nadditionnels', icon: '📄' }, draggable: false, selectable: false },
  ];

  const edgeBase = { markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#adb5bd' }, style: { stroke: '#adb5bd', strokeWidth: 1.5 } };

  const edges: Edge[] = [
    // Start → Task 1.1
    { id: 'e-start-1.1', source: 'start', target: 'task-1.1', type: 'smoothstep', ...edgeBase },
    // 1.1 → 1.2
    { id: 'e-1.1-1.2', source: 'task-1.1', target: 'task-1.2', type: 'smoothstep', ...edgeBase },
    // 1.2 → 1.3 (down)
    { id: 'e-1.2-1.3', source: 'task-1.2', target: 'task-1.3', type: 'smoothstep', ...edgeBase },
    // 1.2 → 1.4
    { id: 'e-1.2-1.4', source: 'task-1.2', target: 'task-1.4', type: 'smoothstep', ...edgeBase },
    // 1.3 → 1.4 (up from below)
    { id: 'e-1.3-1.4', source: 'task-1.3', target: 'task-1.4', type: 'smoothstep', ...edgeBase },
    // 1.4 → 1.5
    { id: 'e-1.4-1.5', source: 'task-1.4', target: 'task-1.5', type: 'smoothstep', ...edgeBase },
    // 1.5 → 1.6
    { id: 'e-1.5-1.6', source: 'task-1.5', target: 'task-1.6', type: 'smoothstep', ...edgeBase },
    // 1.6 → Gateway
    { id: 'e-1.6-gw', source: 'task-1.6', target: 'gateway-valid', type: 'smoothstep', ...edgeBase },
    // Gateway → 1.7 (Oui)
    { id: 'e-gw-1.7', source: 'gateway-valid', sourceHandle: 'yes', target: 'task-1.7', type: 'smoothstep', label: 'Oui', labelStyle: { fontSize: 9, fill: '#2f855a', fontWeight: 600 }, ...edgeBase },
    // Gateway → back to 1.5 (Non - loop)
    { id: 'e-gw-back', source: 'gateway-valid', sourceHandle: 'no', target: 'task-1.5', type: 'smoothstep', label: 'Non', labelStyle: { fontSize: 9, fill: '#c53030', fontWeight: 600 }, style: { stroke: '#c53030', strokeWidth: 1.5, strokeDasharray: '5,3' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#c53030' } },
    // 1.7 → End
    { id: 'e-1.7-end', source: 'task-1.7', target: 'end', type: 'smoothstep', ...edgeBase },
  ];

  return { nodes, edges };
}

export default function BPMNViewer() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleInfo = useCallback((taskId: string) => {
    setSelectedTask(prev => prev === taskId ? null : taskId);
    setTimeout(() => {
      const el = document.getElementById(`task-desc-${taskId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => buildGraph(handleInfo), [handleInfo]);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    if (node.type === 'task') {
      const taskId = (node.data as { taskId: string }).taskId;
      handleInfo(taskId);
    }
  }, [handleInfo]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>BPMN — Traitement des offres</h1>
          <p className="page-header-sub">Processus de traitement des offres — Version 0.1 — BPMN N°1</p>
        </div>
      </div>

      {/* React Flow BPMN diagram */}
      <div className="card section">
        <div className="card-header">
          <h3>Processus de traitement des offres</h3>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
            Zoom : molette · Déplacer : clic + glisser · Clic sur une tâche pour la description
          </span>
        </div>
        <div style={{ height: 520, background: 'var(--color-gray-50)' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={2}
            attributionPosition="bottom-left"
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#dee2e6" />
            <Controls showInteractive={false} />
            <MiniMap
              nodeStrokeWidth={3}
              nodeColor={(n) => {
                if (n.type === 'task') return (n.data as { roleColor: string }).roleColor;
                if (n.type === 'start') return '#8dc63f';
                if (n.type === 'end') return '#c53030';
                if (n.type === 'gateway') return '#f5d033';
                return '#e9ecef';
              }}
              style={{ borderRadius: 8, border: '1px solid var(--border-color)' }}
            />
          </ReactFlow>
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
            <Info size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Cliquez sur une tâche pour voir sa description
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
