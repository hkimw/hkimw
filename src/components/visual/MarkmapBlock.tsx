import React, { useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function MarkmapInner({ markdown }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (svgRef.current) {
      const { Transformer } = require('markmap-lib');
      const { Markmap } = require('markmap-view');
      const transformer = new Transformer();
      
      svgRef.current.innerHTML = '';
      const { root } = transformer.transform(markdown);
      Markmap.create(svgRef.current, {
        autoFit: true,
        color: () => 'var(--hk-link)',
        nodeMinHeight: 16,
        paddingX: 16,
      }, root);
    }
  }, [markdown]);

  return <svg ref={svgRef} style={{ width: '100%', height: '300px' }} />;
}

export default function MarkmapBlock({ markdown }) {
  return (
    <div className="hk-frame" style={{ margin: 'var(--hk-s-6) 0' }}>
      <div className="hk-frame__head"><span className="t">concept map</span><span className="x">MAP</span></div>
      <div className="hk-frame__body" style={{ padding: 'var(--hk-s-5)', overflowX: 'auto' }}>
        <BrowserOnly fallback={<div>Loading map...</div>}>
          {() => <MarkmapInner markdown={markdown} />}
        </BrowserOnly>
      </div>
    </div>
  );
}