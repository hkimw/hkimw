import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function EChartsBlock({ option, height = '400px' }) {
  return (
    <div style={{ margin: '1em 0' }}>
      <ReactECharts option={option} style={{ height, width: '100%' }} />
    </div>
  );
}
