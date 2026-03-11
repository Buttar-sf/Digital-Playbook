import { useState } from 'react';
import { bpmnTasks } from '../data/mockData';

export default function Taches() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Description des tâches du BPMN</h1>
          <p className="page-header-sub">Intégration du digital dans les offres — Détail de chaque tâche</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bpmnTasks.map(task => {
          const isOpen = openId === task.id;
          return (
            <div key={task.id} className="card">
              <button
                className="card-header"
                style={{ cursor: 'pointer', background: isOpen ? 'var(--egis-green-50)' : undefined, border: 'none', width: '100%' }}
                onClick={() => setOpenId(isOpen ? null : task.id)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-md)',
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
                <span style={{ fontSize: 'var(--text-md)', color: 'var(--color-gray-400)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
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
  );
}
