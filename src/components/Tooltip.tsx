import { useState } from 'react';
import { glossaire } from '../data/glossaire';

export function GlossaryTerm({ term }: { term: string }) {
  const [show, setShow] = useState(false);
  const definition = glossaire[term];
  if (!definition) return <span>{term}</span>;

  return (
    <span
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <abbr
        title={definition}
        style={{
          textDecoration: 'none',
          borderBottom: '1px dotted var(--egis-green-400)',
          cursor: 'help',
          fontWeight: 600,
        }}
      >
        {term}
      </abbr>
      {show && (
        <span style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--color-gray-900)', color: 'var(--color-white)',
          padding: '6px 12px', borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-xs)', whiteSpace: 'nowrap', zIndex: 999,
          boxShadow: 'var(--shadow-md)', marginBottom: 4, pointerEvents: 'none',
        }}>
          {definition}
        </span>
      )}
    </span>
  );
}
