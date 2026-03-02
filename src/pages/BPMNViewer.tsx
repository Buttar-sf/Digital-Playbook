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

/*
  Layout constants — one "node gap" between each item.
  Node width ~200, gap ~60, so step = 260.
*/
const GAP = 260;
const LANE_REF_Y = 0;
const LANE_PROC_Y = 170;
const LANE_EXCH_Y = 440;
const TASK_Y = LANE_PROC_Y + 30;
const TASK_1_3_Y = LANE_PROC_Y + 160;

function buildGraph(onInfo: (id: string) => void): { nodes: Node[]; edges: Edge[] } {

  // Task X positions with uniform spacing
  const tx = (i: number) => 80 + i * GAP;

  const nodes: Node[] = [
    // ─── Swim lane labels ───
    { id: 'lane-ref', type: 'lane', position: { x: 0, y: LANE_REF_Y + 15 }, data: { label: 'Exigences &\nRéférences' }, draggable: false, selectable: false },
    { id: 'lane-proc', type: 'lane', position: { x: 0, y: LANE_PROC_Y + 15 }, data: { label: 'Processus' }, draggable: false, selectable: false },
    { id: 'lane-exch', type: 'lane', position: { x: 0, y: LANE_EXCH_Y + 15 }, data: { label: 'Échanges &\nLivrables' }, draggable: false, selectable: false },

    // ─── Reference documents (top lane) — connected to tasks 1.1 & 1.2 ───
    { id: 'doc-prog', type: 'doc', position: { x: tx(0), y: LANE_REF_Y + 5 }, data: { label: 'Programme &\nréférences', icon: '📋' }, draggable: false, selectable: false },
    { id: 'doc-reglement', type: 'doc', position: { x: tx(0), y: LANE_REF_Y + 70 }, data: { label: 'Règlement de\nconsultation', icon: '📋' }, draggable: false, selectable: false },
    { id: 'doc-cahier', type: 'doc', position: { x: tx(0) + 150, y: LANE_REF_Y + 100 }, data: { label: 'Cahier des\ncharges', icon: '📋' }, draggable: false, selectable: false },
    { id: 'doc-charte', type: 'doc', position: { x: tx(1), y: LANE_REF_Y + 5 }, data: { label: 'Charte BIM\nMOA', icon: '📘' }, draggable: false, selectable: false },
    { id: 'doc-cdc-bim', type: 'doc', position: { x: tx(1), y: LANE_REF_Y + 70 }, data: { label: 'Cahier des Charges\nBIM-SIG', icon: '📘' }, draggable: false, selectable: false },
    { id: 'doc-prog2', type: 'doc', position: { x: tx(1) + 150, y: LANE_REF_Y + 100 }, data: { label: 'Programme &\nRéférences', icon: '📘' }, draggable: false, selectable: false },

    // ─── Start event ───
    { id: 'start', type: 'start', position: { x: 35, y: TASK_Y + 40 }, data: {}, draggable: false },

    // ─── Task nodes — uniform GAP spacing ───
    {
      id: 'task-1.1', type: 'task', position: { x: tx(0), y: TASK_Y },
      data: { label: bpmnTasks[0].label, taskId: '1.1', responsable: bpmnTasks[0].responsable, roleColor: bpmnTasks[0].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.2', type: 'task', position: { x: tx(1), y: TASK_Y },
      data: { label: bpmnTasks[1].label, taskId: '1.2', responsable: bpmnTasks[1].responsable, roleColor: bpmnTasks[1].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.3', type: 'task', position: { x: tx(1) + 130, y: TASK_1_3_Y },
      data: { label: bpmnTasks[2].label, taskId: '1.3', responsable: bpmnTasks[2].responsable, roleColor: bpmnTasks[2].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.4', type: 'task', position: { x: tx(2), y: TASK_Y },
      data: { label: bpmnTasks[3].label, taskId: '1.4', responsable: bpmnTasks[3].responsable, roleColor: bpmnTasks[3].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.5', type: 'task', position: { x: tx(3), y: TASK_Y },
      data: { label: bpmnTasks[4].label, taskId: '1.5', responsable: bpmnTasks[4].responsable, roleColor: bpmnTasks[4].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.6', type: 'task', position: { x: tx(4), y: TASK_Y },
      data: { label: bpmnTasks[5].label, taskId: '1.6', responsable: bpmnTasks[5].responsable, roleColor: bpmnTasks[5].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },
    {
      id: 'task-1.7', type: 'task', position: { x: tx(5) + 80, y: TASK_Y },
      data: { label: bpmnTasks[6].label, taskId: '1.7', responsable: bpmnTasks[6].responsable, roleColor: bpmnTasks[6].roleColor, onInfo },
      dragHandle: '.drag-handle',
    },

    // ─── Gateway ───
    { id: 'gateway', type: 'gateway', position: { x: tx(5), y: TASK_Y + 38 }, data: { label: 'Valider ?' }, draggable: false },

    // ─── End event ───
    { id: 'end', type: 'end', position: { x: tx(5) + GAP + 80, y: TASK_Y + 40 }, data: {}, draggable: false },

    // ─── Deliverable documents (exchange lane) — connected to tasks ───
    { id: 'doc-ecd', type: 'doc', position: { x: tx(2) + 30, y: LANE_EXCH_Y + 10 }, data: { label: 'Données d\'entrées\nAO sur l\'ECD', icon: '💾' }, draggable: false, selectable: false },
    { id: 'doc-prebep', type: 'doc', position: { x: tx(3), y: LANE_EXCH_Y + 10 }, data: { label: 'Pré-BEP', icon: '📄' }, draggable: false, selectable: false },
    { id: 'doc-livrables', type: 'doc', position: { x: tx(3) + 150, y: LANE_EXCH_Y + 10 }, data: { label: 'Livrables\nadditionnels', icon: '📄' }, draggable: false, selectable: false },
  ];

  const edgeFlow = {
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: '#6c757d' },
    style: { stroke: '#6c757d', strokeWidth: 1.5 },
  };

  const edgeDotted = {
    style: { stroke: '#adb5bd', strokeWidth: 1, strokeDasharray: '6,4' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: '#adb5bd' },
  };

  const edges: Edge[] = [
    // ═══ PROCESS FLOW ═══
    { id: 'e-start-1.1', source: 'start', target: 'task-1.1', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.1-1.2', source: 'task-1.1', target: 'task-1.2', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.2-1.3', source: 'task-1.2', sourceHandle: 'bottom', target: 'task-1.3', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.2-1.4', source: 'task-1.2', target: 'task-1.4', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.3-1.4', source: 'task-1.3', target: 'task-1.4', targetHandle: 'top', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.4-1.5', source: 'task-1.4', target: 'task-1.5', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.5-1.6', source: 'task-1.5', target: 'task-1.6', type: 'smoothstep', ...edgeFlow },
    { id: 'e-1.6-gw', source: 'task-1.6', target: 'gateway', type: 'smoothstep', ...edgeFlow },
    {
      id: 'e-gw-1.7', source: 'gateway', sourceHandle: 'yes', target: 'task-1.7', type: 'smoothstep',
      label: 'Oui', labelStyle: { fontSize: 10, fill: '#2f855a', fontWeight: 700 }, ...edgeFlow,
    },
    {
      id: 'e-gw-back', source: 'gateway', sourceHandle: 'no', target: 'task-1.5', targetHandle: 'top',
      type: 'smoothstep',
      label: 'Non', labelStyle: { fontSize: 10, fill: '#c53030', fontWeight: 700 },
      style: { stroke: '#c53030', strokeWidth: 1.5, strokeDasharray: '6,4' },
      markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: '#c53030' },
    },
    { id: 'e-1.7-end', source: 'task-1.7', target: 'end', type: 'smoothstep', ...edgeFlow },

    // ═══ EXIGENCES → TASKS (dotted connections from reference docs to tasks) ═══
    { id: 'e-doc-prog-1.1', source: 'doc-prog', sourceHandle: 'bottom', target: 'task-1.1', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-doc-regl-1.1', source: 'doc-reglement', sourceHandle: 'bottom', target: 'task-1.1', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-doc-cahier-1.1', source: 'doc-cahier', sourceHandle: 'bottom', target: 'task-1.1', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-doc-charte-1.2', source: 'doc-charte', sourceHandle: 'bottom', target: 'task-1.2', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-doc-cdcbim-1.2', source: 'doc-cdc-bim', sourceHandle: 'bottom', target: 'task-1.2', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-doc-prog2-1.2', source: 'doc-prog2', sourceHandle: 'bottom', target: 'task-1.2', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },

    // ═══ TASKS → LIVRABLES (dotted connections from tasks to deliverable docs) ═══
    { id: 'e-1.4-ecd', source: 'task-1.4', sourceHandle: 'bottom', target: 'doc-ecd', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-1.5-prebep', source: 'task-1.5', sourceHandle: 'bottom', target: 'doc-prebep', targetHandle: 'top', type: 'smoothstep', ...edgeDotted },
    { id: 'e-1.5-livrables', source: 'task-1.5', sourceHandle: 'bottom', target: 'doc-livrables', targetHandle: 'left', type: 'smoothstep', ...edgeDotted },
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

  const onNodeClick: NodeMouseHandler = useCallback(() => {
    // click handled inside node body via onInfo
  }, []);

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
            Zoom molette · Déplacer : fond = pan, grip ⠿ = déplacer un nœud
          </span>
        </div>
        <div style={{ height: 580, background: 'var(--color-gray-50)' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            minZoom={0.25}
            maxZoom={2.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#dee2e6" />
            <Controls showInteractive={false} />
            <MiniMap
              nodeStrokeWidth={3}
              pannable
              zoomable
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
            { label: 'BIM / SIG Manager AO', color: 'var(--role-bim-manager)' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 'var(--radius-full)', background: l.color }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>{l.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 0, borderTop: '1.5px dashed #adb5bd' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>Liens documents</span>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', marginLeft: 'auto' }}>
            <Info size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Cliquez sur une tâche pour sa description
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
                    <div style={{
                      width: 30, height: 30, borderRadius: 'var(--radius-md)',
                      background: task.roleColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 'var(--text-xs)', fontWeight: 700, flexShrink: 0,
                    }}>
                      {task.id}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: 'var(--text-sm)' }}>Tâche {task.id} — {task.label.replace(/\n/g, ' ')}</h4>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{task.responsable}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)', transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                </button>
                {isOpen && (
                  <div className="card-body" style={{ borderTop: '1px solid var(--border-color)' }}>
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
