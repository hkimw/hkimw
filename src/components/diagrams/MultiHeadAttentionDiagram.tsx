import React from 'react';

export default function MultiHeadAttentionDiagram() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 500" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        {/* Input */}
        <rect x="300" y="20" width="200" height="40" fill="#e8eaf6" stroke="#3f51b5" rx="4" />
        <text x="400" y="35" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Input Q, K, V</text>
        <text x="400" y="50" textAnchor="middle" fontSize="10" fill="#666">(d_model=512)</text>

        <path d="M 400 60 L 400 90" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Linear Split */}
        <rect x="250" y="90" width="300" height="40" fill="#e0f2f1" stroke="#00695c" rx="4" />
        <text x="400" y="105" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Linear Projections &amp; Split</text>
        <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#666">(h=8 heads)</text>

        {/* Heads Connectors */}
        <path d="M 300 130 L 150 160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 350 130 L 300 160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 450 130 L 500 160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 500 130 L 650 160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Heads */}
        {/* Head 1 */}
        <g transform="translate(100, 160)">
          <rect x="0" y="0" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Head 1</text>
          <text x="50" y="30" textAnchor="middle" fontSize="10" fill="#666">(d_k=64)</text>

          <path d="M 50 40 L 50 70" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="0" y="70" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#333">Scaled Dot-</text>
          <text x="50" y="100" textAnchor="middle" fontSize="10" fill="#333">Product Attn</text>

          <path d="M 50 110 L 100 180" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Head 2 */}
        <g transform="translate(250, 160)">
          <rect x="0" y="0" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Head 2</text>
          <text x="50" y="30" textAnchor="middle" fontSize="10" fill="#666">(d_k=64)</text>

          <path d="M 50 40 L 50 70" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="0" y="70" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#333">Scaled Dot-</text>
          <text x="50" y="100" textAnchor="middle" fontSize="10" fill="#333">Product Attn</text>

          <path d="M 50 110 L 100 180" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        <text x="400" y="220" textAnchor="middle" fontSize="24" fill="#666" letterSpacing="5">...</text>

        {/* Head 8 */}
        <g transform="translate(600, 160)">
          <rect x="0" y="0" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Head 8</text>
          <text x="50" y="30" textAnchor="middle" fontSize="10" fill="#666">(d_k=64)</text>

          <path d="M 50 40 L 50 70" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="0" y="70" width="100" height="40" fill="#ffe0b2" stroke="#ef6c00" rx="4" />
          <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#333">Scaled Dot-</text>
          <text x="50" y="100" textAnchor="middle" fontSize="10" fill="#333">Product Attn</text>

          <path d="M 50 110 L -100 180" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Concatenation */}
        <g transform="translate(250, 340)">
          <rect x="0" y="0" width="300" height="40" fill="#e0f2f1" stroke="#00695c" rx="4" />
          <text x="150" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Concatenate</text>
          <text x="150" y="30" textAnchor="middle" fontSize="10" fill="#666">(8 × 64 = 512 dim)</text>

          <path d="M 150 40 L 150 70" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="50" y="70" width="200" height="40" fill="#e0f2f1" stroke="#00695c" rx="4" />
          <text x="150" y="85" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Final Linear Projection</text>

          <path d="M 150 110 L 150 140" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="50" y="140" width="200" height="40" fill="#c8e6c9" stroke="#2e7d32" rx="4" />
          <text x="150" y="165" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Multi-Head Attention Output</text>
        </g>
      </svg>
    </div>
  );
}
