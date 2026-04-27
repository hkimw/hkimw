import React from 'react';

export default function Gpt1PipelineDiagram() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 450" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <text x="400" y="20" textAnchor="middle" fill="#333" fontWeight="bold" fontSize="18">GPT-1: 2-Stage Training Pipeline</text>

        {/* Stage 1: Unsupervised Pre-training */}
        <g transform="translate(100, 50)">
          <rect x="0" y="0" width="250" height="350" fill="#e3f2fd" stroke="#1565c0" rx="4" strokeDasharray="4,4" />
          <text x="125" y="25" textAnchor="middle" fontSize="14" fill="#1565c0" fontWeight="bold">Stage 1: Pre-training</text>
          <text x="125" y="45" textAnchor="middle" fontSize="12" fill="#666">Unsupervised</text>

          <rect x="25" y="70" width="200" height="40" fill="#fff" stroke="#333" rx="4" />
          <text x="125" y="85" textAnchor="middle" fontSize="12" fill="#333">Unlabeled Text Corpus</text>
          <text x="125" y="100" textAnchor="middle" fontSize="10" fill="#666">(BooksCorpus)</text>

          <rect x="25" y="140" width="200" height="50" fill="#fff9c4" stroke="#fbc02d" rx="4" />
          <text x="125" y="160" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">12-Layer Transformer</text>
          <text x="125" y="175" textAnchor="middle" fontSize="12" fill="#333">Decoder</text>

          <rect x="25" y="220" width="200" height="40" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="125" y="235" textAnchor="middle" fontSize="12" fill="#333">Objective (L1)</text>
          <text x="125" y="250" textAnchor="middle" fontSize="10" fill="#666">Maximize Log-Likelihood</text>

          <rect x="25" y="290" width="200" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="125" y="310" textAnchor="middle" fontSize="12" fill="#333">Next Token Prediction</text>

          <path d="M 125 110 L 125 135" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 190 L 125 215" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 260 L 125 285" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Transfer Path */}
        <path d="M 350 200 L 440 200" stroke="#ef6c00" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow)" />
        <text x="395" y="190" textAnchor="middle" fontSize="12" fill="#ef6c00" fontWeight="bold">Transfer Weights</text>

        {/* Stage 2: Supervised Fine-tuning */}
        <g transform="translate(450, 50)">
          <rect x="0" y="0" width="250" height="350" fill="#fce4ec" stroke="#c2185b" rx="4" strokeDasharray="4,4" />
          <text x="125" y="25" textAnchor="middle" fontSize="14" fill="#c2185b" fontWeight="bold">Stage 2: Fine-tuning</text>
          <text x="125" y="45" textAnchor="middle" fontSize="12" fill="#666">Supervised</text>

          <rect x="25" y="70" width="200" height="40" fill="#fff" stroke="#333" rx="4" />
          <text x="125" y="85" textAnchor="middle" fontSize="12" fill="#333">Labeled Task Data</text>
          <text x="125" y="100" textAnchor="middle" fontSize="10" fill="#666">(Input x, Label y)</text>

          <rect x="25" y="140" width="200" height="40" fill="#fff9c4" stroke="#fbc02d" rx="4" />
          <text x="125" y="165" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">Pre-trained Transformer</text>

          <rect x="25" y="210" width="200" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="125" y="230" textAnchor="middle" fontSize="12" fill="#333">Added Linear Layer (Wy)</text>

          <rect x="25" y="260" width="200" height="40" fill="#e8f5e9" stroke="#2e7d32" rx="4" />
          <text x="125" y="275" textAnchor="middle" fontSize="12" fill="#333">Objective (L3)</text>
          <text x="125" y="290" textAnchor="middle" fontSize="10" fill="#666">L2 + λ * L1</text>

          <rect x="25" y="320" width="200" height="30" fill="#fff" stroke="#333" rx="4" />
          <text x="125" y="340" textAnchor="middle" fontSize="12" fill="#333">Target Label Prediction</text>

          <path d="M 125 110 L 125 135" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 180 L 125 205" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 240 L 125 255" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 125 300 L 125 315" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

      </svg>
    </div>
  );
}
