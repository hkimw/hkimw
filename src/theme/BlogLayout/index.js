import React from 'react';
import Layout from '@theme/Layout';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;

  return (
    <Layout {...layoutProps}>
      <main id="main" className="hk-wrap" style={{paddingTop: '24px'}}>
        <div itemScope itemType="https://schema.org/Blog">
          {children}
        </div>
      </main>
    </Layout>
  );
}
