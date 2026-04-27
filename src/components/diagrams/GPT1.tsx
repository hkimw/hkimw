import React from 'react';

export const GPT1Stages = () => (
  <svg width="100%" height="300" viewBox="0 0 800 300" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
    {/* Stage 1 */}
    <g transform="translate(50, 50)">
      <rect width="300" height="200" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" />
      <text x="150" y="30" textAnchor="middle" fontWeight="bold" fill="#0d47a1">Stage 1: Unsupervised Pre-training</text>

      <rect x="50" y="50" width="200" height="40" rx="20" fill="#fff" stroke="#1565c0" strokeWidth="2" />
      <text x="150" y="75" textAnchor="middle" fontSize="14">Unlabeled Text Corpus</text>

      <path d="M 150 90 L 150 110" stroke="#1565c0" strokeWidth="2" markerEnd="url(#arrowBlue)" />

      <rect x="50" y="110" width="200" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
      <text x="150" y="135" textAnchor="middle" fontSize="14">12-Layer Transformer Decoder</text>

      <path d="M 150 150 L 150 170" stroke="#1565c0" strokeWidth="2" markerEnd="url(#arrowBlue)" />

      <polygon points="150,170 230,185 150,200 70,185" fill="#fff" stroke="#1565c0" strokeWidth="2" />
      <text x="150" y="189" textAnchor="middle" fontSize="12">Maximize Log-Likelihood</text>
    </g>

    {/* Transition Arrow */}
    <g transform="translate(360, 150)">
      <path d="M 0 0 L 70 0" stroke="#333" strokeWidth="4" strokeDasharray="5,5" markerEnd="url(#arrowBlack)" />
      <text x="35" y="-10" textAnchor="middle" fontSize="12" fill="#555">Transfer Weights</text>
    </g>

    {/* Stage 2 */}
    <g transform="translate(450, 50)">
      <rect width="300" height="200" rx="10" fill="#fce4ec" stroke="#c2185b" strokeWidth="2" />
      <text x="150" y="30" textAnchor="middle" fontWeight="bold" fill="#880e4f">Stage 2: Supervised Fine-tuning</text>

      <rect x="50" y="50" width="200" height="40" rx="20" fill="#fff" stroke="#c2185b" strokeWidth="2" />
      <text x="150" y="75" textAnchor="middle" fontSize="14">Labeled Task Data (x, y)</text>

      <path d="M 150 90 L 150 110" stroke="#c2185b" strokeWidth="2" markerEnd="url(#arrowRed)" />

      <rect x="50" y="110" width="200" height="40" rx="5" fill="#f8bbd0" stroke="#c2185b" strokeWidth="2" />
      <text x="150" y="135" textAnchor="middle" fontSize="14">Pre-trained Transformer + Linear</text>

      <path d="M 150 150 L 150 170" stroke="#c2185b" strokeWidth="2" markerEnd="url(#arrowRed)" />

      <polygon points="150,170 230,185 150,200 70,185" fill="#fff" stroke="#c2185b" strokeWidth="2" />
      <text x="150" y="189" textAnchor="middle" fontSize="12">Objective: L2 + λ * L1</text>
    </g>

    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#1565c0" />
      </marker>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#c2185b" />
      </marker>
      <marker id="arrowBlack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#333" />
      </marker>
    </defs>
  </svg>
);

export const GPT1MultipleChoice = () => (
  <svg width="100%" height="250" viewBox="0 0 800 250" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
    <g transform="translate(150, 20)">
      {/* Option 1 Pipeline */}
      <rect x="0" y="0" width="80" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
      <text x="40" y="20" textAnchor="middle" fontSize="12">Start</text>

      <rect x="100" y="0" width="80" height="30" rx="5" fill="#e1bee7" stroke="#8e24aa" />
      <text x="140" y="20" textAnchor="middle" fontSize="12">Premise</text>

      <rect x="200" y="0" width="60" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
      <text x="230" y="20" textAnchor="middle" fontSize="12">Delim</text>

      <rect x="280" y="0" width="80" height="30" rx="5" fill="#e1bee7" stroke="#8e24aa" />
      <text x="320" y="20" textAnchor="middle" fontSize="12">Option 1</text>

      <rect x="380" y="0" width="80" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
      <text x="420" y="20" textAnchor="middle" fontSize="12">Extract</text>

      <rect x="480" y="0" width="100" height="30" rx="5" fill="#bbdefb" stroke="#1976d2" />
      <text x="530" y="20" textAnchor="middle" fontSize="12">Transformer</text>

      <path d="M 80 15 L 100 15 M 180 15 L 200 15 M 260 15 L 280 15 M 360 15 L 380 15 M 460 15 L 480 15" stroke="#333" strokeWidth="2" />
      <path d="M 580 15 L 600 50" stroke="#333" strokeWidth="2" />

      {/* Option 2 Pipeline */}
      <g transform="translate(0, 60)">
        <rect x="0" y="0" width="80" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
        <text x="40" y="20" textAnchor="middle" fontSize="12">Start</text>

        <rect x="100" y="0" width="80" height="30" rx="5" fill="#e1bee7" stroke="#8e24aa" />
        <text x="140" y="20" textAnchor="middle" fontSize="12">Premise</text>

        <rect x="200" y="0" width="60" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
        <text x="230" y="20" textAnchor="middle" fontSize="12">Delim</text>

        <rect x="280" y="0" width="80" height="30" rx="5" fill="#e1bee7" stroke="#8e24aa" />
        <text x="320" y="20" textAnchor="middle" fontSize="12">Option 2</text>

        <rect x="380" y="0" width="80" height="30" rx="15" fill="#ffcc80" stroke="#e65100" />
        <text x="420" y="20" textAnchor="middle" fontSize="12">Extract</text>

        <rect x="480" y="0" width="100" height="30" rx="5" fill="#bbdefb" stroke="#1976d2" />
        <text x="530" y="20" textAnchor="middle" fontSize="12">Transformer</text>

        <path d="M 80 15 L 100 15 M 180 15 L 200 15 M 260 15 L 280 15 M 360 15 L 380 15 M 460 15 L 480 15" stroke="#333" strokeWidth="2" />
        <path d="M 580 15 L 600 -10" stroke="#333" strokeWidth="2" />
      </g>
    </g>

    <g transform="translate(730, 45)">
        <polygon points="20,0 40,25 20,50 0,25" fill="#bbdefb" stroke="#1976d2" />
        <text x="20" y="30" textAnchor="middle" fontSize="12">Softmax</text>

        <path d="M 40 25 L 60 25" stroke="#333" strokeWidth="2" />

        <rect x="60" y="10" width="100" height="30" rx="15" fill="#c8e6c9" stroke="#388e3c" />
        <text x="110" y="30" textAnchor="middle" fontSize="12">Probabilities</text>
    </g>
    <text x="400" y="160" textAnchor="middle" fontSize="14" fill="#555" fontStyle="italic">... Same process for all N options ...</text>
  </svg>
);

export const GPT1LossMath = () => (
    <svg width="100%" height="300" viewBox="0 0 800 300" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
      <g transform="translate(100, 50)">
          {/* Prediction Path */}
          <rect x="0" y="0" width="160" height="40" rx="20" fill="#f5f5f5" stroke="#9e9e9e" />
          <text x="80" y="25" textAnchor="middle" fontSize="12">Logits (e.g., 10, 5, 1)</text>

          <path d="M 160 20 L 220 20" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <polygon points="260,0 300,20 260,40 220,20" fill="#ffe0b2" stroke="#f57c00" />
          <text x="260" y="25" textAnchor="middle" fontSize="12">Softmax</text>

          <path d="M 300 20 L 360 20" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="360" y="0" width="180" height="40" rx="20" fill="#f5f5f5" stroke="#9e9e9e" />
          <text x="450" y="25" textAnchor="middle" fontSize="12">Predicted Probabilities (q)</text>

          <path d="M 450 40 L 450 100" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          {/* Target Path */}
          <rect x="0" y="150" width="160" height="40" rx="20" fill="#f5f5f5" stroke="#9e9e9e" />
          <text x="80" y="175" textAnchor="middle" fontSize="12">True Label (c=1)</text>

          <path d="M 160 170 L 220 170" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <polygon points="260,150 300,170 260,190 220,170" fill="#ffe0b2" stroke="#f57c00" />
          <text x="260" y="175" textAnchor="middle" fontSize="12">One-Hot</text>

          <path d="M 300 170 L 360 170" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="360" y="150" width="180" height="40" rx="20" fill="#f5f5f5" stroke="#9e9e9e" />
          <text x="450" y="175" textAnchor="middle" fontSize="12">Target Probabilities (p)</text>

          <path d="M 450 150 L 450 140" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          {/* Loss */}
          <polygon points="450,100 500,120 450,140 400,120" fill="#ffcdd2" stroke="#d32f2f" />
          <text x="450" y="125" textAnchor="middle" fontSize="12">Cross-Entropy</text>

          <path d="M 500 120 L 560 120" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="560" y="100" width="120" height="40" rx="20" fill="#f5f5f5" stroke="#9e9e9e" />
          <text x="620" y="125" textAnchor="middle" fontSize="12">Backpropagation</text>
      </g>
      <defs>
        <marker id="arrowBlackMath" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#333" />
        </marker>
      </defs>
    </svg>
);
