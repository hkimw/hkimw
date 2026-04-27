# hwkim-dev

Personal website and research notebook for Hyunwoo Kim.

This site collects project notes, paper notes, and small experiments around FPGA-based AI accelerators and LLM inference systems.

## Focus

- FPGA-based NPU experiments
- LLM inference bottlenecks
- memory movement, KV-cache, GEMM/GEMV
- low-bit / INT8 inference paths
- small runtime and profiling tools

## Main projects

- pccx: custom ISA, INT8 systolic-array datapath, runtime queues, and Python-facing driver experiments for edge FPGA inference.
- pccx-lab: visual profiler / pre-RTL simulator for checking execution behavior before going deep into RTL.
- llm-lite: lightweight software-side experiments for LLM inference, kernels, and KV-cache behavior.

## Site stack

- Docusaurus
- MDX blog posts
- Korean / English pages
- ECharts, Markmap, Cytoscape for selected visualizations
- Mermaid only for simple draft diagrams

## Design note

The site should feel closer to an engineer’s notebook than a product landing page.
Prefer readable text, simple diagrams, and honest project notes over flashy claims.

## Development

\`\`\`bash
npm install
npm run start
npm run build
\`\`\`
