import React from 'react';

export default function TransformerBlockDiagram() {
  return (
    <div style={{ padding: '1rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 600" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <g transform="translate(100, 50)">
          {/* Encoder */}
          <rect x="0" y="0" width="250" height="500" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" />
          <text x="125" y="-15" textAnchor="middle" fill="#333" fontWeight="bold">Encoder (N=6)</text>

          <rect x="50" y="450" width="150" height="30" fill="#eaeaea" stroke="#333" rx="4" />
          <text x="125" y="470" textAnchor="middle" fontSize="12" fill="#333">Input Embedding</text>

          <circle x="125" y="410" r="15" fill="#eaeaea" stroke="#333" />
          <text x="125" y="415" textAnchor="middle" fontSize="16" fill="#333">+</text>
          <text x="60" y="415" fontSize="12" fill="#333">Positional Encoding</text>

          <rect x="50" y="320" width="150" height="40" fill="#f0e6d2" stroke="#333" rx="4" />
          <text x="125" y="345" textAnchor="middle" fontSize="12" fill="#333">Multi-Head Attention</text>

          <rect x="50" y="250" width="150" height="30" fill="#e2ede2" stroke="#333" rx="4" />
          <text x="125" y="270" textAnchor="middle" fontSize="12" fill="#333">Add &amp; Norm</text>

          <rect x="50" y="160" width="150" height="40" fill="#e6f0f9" stroke="#333" rx="4" />
          <text x="125" y="185" textAnchor="middle" fontSize="12" fill="#333">Feed Forward</text>

          <rect x="50" y="90" width="150" height="30" fill="#e2ede2" stroke="#333" rx="4" />
          <text x="125" y="110" textAnchor="middle" fontSize="12" fill="#333">Add &amp; Norm</text>

          {/* Connections inside Encoder */}
          <path d="M 125 450 L 125 425" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 395 L 125 360" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <path d="M 125 320 L 125 280" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 250 L 125 200" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 160 L 125 120" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 90 L 125 30" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Residual connections */}
          <path d="M 125 380 L 25 380 L 25 265 L 50 265" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 225 L 25 225 L 25 105 L 50 105" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

        </g>

        <g transform="translate(450, 50)">
          {/* Decoder */}
          <rect x="0" y="0" width="250" height="500" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" />
          <text x="125" y="-15" textAnchor="middle" fill="#333" fontWeight="bold">Decoder (N=6)</text>

          <rect x="50" y="450" width="150" height="30" fill="#eaeaea" stroke="#333" rx="4" />
          <text x="125" y="470" textAnchor="middle" fontSize="12" fill="#333">Output Embedding</text>

          <circle x="125" y="410" r="15" fill="#eaeaea" stroke="#333" />
          <text x="125" y="415" textAnchor="middle" fontSize="16" fill="#333">+</text>
          <text x="145" y="415" fontSize="12" fill="#333">Positional Encoding</text>

          <rect x="50" y="340" width="150" height="40" fill="#f0e6d2" stroke="#333" rx="4" />
          <text x="125" y="357" textAnchor="middle" fontSize="12" fill="#333">Masked</text>
          <text x="125" y="372" textAnchor="middle" fontSize="12" fill="#333">Multi-Head Attention</text>

          <rect x="50" y="280" width="150" height="30" fill="#e2ede2" stroke="#333" rx="4" />
          <text x="125" y="300" textAnchor="middle" fontSize="12" fill="#333">Add &amp; Norm</text>

          <rect x="50" y="210" width="150" height="40" fill="#f0e6d2" stroke="#333" rx="4" />
          <text x="125" y="235" textAnchor="middle" fontSize="12" fill="#333">Multi-Head Attention</text>

          <rect x="50" y="150" width="150" height="30" fill="#e2ede2" stroke="#333" rx="4" />
          <text x="125" y="170" textAnchor="middle" fontSize="12" fill="#333">Add &amp; Norm</text>

          <rect x="50" y="90" width="150" height="40" fill="#e6f0f9" stroke="#333" rx="4" />
          <text x="125" y="115" textAnchor="middle" fontSize="12" fill="#333">Feed Forward</text>

          <rect x="50" y="30" width="150" height="30" fill="#e2ede2" stroke="#333" rx="4" />
          <text x="125" y="50" textAnchor="middle" fontSize="12" fill="#333">Add &amp; Norm</text>

          <rect x="50" y="-40" width="150" height="20" fill="#eaeaea" stroke="#333" rx="4" />
          <text x="125" y="-25" textAnchor="middle" fontSize="12" fill="#333">Linear</text>

          <rect x="50" y="-80" width="150" height="20" fill="#eaeaea" stroke="#333" rx="4" />
          <text x="125" y="-65" textAnchor="middle" fontSize="12" fill="#333">Softmax</text>

          <text x="125" y="-100" textAnchor="middle" fontSize="12" fill="#333">Output Probabilities</text>

          {/* Connections inside Decoder */}
          <path d="M 125 450 L 125 425" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 395 L 125 380" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <path d="M 125 340 L 125 310" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 280 L 125 250" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 210 L 125 180" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 150 L 125 130" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 90 L 125 60" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 30 L 125 -20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 -40 L 125 -60" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 -80 L 125 -95" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Residual connections Decoder */}
          <path d="M 125 390 L 25 390 L 25 295 L 50 295" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 265 L 25 265 L 25 165 L 50 165" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 140 L 25 140 L 25 45 L 50 45" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

        </g>

        {/* Cross connections */}
        <path d="M 225 140 L 400 140 L 400 230 L 500 230" fill="none" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="350" y="130" fontSize="12" fill="#333">K, V</text>
        <text x="510" y="260" fontSize="12" fill="#333">Q</text>

      </svg>
    </div>
  );
}
