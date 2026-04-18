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
        <div className="row blog-layout-row">
          <aside className="col col--3 blog-categories-col">
            <BlogCategoriesSidebar />
          </aside>
          <main
            className={clsx('col blog-posts-main', {
              'col--6': hasRecentPosts,
              'col--9': !hasRecentPosts,
            })}
            itemScope
            itemType="https://schema.org/Blog">
            {children}
          </main>
          {hasRecentPosts && (
            <div className="col col--3 blog-right-sidebar-col">
              <BlogSidebar sidebar={sidebar} />
            </div>
          )}
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
