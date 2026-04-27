import React from 'react';

export const TransformerEncoderDecoder = () => (
  <svg width="100%" height="450" viewBox="0 0 800 450" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
    <g transform="translate(100, 50)">
      {/* Encoder block */}
      <rect width="250" height="350" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" strokeDasharray="5,5" />
      <text x="125" y="30" textAnchor="middle" fontWeight="bold" fill="#0d47a1">Encoder (N=6)</text>

      <rect x="25" y="50" width="200" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" />
      <text x="125" y="75" textAnchor="middle" fontSize="12">Multi-Head Self-Attention</text>

      <rect x="25" y="120" width="200" height="30" rx="5" fill="#ffe0b2" stroke="#f57c00" />
      <text x="125" y="140" textAnchor="middle" fontSize="12">Add & Norm</text>

      <rect x="25" y="180" width="200" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" />
      <text x="125" y="205" textAnchor="middle" fontSize="12">Feed Forward</text>

      <rect x="25" y="250" width="200" height="30" rx="5" fill="#ffe0b2" stroke="#f57c00" />
      <text x="125" y="270" textAnchor="middle" fontSize="12">Add & Norm</text>

      <path d="M 125 90 L 125 120 M 125 150 L 125 180 M 125 220 L 125 250" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />

      {/* Residual Connections */}
      <path d="M 15 40 L 15 135 L 25 135" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrowBlackAttention)" />
      <path d="M 15 170 L 15 265 L 25 265" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrowBlackAttention)" />

      {/* Input */}
      <rect x="25" y="320" width="200" height="40" rx="20" fill="#c8e6c9" stroke="#388e3c" />
      <text x="125" y="345" textAnchor="middle" fontSize="12">Input Embedding + PE</text>
      <path d="M 125 320 L 125 280" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />
    </g>

    <g transform="translate(450, 50)">
      {/* Decoder block */}
      <rect width="250" height="350" rx="10" fill="#fce4ec" stroke="#c2185b" strokeWidth="2" strokeDasharray="5,5" />
      <text x="125" y="30" textAnchor="middle" fontWeight="bold" fill="#880e4f">Decoder (N=6)</text>

      <rect x="25" y="50" width="200" height="40" rx="5" fill="#f8bbd0" stroke="#c2185b" />
      <text x="125" y="75" textAnchor="middle" fontSize="12">Masked Multi-Head Attention</text>

      <rect x="25" y="110" width="200" height="30" rx="5" fill="#ffe0b2" stroke="#f57c00" />
      <text x="125" y="130" textAnchor="middle" fontSize="12">Add & Norm</text>

      <rect x="25" y="160" width="200" height="40" rx="5" fill="#f8bbd0" stroke="#c2185b" />
      <text x="125" y="185" textAnchor="middle" fontSize="12">Encoder-Decoder Attention</text>

      <rect x="25" y="220" width="200" height="30" rx="5" fill="#ffe0b2" stroke="#f57c00" />
      <text x="125" y="240" textAnchor="middle" fontSize="12">Add & Norm</text>

      <rect x="25" y="270" width="200" height="40" rx="5" fill="#f8bbd0" stroke="#c2185b" />
      <text x="125" y="295" textAnchor="middle" fontSize="12">Feed Forward</text>

      <path d="M 125 90 L 125 110 M 125 140 L 125 160 M 125 200 L 125 220 M 125 250 L 125 270" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />
    </g>

    <path d="M 350 210 L 475 210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />
    <text x="412" y="200" textAnchor="middle" fontSize="12" fill="#555">K, V</text>

    <defs>
      <marker id="arrowBlackAttention" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#333" />
      </marker>
    </defs>
  </svg>
);

export const QKVAttentionMath = () => (
    <svg width="100%" height="250" viewBox="0 0 800 250" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
      <g transform="translate(100, 50)">
          <rect x="0" y="0" width="80" height="40" rx="20" fill="#f3e5f5" stroke="#8e24aa" />
          <text x="40" y="25" textAnchor="middle" fontSize="12">Query (Q)</text>

          <rect x="0" y="80" width="80" height="40" rx="20" fill="#f3e5f5" stroke="#8e24aa" />
          <text x="40" y="105" textAnchor="middle" fontSize="12">Key (K)</text>

          <path d="M 80 20 L 140 50 M 80 100 L 140 70" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <polygon points="170,30 200,60 170,90 140,60" fill="#fff9c4" stroke="#fbc02d" />
          <text x="170" y="65" textAnchor="middle" fontSize="12">MatMul</text>

          <path d="M 200 60 L 250 60" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="250" y="40" width="80" height="40" rx="5" fill="#e0f7fa" stroke="#00838f" />
          <text x="290" y="65" textAnchor="middle" fontSize="12">Scale</text>

          <path d="M 330 60 L 380 60" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="380" y="40" width="80" height="40" rx="5" fill="#e0f7fa" stroke="#00838f" />
          <text x="420" y="65" textAnchor="middle" fontSize="12">Softmax</text>

          <path d="M 460 60 L 510 60" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <polygon points="540,30 570,60 540,90 510,60" fill="#fff9c4" stroke="#fbc02d" />
          <text x="540" y="65" textAnchor="middle" fontSize="12">MatMul</text>

          <rect x="460" y="120" width="80" height="40" rx="20" fill="#f3e5f5" stroke="#8e24aa" />
          <text x="500" y="145" textAnchor="middle" fontSize="12">Value (V)</text>

          <path d="M 500 120 L 530 80" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <path d="M 570 60 L 620 60" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackMath)" />

          <rect x="620" y="40" width="100" height="40" rx="20" fill="#ffcc80" stroke="#ef6c00" />
          <text x="670" y="65" textAnchor="middle" fontSize="12">Attention Out</text>
      </g>
    </svg>
);

export const MultiHeadAttention = () => (
    <svg width="100%" height="300" viewBox="0 0 800 300" style={{ fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa', margin: '1em 0' }}>
      <g transform="translate(50, 20)">
        <rect x="300" y="0" width="120" height="40" rx="20" fill="#e3f2fd" stroke="#1565c0" />
        <text x="360" y="25" textAnchor="middle" fontSize="12">Input Q, K, V</text>

        <path d="M 360 40 L 360 60" stroke="#333" strokeWidth="2" />
        <path d="M 160 60 L 560 60" stroke="#333" strokeWidth="2" />
        <path d="M 160 60 L 160 80 M 360 60 L 360 80 M 560 60 L 560 80" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />

        {/* Heads */}
        <rect x="100" y="80" width="120" height="60" rx="5" fill="#fce4ec" stroke="#c2185b" />
        <text x="160" y="105" textAnchor="middle" fontSize="12">Linear Proj</text>
        <text x="160" y="125" textAnchor="middle" fontSize="12" fontWeight="bold">Head 1</text>

        <rect x="300" y="80" width="120" height="60" rx="5" fill="#fce4ec" stroke="#c2185b" />
        <text x="360" y="105" textAnchor="middle" fontSize="12">Linear Proj</text>
        <text x="360" y="125" textAnchor="middle" fontSize="12" fontWeight="bold">Head 2</text>

        <text x="460" y="115" textAnchor="middle" fontSize="24" fill="#666">...</text>

        <rect x="500" y="80" width="120" height="60" rx="5" fill="#fce4ec" stroke="#c2185b" />
        <text x="560" y="105" textAnchor="middle" fontSize="12">Linear Proj</text>
        <text x="560" y="125" textAnchor="middle" fontSize="12" fontWeight="bold">Head h</text>

        {/* Scaled Dot-Product */}
        <rect x="100" y="160" width="120" height="30" rx="5" fill="#bbdefb" stroke="#1565c0" />
        <text x="160" y="180" textAnchor="middle" fontSize="10">Scaled Dot-Product</text>

        <rect x="300" y="160" width="120" height="30" rx="5" fill="#bbdefb" stroke="#1565c0" />
        <text x="360" y="180" textAnchor="middle" fontSize="10">Scaled Dot-Product</text>

        <rect x="500" y="160" width="120" height="30" rx="5" fill="#bbdefb" stroke="#1565c0" />
        <text x="560" y="180" textAnchor="middle" fontSize="10">Scaled Dot-Product</text>

        <path d="M 160 140 L 160 160 M 360 140 L 360 160 M 560 140 L 560 160" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />

        {/* Concat */}
        <path d="M 160 190 L 160 210 M 360 190 L 360 210 M 560 190 L 560 210" stroke="#333" strokeWidth="2" />
        <path d="M 160 210 L 560 210" stroke="#333" strokeWidth="2" />
        <path d="M 360 210 L 360 230" stroke="#333" strokeWidth="2" markerEnd="url(#arrowBlackAttention)" />

        <rect x="260" y="230" width="200" height="30" rx="15" fill="#fff9c4" stroke="#fbc02d" />
        <text x="360" y="250" textAnchor="middle" fontSize="12">Concat & Final Linear</text>
      </g>
    </svg>
);
