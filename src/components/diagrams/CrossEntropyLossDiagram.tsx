import React from 'react';

export default function CrossEntropyLossDiagram() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 250" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        {/* Top Path: Model Prediction */}
        <g transform="translate(50, 40)">
          <rect x="0" y="0" width="150" height="40" fill="#f5f5f5" stroke="#9e9e9e" rx="4" />
          <text x="75" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Model Logits</text>
          <text x="75" y="30" textAnchor="middle" fontSize="10" fill="#666">[10, 5, 1, -2]</text>

          <path d="M 160 20 L 190 20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="200" y="0" width="100" height="40" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="250" y="25" textAnchor="middle" fontSize="12" fill="#333">Softmax σ(z)</text>

          <path d="M 310 20 L 340 20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="350" y="0" width="150" height="40" fill="#e3f2fd" stroke="#1565c0" rx="4" />
          <text x="425" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Predicted Prob (q)</text>
          <text x="425" y="30" textAnchor="middle" fontSize="10" fill="#666">[0.7, 0.2, 0.08, 0.02]</text>

          <path d="M 510 20 L 580 60" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Bottom Path: True Label */}
        <g transform="translate(50, 140)">
          <rect x="0" y="0" width="150" height="40" fill="#f5f5f5" stroke="#9e9e9e" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">True Label (c=1)</text>

          <path d="M 160 20 L 190 20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="200" y="0" width="100" height="40" fill="#ffe0b2" stroke="#f57c00" rx="4" />
          <text x="250" y="25" textAnchor="middle" fontSize="12" fill="#333">One-hot Enc.</text>

          <path d="M 310 20 L 340 20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="350" y="0" width="150" height="40" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="425" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Target Prob (p)</text>
          <text x="425" y="30" textAnchor="middle" fontSize="10" fill="#666">[1.0, 0.0, 0.0, 0.0]</text>

          <path d="M 510 20 L 580 -20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Loss Calculation */}
        <g transform="translate(640, 80)">
          <rect x="0" y="0" width="120" height="60" fill="#ffcdd2" stroke="#d32f2f" rx="4" />
          <text x="60" y="25" textAnchor="middle" fontSize="12" fill="#d32f2f" fontWeight="bold">Cross-Entropy</text>
          <text x="60" y="45" textAnchor="middle" fontSize="12" fill="#333">Loss H(p,q)</text>

          <path d="M 60 70 L 60 100" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="10" y="110" width="100" height="30" fill="#f5f5f5" stroke="#9e9e9e" rx="4" />
          <text x="60" y="130" textAnchor="middle" fontSize="10" fill="#333">Backpropagate</text>
        </g>
      </svg>
    </div>
  );
}
