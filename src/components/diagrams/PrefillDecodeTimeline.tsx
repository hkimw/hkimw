import React from 'react';

export default function PrefillDecodeTimeline() {
  return (
    <div style={{ padding: '1.5rem', background: '#FBF8F3', borderRadius: '4px', border: '1px solid #e0e0e0', margin: '1rem 0' }}>
      <svg viewBox="0 0 800 400" width="100%" height="100%" style={{ fontFamily: 'var(--ifm-font-family-monospace)' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <text x="400" y="20" textAnchor="middle" fill="#333" fontWeight="bold" fontSize="16">LLM Inference: Prefill vs Decode Phase</text>

        {/* Prefill Phase */}
        <g transform="translate(50, 60)">
          <rect x="0" y="0" width="300" height="280" fill="#e8f5e9" stroke="#2e7d32" rx="4" strokeDasharray="4,4" />
          <text x="150" y="25" textAnchor="middle" fontSize="14" fill="#2e7d32" fontWeight="bold">1. Prefill Phase</text>
          <text x="150" y="45" textAnchor="middle" fontSize="12" fill="#666">"Prompt Processing"</text>

          <rect x="50" y="80" width="200" height="40" fill="#fff" stroke="#333" rx="4" />
          <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#333">Process all prompt tokens at once</text>

          <rect x="50" y="150" width="200" height="40" fill="#fff9c4" stroke="#fbc02d" rx="4" />
          <text x="150" y="175" textAnchor="middle" fontSize="12" fill="#333">Compute Bound (GEMM)</text>

          <rect x="50" y="220" width="200" height="40" fill="#e3f2fd" stroke="#1565c0" rx="4" />
          <text x="150" y="245" textAnchor="middle" fontSize="12" fill="#333">Fill KV Cache with Prompt</text>

          <path d="M 150 120 L 150 145" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 150 190 L 150 215" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Decode Phase */}
        <g transform="translate(450, 60)">
          <rect x="0" y="0" width="300" height="280" fill="#f3e5f5" stroke="#8e24aa" rx="4" strokeDasharray="4,4" />
          <text x="150" y="25" textAnchor="middle" fontSize="14" fill="#8e24aa" fontWeight="bold">2. Decode Phase</text>
          <text x="150" y="45" textAnchor="middle" fontSize="12" fill="#666">"Token Generation"</text>

          <rect x="50" y="80" width="200" height="40" fill="#fff" stroke="#333" rx="4" />
          <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#333">Generate one token at a time</text>

          <rect x="50" y="150" width="200" height="40" fill="#ffcdd2" stroke="#d32f2f" rx="4" />
          <text x="150" y="175" textAnchor="middle" fontSize="12" fill="#333">Memory Bound (GEMV)</text>

          <rect x="50" y="220" width="200" height="40" fill="#e3f2fd" stroke="#1565c0" rx="4" />
          <text x="150" y="245" textAnchor="middle" fontSize="12" fill="#333">Read/Update KV Cache</text>

          <path d="M 150 120 L 150 145" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 150 190 L 150 215" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Autoregressive Loop */}
          <path d="M 250 100 L 280 100 L 280 280 L 150 280 L 150 265" fill="none" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrow)" />
          <path d="M 50 240 L 20 240 L 20 100 L 45 100" fill="none" stroke="#333" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrow)" />
        </g>

        {/* Transition Arrow */}
        <path d="M 350 200 L 440 200" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="395" y="190" textAnchor="middle" fontSize="12" fill="#333">1st Token</text>

      </svg>
    </div>
  );
}
