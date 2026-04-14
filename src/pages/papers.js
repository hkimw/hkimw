import React, {useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Papers',
    metaDesc: 'hwkim-dev paper archive — authored and contributed papers',
    h1: '📄 Paper Archive',
    subtitle: 'Papers, posters, and conference presentations I have authored or contributed to.',
    emptyTitle: 'Papers coming soon',
    emptyDesc: 'I will add my papers here as they are published.',
    abstractShow: '▼ Show Abstract',
    abstractHide: '▲ Hide Abstract',
  },
  ko: {
    pageTitle: '논문',
    metaDesc: 'hwkim-dev 논문 아카이브 — 작성 및 기여한 논문',
    h1: '📄 논문 아카이브',
    subtitle: '작성 또는 기여한 논문, 포스터, 학회 발표를 정리하는 페이지입니다.',
    emptyTitle: '논문을 추가할 예정입니다',
    emptyDesc: '작성한 논문이 생기면 이곳에 정리하겠습니다.',
    abstractShow: '▼ 요약 보기',
    abstractHide: '▲ 요약 닫기',
  },
};

/**
 * Add your papers here.
 *
 * {
 *   title: 'Paper Title',
 *   authors: ['*Hyeonwoo Kim', 'Co-Author'],  // prefix '*' = bold (self)
 *   venue: 'Conference / Journal Name',
 *   year: 2024,
 *   tags: ['Deep Learning', 'CUDA'],
 *   links: {
 *     pdf:   'https://...',
 *     arxiv: 'https://arxiv.org/abs/...',
 *     doi:   'https://doi.org/...',
 *     code:  'https://github.com/...',
 *   },
 *   abstract: 'Optional abstract text.',
 * }
 */
const PAPERS = [];

export default function Papers() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main className="page-container">
        <div className="page-header">
          <h1>{t.h1}</h1>
          <p>{t.subtitle}</p>
        </div>

        {PAPERS.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyDesc}</p>
          </div>
        ) : (
          <div className="papers-list">
            {PAPERS.map((paper, idx) => (
              <PaperCard key={idx} paper={paper} t={t} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

function PaperCard({paper, t}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="paper-card">
      <div className="paper-meta">
        <span className="paper-year">{paper.year}</span>
        <span className="paper-venue">{paper.venue}</span>
      </div>

      <h2 className="paper-title">{paper.title}</h2>

      <p className="paper-authors">
        {paper.authors.map((author, i) => {
          const isSelf = author.startsWith('*');
          const name = isSelf ? author.slice(1) : author;
          return (
            <span key={i}>
              {i > 0 && ', '}
              {isSelf ? <strong>{name}</strong> : name}
            </span>
          );
        })}
      </p>

      {paper.tags && paper.tags.length > 0 && (
        <div className="paper-tags">
          {paper.tags.map((tag) => (
            <span key={tag} className="paper-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {paper.abstract && (
        <>
          <button className="abstract-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? t.abstractHide : t.abstractShow}
          </button>
          {expanded && <p className="paper-abstract">{paper.abstract}</p>}
        </>
      )}

      {paper.links && Object.keys(paper.links).length > 0 && (
        <div className="paper-links">
          {paper.links.pdf && (
            <a href={paper.links.pdf} className="paper-link pdf" target="_blank" rel="noopener noreferrer">
              PDF
            </a>
          )}
          {paper.links.arxiv && (
            <a href={paper.links.arxiv} className="paper-link arxiv" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
          )}
          {paper.links.doi && (
            <a href={paper.links.doi} className="paper-link doi" target="_blank" rel="noopener noreferrer">
              DOI
            </a>
          )}
          {paper.links.code && (
            <a href={paper.links.code} className="paper-link code" target="_blank" rel="noopener noreferrer">
              Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}
