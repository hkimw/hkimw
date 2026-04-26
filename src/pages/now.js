import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Now',
    metaDesc: 'What I am working on this week — now page',
    h1: 'Now',
    subtitle: 'What I’m working on this week. Last updated 2026-04-26.',
    sections: [
      {
        when: 'this week',
        content: <>Cleaning up the personal site and separating it more clearly from the pccx documentation site.</>
      },
      {
        when: 'building',
        content: <>pccx experiments around memory movement, runtime queues, and edge inference kernels.</>
      },
      {
        when: 'writing',
        content: <>A longer note on why decode-phase GEMV behaves differently from prefill GEMM in small inference systems.</>
      },
      {
        when: 'reading',
        content: (
          <ul>
            <li><em>Computer Architecture: A Quantitative Approach</em>, slowly.</li>
            <li>LLM inference papers that connect algorithmic claims to actual memory behavior.</li>
          </ul>
        )
      }
    ],
    aside: <>If you want to reach me about hardware / inference work, email is best: <a href="mailto:k1h6w4@gmail.com">k1h6w4@gmail.com</a>.</>
  },
  ko: {
    pageTitle: 'Now',
    metaDesc: '이번 주에 집중하고 있는 것들 — now 페이지',
    h1: 'Now',
    subtitle: '이번 주에 하고 있는 일들입니다. 마지막 업데이트: 2026-04-26.',
    sections: [
      {
        when: 'this week',
        content: <>개인 웹사이트를 정리하고, pccx 공식 문서 사이트와 명확하게 역할을 분리하고 있습니다.</>
      },
      {
        when: 'building',
        content: <>pccx 프로젝트에서 메모리 이동, 런타임 큐, 그리고 edge 추론 커널에 대한 실험을 진행 중입니다.</>
      },
      {
        when: 'writing',
        content: <>소규모 추론 시스템에서 decode 단계의 GEMV가 왜 prefill GEMM과 다르게 동작하는지에 대한 긴 노트를 작성 중입니다.</>
      },
      {
        when: 'reading',
        content: (
          <ul>
            <li><em>Computer Architecture: A Quantitative Approach</em>, 천천히 읽는 중입니다.</li>
            <li>알고리즘의 주장을 실제 메모리 거동과 연결 짓는 LLM 추론 논문들을 읽고 있습니다.</li>
          </ul>
        )
      }
    ],
    aside: <>하드웨어 또는 추론 최적화 관련으로 연락하시려면 이메일이 가장 좋습니다: <a href="mailto:k1h6w4@gmail.com">k1h6w4@gmail.com</a>.</>
  }
};

export default function Now() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main id="main">
        <section className="hk-section hk-page" style={{marginTop: 'var(--hk-s-10)'}}>
          <span className="hk-section__idx"><span className="num">06</span>now</span>
          <h2 className="hk-section__h">{t.h1}</h2>
          <p className="hk-section__sub">
            {t.subtitle}
          </p>

          <div className="hk-now" style={{marginTop: 'var(--hk-s-8)'}}>
            {t.sections.map((sec, i) => (
              <div key={i} style={{marginBottom: 'var(--hk-s-4)'}}>
                <span className="when">
                  {sec.when}
                </span>
                <span className="hk-prose" style={{display: 'inline', color: 'var(--hk-ink-2)'}}>
                  {typeof sec.content === 'string' ? sec.content : sec.content}
                </span>
              </div>
            ))}
          </div>

          <div className="hk-aside" style={{marginTop: 'var(--hk-s-8)'}}>
            {t.aside}
          </div>
        </section>
      </main>
    </Layout>
  );
}