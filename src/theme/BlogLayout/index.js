import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BlogCategoriesSidebar from '@site/src/components/BlogCategoriesSidebar';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasRecentPosts = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg blog-layout-root">
        <div className="row">
          <aside className="col col--2 blog-categories-col">
            <BlogCategoriesSidebar />
          </aside>
          <main
            className={clsx('col', {
              'col--7': hasRecentPosts,
              'col--10': !hasRecentPosts,
            })}
            itemScope
            itemType="https://schema.org/Blog">
            {children}
          </main>
          {hasRecentPosts && <BlogSidebar sidebar={sidebar} />}
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
