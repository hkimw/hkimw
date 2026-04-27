import React from 'react';

export default function TaskAwareTransformationDiagram() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0', overflowX: 'auto' }}>
      <svg viewBox="0 0 900 250" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <text x="450" y="20" textAnchor="middle" fill="#333" fontWeight="bold" fontSize="16">Task-aware Input Transformations (Multiple Choice)</text>

        {/* Option 1 path */}
        <g transform="translate(50, 60)">
          <rect x="0" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="30" y="20" textAnchor="middle" fontSize="12" fill="#333">&lt;S&gt;</text>

          <rect x="70" y="0" width="120" height="30" fill="#e1bee7" stroke="#8e24aa" rx="4" />
          <text x="130" y="20" textAnchor="middle" fontSize="12" fill="#333">Premise</text>

          <rect x="200" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="230" y="20" textAnchor="middle" fontSize="12" fill="#333">$</text>

          <rect x="270" y="0" width="100" height="30" fill="#e1bee7" stroke="#8e24aa" rx="4" />
          <text x="320" y="20" textAnchor="middle" fontSize="12" fill="#333">Option 1</text>

          <rect x="380" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="410" y="20" textAnchor="middle" fontSize="12" fill="#333">&lt;E&gt;</text>

          <path d="M 450 15 L 480 15" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="490" y="-10" width="100" height="50" fill="#bbdefb" stroke="#1976d2" rx="4" />
          <text x="540" y="10" textAnchor="middle" fontSize="12" fill="#333">Transformer</text>
          <text x="540" y="25" textAnchor="middle" fontSize="10" fill="#666">+ Linear</text>

          <path d="M 600 15 L 630 35" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Option 2 path */}
        <g transform="translate(50, 130)">
          <rect x="0" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="30" y="20" textAnchor="middle" fontSize="12" fill="#333">&lt;S&gt;</text>

          <rect x="70" y="0" width="120" height="30" fill="#e1bee7" stroke="#8e24aa" rx="4" />
          <text x="130" y="20" textAnchor="middle" fontSize="12" fill="#333">Premise</text>

          <rect x="200" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="230" y="20" textAnchor="middle" fontSize="12" fill="#333">$</text>

          <rect x="270" y="0" width="100" height="30" fill="#e1bee7" stroke="#8e24aa" rx="4" />
          <text x="320" y="20" textAnchor="middle" fontSize="12" fill="#333">Option 2</text>

          <rect x="380" y="0" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="410" y="20" textAnchor="middle" fontSize="12" fill="#333">&lt;E&gt;</text>

          <path d="M 450 15 L 480 15" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="490" y="-10" width="100" height="50" fill="#bbdefb" stroke="#1976d2" rx="4" />
          <text x="540" y="10" textAnchor="middle" fontSize="12" fill="#333">Transformer</text>
          <text x="540" y="25" textAnchor="middle" fontSize="10" fill="#666">+ Linear</text>

          <path d="M 600 15 L 630 -5" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Softmax and Output */}
        <g transform="translate(680, 80)">
          <rect x="0" y="0" width="80" height="60" fill="#c8e6c9" stroke="#388e3c" rx="4" />
          <text x="40" y="35" textAnchor="middle" fontSize="12" fill="#333">Softmax</text>

          <path d="M 90 30 L 120 30" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="130" y="0" width="80" height="60" fill="#fff" stroke="#333" rx="4" />
          <text x="170" y="25" textAnchor="middle" fontSize="12" fill="#333">Output</text>
          <text x="170" y="45" textAnchor="middle" fontSize="10" fill="#666">Probabilities</text>
        </g>

        {/* Dashed line to indicate more options */}
        <path d="M 370 190 L 370 210" stroke="#999" strokeWidth="2" strokeDasharray="4,4" />
      </svg>
    </div>
  );
}
