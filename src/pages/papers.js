import React, {useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Papers & talks',
    metaDesc: 'hwkim-dev paper archive — authored and contributed papers',
    h1: 'Papers & talks',
    subtitle: 'Mostly on FPGA-based NPUs and low-bit transformer inference.',
    emptyTitle: 'Papers coming soon',
    emptyDesc: 'I will add my papers here as they are published.',
    abstractShow: '▼ Show Abstract',
    abstractHide: '▲ Hide Abstract',
  },
  ko: {
    pageTitle: '논문 및 발표',
    metaDesc: 'hwkim-dev 논문 아카이브 — 작성 및 기여한 논문',
    h1: 'Papers & talks',
    subtitle: '주로 FPGA 기반 NPU와 저정밀도 Transformer 추론에 관한 내용입니다.',
    emptyTitle: '논문을 추가할 예정입니다',
    emptyDesc: '작성한 논문이 생기면 이곳에 정리하겠습니다.',
    abstractShow: '▼ 요약 보기',
    abstractHide: '▲ 요약 닫기',
  },
};

const PAPERS = [];

export default function Papers() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main id="main">
        <section className="hk-section hk-page" style={{marginTop: 'var(--hk-s-10)'}}>
          <span className="hk-section__idx"><span className="num">04</span>papers</span>
          <h2 className="hk-section__h">{t.h1}</h2>
          <p className="hk-section__sub">{t.subtitle}</p>

          <div className="hk-papers">
            {PAPERS.filter((p) => !p.localeOnly || p.localeOnly === t.locale).length === 0 ? (
              <div className="hk-aside">
                {t.emptyDesc}
              </div>
            ) : (
              PAPERS.filter((p) => !p.localeOnly || p.localeOnly === t.locale).map((paper, idx) => (
                <PaperItem key={idx} paper={paper} t={t} />
              ))
            )}
          </div>

        </section>
      </main>
    </Layout>
  );
}

function PaperItem({paper, t}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="hk-paper">
      <h3 className="hk-paper__title">{paper.title}</h3>
      <div className="hk-paper__meta">
        {paper.authors.map((author, i) => {
          const isSelf = author.startsWith('*') || author.includes('Hyunwoo Kim');
          const name = author.replace('*', '');
          return (
            <React.Fragment key={i}>
              {i > 0 && ', '}
              {isSelf ? <strong>{name}</strong> : name}
            </React.Fragment>
          );
        })}
        {' '}· <span className="venue">{paper.venue}</span> · {paper.year}
      </div>

      <div className="hk-paper__links">
        {paper.links.pdf && <a href={paper.links.pdf} target="_blank" rel="noopener noreferrer">pdf {paper.links.pdf === '#' ? 'soon' : ''}</a>}
        {paper.links.slides && <a href={paper.links.slides} target="_blank" rel="noopener noreferrer">slides {paper.links.slides === '#' ? 'soon' : ''}</a>}
        {paper.links.arxiv && <a href={paper.links.arxiv} target="_blank" rel="noopener noreferrer">arxiv</a>}
        {paper.links.doi && <a href={paper.links.doi} target="_blank" rel="noopener noreferrer">doi</a>}
        {paper.links.code && <a href={paper.links.code} target="_blank" rel="noopener noreferrer">code {paper.links.code === '#' ? 'soon' : ''}</a>}
        {paper.abstract && (
          <a onClick={() => setExpanded(!expanded)} style={{cursor: 'pointer', borderBottom: '1px dashed var(--hk-wire)'}}>
            {expanded ? t.abstractHide : t.abstractShow}
          </a>
        )}
      </div>

      {expanded && paper.abstract && (
        <div className="hk-prose" style={{marginTop: '12px', fontSize: '14px', color: 'var(--hk-ink-2)'}}>
          <p>{paper.abstract}</p>
        </div>
      )}
    </article>
  );
}