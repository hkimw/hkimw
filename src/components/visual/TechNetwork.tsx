import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';

cytoscape.use(dagre);

const elements = [
  { data: { id: 'ai', label: 'AI Systems' } },
  { data: { id: 'fpga', label: 'FPGA' } },
  { data: { id: 'npu', label: 'NPU' } },
  { data: { id: 'llm', label: 'LLM Inference' } },
  { data: { id: 'cuda', label: 'CUDA' } },
  { data: { id: 'pytorch', label: 'PyTorch' } },
  { data: { id: 'sv', label: 'SystemVerilog' } },
  { data: { id: 'cpp', label: 'C++' } },
  { data: { id: 'python', label: 'Python' } },
  { data: { id: 'rust', label: 'Rust' } },
  { data: { id: 'mem', label: 'Memory-bound Opt' } },
  { data: { source: 'ai', target: 'llm' } },
  { data: { source: 'ai', target: 'pytorch' } },
  { data: { source: 'llm', target: 'mem' } },
  { data: { source: 'fpga', target: 'sv' } },
  { data: { source: 'fpga', target: 'npu' } },
  { data: { source: 'npu', target: 'llm' } },
  { data: { source: 'cuda', target: 'cpp' } },
  { data: { source: 'pytorch', target: 'python' } },
  { data: { source: 'cpp', target: 'llm' } },
  { data: { source: 'rust', target: 'llm' } },
];

const stylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': '#FBF8F3',
      'border-width': 1,
      'border-color': '#1E1C19',
      'label': 'data(label)',
      'font-family': '"IBM Plex Mono", "JetBrains Mono", monospace',
      'font-size': '11px',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#1E1C19',
      'shape': 'round-rectangle',
      'width': 'label',
      'height': 'label',
      'padding': '8px'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': '#C9C4B8',
      'target-arrow-color': '#C9C4B8',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
];

export default function TechNetwork() {
  return (
    <div className="hk-frame hk-system-map" style={{ margin: 'var(--hk-s-6) 0' }}>
      <div className="hk-frame__head"><span className="t">tech stack</span><span className="x">NETWORK</span></div>
      <div className="hk-frame__body" style={{ padding: '0', height: '600px' }}>
        <BrowserOnly fallback={<div style={{padding: '20px'}}>Loading network...</div>}>
          {() => (
            <CytoscapeComponent
              elements={elements}
              stylesheet={stylesheet}
              style={{ width: '100%', height: '100%' }}
              layout={{ name: 'dagre', rankDir: 'LR', padding: 40, nodeSep: 50, rankSep: 100, animate: false }}
              userZoomingEnabled={true}
              userPanningEnabled={true}
              minZoom={0.5}
              maxZoom={2}
            />
          )}
        </BrowserOnly>
      </div>
    </div>
  );
}