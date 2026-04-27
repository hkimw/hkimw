import React, { useRef, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const transformer = new Transformer();

export default function MarkmapBlock({ content, height = '300px' }) {
  const svgRef = useRef();

  useEffect(() => {
    if (svgRef.current) {
      const { root } = transformer.transform(content);
      // Clear previous rendering
      svgRef.current.innerHTML = '';
      Markmap.create(svgRef.current, null, root);
    }
  }, [content]);

  return (
    <div style={{ width: '100%', height, overflow: 'auto', border: '1px solid #ddd', borderRadius: '8px', margin: '1em 0' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
