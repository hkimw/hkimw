import React from 'react';

export default function GemmaArchitectureDiagram() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 650" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <text x="400" y="20" textAnchor="middle" fill="#333" fontWeight="bold" fontSize="18">Gemma 3 (Decoder-Only Architecture)</text>

        {/* Phase 1 */}
        <g transform="translate(100, 50)">
          <rect x="-20" y="0" width="640" height="80" fill="#e8f5e9" stroke="#2e7d32" rx="4" strokeDasharray="4,4" />
          <text x="300" y="20" textAnchor="middle" fontSize="12" fill="#2e7d32" fontWeight="bold">Phase 1: Tokenization &amp; Embedding</text>

          <rect x="0" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="75" y="60" textAnchor="middle" fontSize="12" fill="#333">Tokenization</text>

          <rect x="225" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="300" y="60" textAnchor="middle" fontSize="12" fill="#333">Dense Embedding</text>

          <rect x="450" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="525" y="60" textAnchor="middle" fontSize="12" fill="#333">RoPE</text>

          <path d="M 150 55 L 220 55" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 375 55 L 445 55" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 525 70 L 525 125" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Phase 2: Transformer Block */}
        <g transform="translate(300, 180)">
          <rect x="-100" y="0" width="400" height="280" fill="#f3e5f5" stroke="#8e24aa" rx="4" strokeDasharray="4,4" />
          <text x="100" y="20" textAnchor="middle" fontSize="12" fill="#8e24aa" fontWeight="bold">Phase 2: Transformer Layer (x40)</text>

          <rect x="50" y="40" width="100" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="100" y="60" textAnchor="middle" fontSize="12" fill="#333">RMSNorm</text>

          <rect x="50" y="100" width="100" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="100" y="120" textAnchor="middle" fontSize="12" fill="#333">GQA Attention</text>

          <rect x="-60" y="100" width="80" height="30" fill="#fff9c4" stroke="#fbc02d" rx="4" />
          <text x="-20" y="120" textAnchor="middle" fontSize="12" fill="#333">KV Cache</text>

          <circle x="100" y="160" r="10" fill="#eaeaea" stroke="#333" />
          <text x="100" y="164" textAnchor="middle" fontSize="14" fill="#333">+</text>

          <rect x="50" y="190" width="100" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="100" y="210" textAnchor="middle" fontSize="12" fill="#333">GeGLU MLP</text>

          <circle x="100" y="250" r="10" fill="#eaeaea" stroke="#333" />
          <text x="100" y="254" textAnchor="middle" fontSize="14" fill="#333">+</text>

          {/* Connectors inside block */}
          <path d="M 100 70 L 100 95" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 100 130 L 100 145" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 100 170 L 100 185" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 100 220 L 100 235" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <path d="M 20 115 L 45 115" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="2,2" />

          {/* Residual Add Connectors */}
          <path d="M 100 -5 L 100 35" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 100 15 L 200 15 L 200 160 L 115 160" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 100 175 L 220 175 L 220 250 L 115 250" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <path d="M 100 260 L 100 315" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Phase 3 */}
        <g transform="translate(100, 500)">
          <rect x="-20" y="0" width="640" height="80" fill="#e3f2fd" stroke="#1565c0" rx="4" strokeDasharray="4,4" />
          <text x="300" y="20" textAnchor="middle" fontSize="12" fill="#1565c0" fontWeight="bold">Phase 3: Generation</text>

          <rect x="0" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="75" y="60" textAnchor="middle" fontSize="12" fill="#333">Final RMSNorm</text>

          <rect x="225" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="300" y="60" textAnchor="middle" fontSize="12" fill="#333">LM Head (Vocab)</text>

          <rect x="450" y="40" width="150" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="525" y="60" textAnchor="middle" fontSize="12" fill="#333">Softmax &amp; Sample</text>

          <path d="M 150 55 L 220 55" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 375 55 L 445 55" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Loop back to Phase 1 (Autoregressive) */}
          <path d="M 525 40 L 525 -5 L 30 15 L 30 -380 L 80 -380" fill="none" stroke="#ef6c00" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow)" />
          <text x="150" y="-120" textAnchor="middle" fontSize="12" fill="#ef6c00" fontWeight="bold">Phase 4: Autoregressive Loop (Next Token)</text>
        </g>
      </svg>
    </div>
  );
}
