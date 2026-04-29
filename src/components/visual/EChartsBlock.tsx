import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function EChartsBlock({ option, type, height = '300px' }) {
  const getOption = () => {
    if (option) return option;
    if (type === 'latency') {
      return {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value', name: 'Latency (ms)', nameLocation: 'middle', nameGap: 30, splitLine: { lineStyle: { color: 'var(--hk-wire-faint)' } } },
        yAxis: { type: 'category', data: ['pccx (FPGA)', 'llm-bottleneck-lab (CPU)', 'GPU Baseline'], axisLine: { lineStyle: { color: 'var(--hk-wire-ink)' } } },
        series: [
          {
            name: 'Prefill',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#2F4F9E' },
            data: [12, 120, 8]
          },
          {
            name: 'Decode',
            type: 'bar',
            stack: 'total',
            itemStyle: { color: '#8F8A80' },
            data: [45, 800, 20]
          }
        ]
      };
    }
    return {};
  };

  return (
    <div className="hk-frame" style={{ margin: 'var(--hk-s-6) 0' }}>
      <div className="hk-frame__head"><span className="t">visualization</span><span className="x">CHART</span></div>
      <div className="hk-frame__body" style={{ padding: 'var(--hk-s-5)' }}>
        <BrowserOnly fallback={<div>Loading chart...</div>}>
          {() => {
            const ReactECharts = require('echarts-for-react').default;
            return <ReactECharts option={getOption()} style={{ height, width: '100%' }} opts={{ renderer: 'svg' }} />;
          }}
        </BrowserOnly>
      </div>
    </div>
  );
}