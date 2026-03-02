import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

/* ── BPMN Task Node ── */
export const TaskNode = memo(({ data, selected }: NodeProps) => {
  const d = data as { label: string; taskId: string; responsable: string; roleColor: string; onInfo?: (id: string) => void };
  return (
    <div
      style={{
        background: 'white',
        border: selected ? `2.5px solid var(--egis-green-500)` : '1px solid var(--color-gray-300)',
        borderRadius: 8,
        padding: 0,
        minWidth: 180,
        boxShadow: selected ? '0 0 0 3px rgba(141,198,63,0.2)' : 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-gray-400)', width: 6, height: 6 }} />

      {/* Header */}
      <div style={{
        padding: '6px 12px',
        borderBottom: '1px solid var(--color-gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-gray-400)' }}>Tâche {d.taskId}</span>
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

      {/* Body */}
      <div style={{ padding: '8px 12px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-gray-800)', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
          {d.label}
        </div>
      </div>

      {/* Role badge */}
      <div style={{
        padding: '4px 12px 8px',
      }}>
        <span style={{
          display: 'inline-block',
          padding: '2px 10px',
          borderRadius: 99,
          background: d.roleColor,
          color: 'white',
          fontSize: 9,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {d.responsable}
        </span>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: 'var(--color-gray-400)', width: 6, height: 6 }} />
    </div>
  );
});
TaskNode.displayName = 'TaskNode';

/* ── BPMN Start Event ── */
export const StartNode = memo(function StartNodeInner() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      border: '2.5px solid var(--egis-green-400)',
      background: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Handle type="source" position={Position.Right} style={{ background: 'var(--egis-green-400)', width: 6, height: 6 }} />
    </div>
  );
});

/* ── BPMN End Event ── */
export const EndNode = memo(function EndNodeInner() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      border: '3px solid var(--color-error)',
      background: 'white',
    }}>
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-error)', width: 6, height: 6 }} />
    </div>
  );
});
EndNode.displayName = 'EndNode';

/* ── BPMN Gateway (Decision Diamond) ── */
export const GatewayNode = memo(({ data }: NodeProps) => {
  const d = data as { label?: string };
  return (
    <div style={{ position: 'relative', width: 44, height: 44 }}>
      <div style={{
        width: 44, height: 44,
        transform: 'rotate(45deg)',
        border: '1.5px solid var(--color-gray-400)',
        background: 'white',
        position: 'absolute', top: 0, left: 0,
      }} />
      <span style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 9, color: 'var(--color-gray-600)', whiteSpace: 'nowrap', fontWeight: 600,
      }}>
        {d.label || '?'}
      </span>
      <Handle type="target" position={Position.Left} style={{ background: 'var(--color-gray-400)', width: 6, height: 6, left: -3, top: '50%' }} />
      <Handle type="source" position={Position.Right} id="yes" style={{ background: 'var(--color-gray-400)', width: 6, height: 6, right: -3, top: '50%' }} />
      <Handle type="source" position={Position.Top} id="no" style={{ background: 'var(--color-gray-400)', width: 6, height: 6, top: -3, left: '50%' }} />
    </div>
  );
});
GatewayNode.displayName = 'GatewayNode';

/* ── BPMN Document Node ── */
export const DocNode = memo(({ data }: NodeProps) => {
  const d = data as { label: string; icon?: string };
  return (
    <div style={{
      background: 'var(--color-gray-50)',
      border: '1px solid var(--color-gray-200)',
      borderRadius: 6,
      padding: '6px 10px',
      minWidth: 100,
      textAlign: 'center',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
      {d.icon && <span style={{ fontSize: 16 }}>{d.icon}</span>}
      <div style={{ fontSize: 9, color: 'var(--color-gray-500)', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{d.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: 'var(--color-gray-300)', width: 5, height: 5 }} />
    </div>
  );
});
DocNode.displayName = 'DocNode';

/* ── Swim Lane Label ── */
export const LaneLabel = memo(({ data }: NodeProps) => {
  const d = data as { label: string };
  return (
    <div style={{
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
      transform: 'rotate(180deg)',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--color-gray-500)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      padding: '8px 4px',
      background: 'var(--color-gray-100)',
      borderRadius: 4,
      minHeight: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {d.label}
    </div>
  );
});
LaneLabel.displayName = 'LaneLabel';
