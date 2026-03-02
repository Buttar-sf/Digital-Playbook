import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { GripVertical } from 'lucide-react';

/* ── BPMN Task Node ── */
export const TaskNode = memo(({ data, selected }: NodeProps) => {
  const d = data as { label: string; taskId: string; responsable: string; roleColor: string; onInfo?: (id: string) => void };
  return (
    <div
      style={{
        background: 'white',
        border: selected ? '2.5px solid var(--egis-green-500)' : '1px solid var(--color-gray-300)',
        borderRadius: 8,
        minWidth: 190,
        boxShadow: selected ? '0 0 0 3px rgba(141,198,63,0.2)' : 'var(--shadow-sm)',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-gray-400)', width: 7, height: 7 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />

      {/* Header with drag handle */}
      <div style={{
        padding: '4px 8px 4px 0',
        borderBottom: '1px solid var(--color-gray-100)',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {/* Drag grip — this is the draggable zone */}
        <div
          className="drag-handle"
          style={{
            cursor: 'grab', padding: '2px 4px',
            display: 'flex', alignItems: 'center',
            color: 'var(--color-gray-300)',
            borderRight: '1px solid var(--color-gray-100)',
          }}
        >
          <GripVertical size={12} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-gray-400)', flex: 1 }}>Tâche {d.taskId}</span>
        <button
          onClick={(e) => { e.stopPropagation(); d.onInfo?.(d.taskId); }}
          style={{
            width: 18, height: 18, borderRadius: '50%',
            background: selected ? 'var(--egis-green-400)' : 'var(--color-gray-200)',
            color: selected ? 'white' : 'var(--color-gray-500)',
            border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title="Voir la description"
        >
          i
        </button>
      </div>

      {/* Body — clicking opens description */}
      <div
        style={{ padding: '8px 12px', cursor: 'pointer' }}
        onClick={(e) => { e.stopPropagation(); d.onInfo?.(d.taskId); }}
      >
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-gray-800)', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
          {d.label}
        </div>
      </div>

      {/* Role badge */}
      <div style={{ padding: '4px 12px 8px' }}>
        <span style={{
          display: 'inline-block', padding: '2px 10px', borderRadius: 99,
          background: d.roleColor, color: 'white', fontSize: 9, fontWeight: 700, whiteSpace: 'nowrap',
        }}>
          {d.responsable}
        </span>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: 'var(--color-gray-400)', width: 7, height: 7 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
    </div>
  );
});
TaskNode.displayName = 'TaskNode';

/* ── BPMN Start Event ── */
export const StartNode = memo(function StartNodeInner() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      border: '2.5px solid var(--egis-green-400)', background: 'white',
    }}>
      <Handle type="source" position={Position.Right} style={{ background: 'var(--egis-green-400)', width: 7, height: 7 }} />
    </div>
  );
});

/* ── BPMN End Event ── */
export const EndNode = memo(function EndNodeInner() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      border: '3px solid var(--color-error)', background: 'white',
    }}>
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-error)', width: 7, height: 7 }} />
    </div>
  );
});

/* ── BPMN Gateway (Decision Diamond) ── */
export const GatewayNode = memo(({ data }: NodeProps) => {
  const d = data as { label?: string };
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      <div style={{
        width: 48, height: 48, transform: 'rotate(45deg)',
        border: '1.5px solid var(--color-gray-400)', background: 'white',
        position: 'absolute', top: 0, left: 0,
      }} />
      <span style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 9, color: 'var(--color-gray-600)', whiteSpace: 'nowrap', fontWeight: 600,
      }}>
        {d.label || '?'}
      </span>
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-gray-400)', width: 7, height: 7, left: -4, top: '50%' }} />
      <Handle type="source" position={Position.Right} id="yes" style={{ background: 'var(--color-gray-400)', width: 7, height: 7, right: -4, top: '50%' }} />
      <Handle type="source" position={Position.Top} id="no" style={{ background: 'var(--color-gray-400)', width: 7, height: 7, top: -4, left: '50%' }} />
    </div>
  );
});
GatewayNode.displayName = 'GatewayNode';

/* ── BPMN Document Node ── */
export const DocNode = memo(({ data }: NodeProps) => {
  const d = data as { label: string; icon?: string };
  return (
    <div style={{
      background: 'var(--color-gray-50)', border: '1px solid var(--color-gray-200)',
      borderRadius: 6, padding: '6px 12px', minWidth: 110, textAlign: 'center',
    }}>
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
      {d.icon && <span style={{ fontSize: 16, display: 'block', marginBottom: 2 }}>{d.icon}</span>}
      <div style={{ fontSize: 9, color: 'var(--color-gray-600)', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{d.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
    </div>
  );
});
DocNode.displayName = 'DocNode';

/* ── Swim Lane Label ── */
export const LaneLabel = memo(({ data }: NodeProps) => {
  const d = data as { label: string };
  return (
    <div style={{
      writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
      fontSize: 10, fontWeight: 700, color: 'var(--color-gray-500)',
      letterSpacing: '0.05em', textTransform: 'uppercase',
      padding: '8px 6px', background: 'var(--color-gray-100)', borderRadius: 4,
      minHeight: 110, display: 'flex', alignItems: 'center', justifyContent: 'center',
      whiteSpace: 'pre-line', textAlign: 'center', lineHeight: 1.3,
    }}>
      {d.label}
    </div>
  );
});
LaneLabel.displayName = 'LaneLabel';
