# hwkim-dev Personal Site

This is the personal website and research notebook of Hyunwoo Kim.
Built with Docusaurus but heavily customized to look like a quiet, text-first engineer notebook.

## Design Direction
- **Theme**: "Notebook Memo"
- **Visuals**: Warm paper background (`#FBF8F3`), crisp ink, 1px rules, square corners.
- **Typography**: IBM Plex Mono (primary monospace), Source Serif 4 (prose), Inter/Pretendard (sans fallback).
- **Goal**: A quiet, text-first personal site that feels like an engineer's notebook rather than a startup landing page or a SaaS product. 
- **Structure**: Narrow readable columns, text-heavy project descriptions focusing on *why* the project matters, bracketed asides, and small monospace metadata labels.

## Why keep Docusaurus?
Docusaurus was retained over a pure static HTML site (like v7 prototype) or Next.js to maintain seamless compatibility with the existing MDX blog pipeline (`blog/`), multilingual support (`i18n/ko`), and Markdown-based page routing without reinventing content management. Docusaurus's default UI has been neutralized by overriding CSS variables (`--ifm-`) and providing custom React pages.

## Visualization & Components
To prevent the site from becoming a static wall of text, several interactive visualization libraries are integrated. They are wrapped as Docusaurus-compatible MDX components using `@docusaurus/BrowserOnly` to be SSR-safe.

### 1. Installed Libraries
- **ECharts** (`echarts`, `echarts-for-react`) - For performance charts and metric comparisons.
- **Markmap** (`markmap-view`, `markmap-lib`) - For generating mindmaps directly from Markdown text.
- **Cytoscape.js** (`cytoscape`, `react-cytoscapejs`) - For complex node-edge relationship graphs (used in the homepage System Map).

### 2. When to use what?
- **Mermaid**: Use only for quick, simple sequence diagrams or flowcharts during drafting. It is kept for backward compatibility but is no longer the primary visual tool.
- **Markmap**: Use for summarizing paper structures, deep-dive concepts (e.g., Transformer architecture, KV-cache breakdown), or hierarchical knowledge.
- **ECharts**: Use for latency comparisons, memory bandwidth stacked bars, roofline analysis, and token/s benchmarks.
- **Cytoscape / D3**: Use sparingly for "killer" visualizations like the homepage technology stack network.

### 3. Usage Examples in MDX

You can import and use these components in any `.md` or `.mdx` file.

#### ECharts Example
```mdx
import EChartsBlock from '@site/src/components/visual/EChartsBlock';

<EChartsBlock type="latency" />
```

#### Markmap Example
```mdx
import MarkmapBlock from '@site/src/components/visual/MarkmapBlock';

<MarkmapBlock markdown={`
# Transformer Inference
## Prefill
## Decode
### KV Cache
### GEMV
## Bottleneck
### Memory bandwidth
`} />
```

## Development
```bash
# Start local server
npm run start

# Build production bundle
npm run build
```