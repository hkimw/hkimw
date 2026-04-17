import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const TITLE = {en: 'Categories', ko: '카테고리'};
const ALL_LABEL = {en: 'All posts', ko: '전체 글'};

function tagSlug(tag) {
  return String(tag).toLowerCase().replace(/\s+/g, '-');
}

function normalize(p) {
  return decodeURIComponent(p || '').replace(/\/$/, '');
}

export default function BlogCategoriesSidebar() {
  const {siteConfig, i18n: {currentLocale}} = useDocusaurusContext();
  const {pathname} = useLocation();

  const blogPath = normalize(useBaseUrl('/blog'));
  const currentPath = normalize(pathname);

  const categories = siteConfig.customFields?.blogCategories?.[currentLocale] ?? [];

  const isAllActive = currentPath === blogPath;

  return (
    <nav className="blog-categories-sidebar" aria-label="Blog categories">
      <div className="blog-categories-title">{TITLE[currentLocale] ?? TITLE.en}</div>
      <ul className="blog-categories-list">
        <li>
          <Link
            to="/blog"
            className={`blog-category-item${isAllActive ? ' active' : ''}`}>
            <span className="blog-category-label">{ALL_LABEL[currentLocale] ?? ALL_LABEL.en}</span>
          </Link>
        </li>
        {categories.map(({label, count}) => {
          const slug = tagSlug(label);
          const to = `/blog/tags/${slug}`;
          const active = currentPath === normalize(`${blogPath}/tags/${slug}`);
          return (
            <li key={label}>
              <Link to={to} className={`blog-category-item${active ? ' active' : ''}`}>
                <span className="blog-category-label">#{label}</span>
                <span className="blog-category-count">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
