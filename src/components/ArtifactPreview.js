import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ArtifactPreview.module.css';

function getStaticBaseUrl(baseUrl, i18n) {
  const cleanBase = String(baseUrl || '/').replace(/\/?$/, '/');
  const {currentLocale, defaultLocale} = i18n || {};
  const localeSuffix = currentLocale && currentLocale !== defaultLocale ? `/${currentLocale}/` : '';

  if (localeSuffix && cleanBase.endsWith(localeSuffix)) {
    return `${cleanBase.slice(0, -localeSuffix.length)}/`;
  }

  return cleanBase;
}

function joinStaticAssetUrl(baseUrl, href, i18n) {
  const cleanBase = getStaticBaseUrl(baseUrl, i18n);
  const cleanHref = String(href || '').replace(/^\/+/, '');
  return `${cleanBase}${cleanHref}`;
}

export default function ArtifactPreview({ href, title, description }) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const artifactUrl = joinStaticAssetUrl(siteConfig.baseUrl, href, i18n);
  const fileName = href ? href.split('/').pop() : '';
  return (
    <a
      className={styles.card}
      href={artifactUrl}
      target="_blank"
      rel="noreferrer"
      data-artifact-href={artifactUrl}
      data-noBrokenLinkCheck="true">
      <span className={styles.icon} aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </span>
      <span className={styles.content}>
        <strong className={styles.title}>{title || fileName}</strong>
        <span className={styles.description}>{description || 'Open HTML Artifact →'}</span>
      </span>
    </a>
  );
}
