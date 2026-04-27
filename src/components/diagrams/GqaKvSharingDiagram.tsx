import React from 'react';

export default function GqaKvSharingDiagram() {
  return (
    <div style={{ padding: '1rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 900 400" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        {/* Multi-Head Attention */}
        <g transform="translate(50, 50)">
          <text x="100" y="-10" textAnchor="middle" fill="#333" fontWeight="bold">Multi-Head (MHA)</text>

          <rect x="0" y="20" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="40" textAnchor="middle" fontSize="12" fill="#333">Q1</text>
          <rect x="0" y="70" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="90" textAnchor="middle" fontSize="12" fill="#333">Q2</text>
          <rect x="0" y="120" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="140" textAnchor="middle" fontSize="12" fill="#333">Qn</text>

          <rect x="140" y="20" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="40" textAnchor="middle" fontSize="12" fill="#333">K1, V1</text>
          <rect x="140" y="70" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="90" textAnchor="middle" fontSize="12" fill="#333">K2, V2</text>
          <rect x="140" y="120" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="140" textAnchor="middle" fontSize="12" fill="#333">Kn, Vn</text>

          <path d="M 60 35 L 140 35" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 85 L 140 85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 135 L 140 135" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <text x="100" y="190" textAnchor="middle" fontSize="12" fill="#666">N Queries : N KV pairs</text>
        </g>

        {/* Multi-Query Attention */}
        <g transform="translate(350, 50)">
          <text x="100" y="-10" textAnchor="middle" fill="#333" fontWeight="bold">Multi-Query (MQA)</text>

          <rect x="0" y="20" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="40" textAnchor="middle" fontSize="12" fill="#333">Q1</text>
          <rect x="0" y="70" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="90" textAnchor="middle" fontSize="12" fill="#333">Q2</text>
          <rect x="0" y="120" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="140" textAnchor="middle" fontSize="12" fill="#333">Qn</text>

          <rect x="140" y="70" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="90" textAnchor="middle" fontSize="12" fill="#333">K, V</text>

          <path d="M 60 35 L 140 80" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 85 L 140 85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 135 L 140 90" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <text x="100" y="190" textAnchor="middle" fontSize="12" fill="#666">N Queries : 1 KV pair</text>
        </g>

        {/* Grouped-Query Attention */}
        <g transform="translate(650, 50)">
          <text x="100" y="-10" textAnchor="middle" fill="#333" fontWeight="bold">Grouped-Query (GQA)</text>

          <rect x="-10" y="10" width="220" height="90" fill="#fff9c4" stroke="#fbc02d" rx="4" strokeDasharray="4,4" />
          <text x="100" y="25" textAnchor="middle" fontSize="10" fill="#666">Group 1</text>

          <rect x="0" y="30" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="50" textAnchor="middle" fontSize="12" fill="#333">Q1</text>
          <rect x="0" y="65" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="85" textAnchor="middle" fontSize="12" fill="#333">Q2</text>

          <rect x="140" y="47" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="67" textAnchor="middle" fontSize="12" fill="#333">K1, V1</text>

          <path d="M 60 45 L 140 55" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 80 L 140 65" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="-10" y="110" width="220" height="90" fill="#fff9c4" stroke="#fbc02d" rx="4" strokeDasharray="4,4" />
          <text x="100" y="125" textAnchor="middle" fontSize="10" fill="#666">Group 2</text>

          <rect x="0" y="130" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="150" textAnchor="middle" fontSize="12" fill="#333">Q3</text>
          <rect x="0" y="165" width="60" height="30" fill="#f3e5f5" stroke="#8e24aa" rx="4" />
          <text x="30" y="185" textAnchor="middle" fontSize="12" fill="#333">Q4</text>

          <rect x="140" y="147" width="60" height="30" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="170" y="167" textAnchor="middle" fontSize="12" fill="#333">K2, V2</text>

          <path d="M 60 145 L 140 155" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 180 L 140 165" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <text x="100" y="220" textAnchor="middle" fontSize="12" fill="#666">N Queries : G KV pairs</text>
        </g>
      </svg>
    </div>
  );
}
