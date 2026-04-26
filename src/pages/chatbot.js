import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Chatbot',
    metaDesc: 'Ask hwkim-dev anything — AI chatbot for bio & project Q&A',
    h1: '🤖 AI Chatbot',
    subtitle:
      'Ask anything about me and my projects.\nAn AI assistant will answer — from bio to repository Q&A.',
    infoTitle: '💡 About This Chatbot',
    infoDesc:
      "This chatbot helps you learn about hwkim-dev's profile, projects, and papers.",
    infoItems: [
      'Bio & interests',
      'Project introductions & recommendations',
      'Paper & research questions',
      'Repository & release info',
      'Contact & links',
    ],
    questionsTitle: '💬 Try asking',
    questions: [
      'What does hwkim-dev study or work on?',
      'Recommend 3 of the best projects',
      'Are there any research-related repositories?',
      'What was the most recent release?',
      'Are there any CUDA-related projects?',
      'How can I contact you?',
    ],
    comingSoonTitle: 'Chatbot Coming Soon',
    comingSoonDesc: 'The chatbot will be connected here shortly.',
    comingSoonNote: 'Once deployed, you will be able to chat right here.',
    statusLabel: 'In development',
  },
  ko: {
    pageTitle: '챗봇',
    metaDesc: 'hwkim-dev에 대해 무엇이든 물어보세요 — AI 챗봇',
    h1: '🤖 AI 챗봇',
    subtitle:
      '저와 제 프로젝트에 대해 무엇이든 물어보세요.\n자기소개부터 저장소 Q&A까지 AI가 답해드립니다.',
    infoTitle: '💡 챗봇 소개',
    infoDesc: '이 챗봇은 hwkim-dev의 프로필, 프로젝트, 논문에 대한 질의응답을 도와줍니다.',
    infoItems: [
      '자기소개 및 관심 분야',
      '프로젝트 소개 & 추천',
      '논문 / 연구 관련 질문',
      '저장소 및 릴리즈 안내',
      '연락처 & 링크 안내',
    ],
    questionsTitle: '💬 이렇게 물어보세요',
    questions: [
      'hwkim-dev는 어떤 분야를 공부하나요?',
      '대표 프로젝트 3개를 추천해줘',
      '논문 또는 연구 관련 저장소가 있나요?',
      '최근 릴리즈된 프로젝트는 뭐야?',
      'CUDA 관련 프로젝트가 있나요?',
      '연락처나 GitHub 링크를 알려줘',
    ],
    comingSoonTitle: '챗봇 연결 준비 중',
    comingSoonDesc: '곧 챗봇이 이 페이지에 연결될 예정입니다.',
    comingSoonNote: '배포 후 이곳에서 바로 대화할 수 있게 됩니다.',
    statusLabel: '개발 진행 중',
  },
};

const CHATBOT_URL = null;

export default function Chatbot() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main id="main" className="hk-wrap">
        <section className="hk-section" style={{borderTop: 'none', marginTop: 0, paddingTop: 12}}>
          <h2 className="hk-section__h">{t.h1}</h2>
          <p className="hk-section__sub">
            {t.subtitle.split('\n').join(' ')}
          </p>

          <div className="hk-prose" style={{marginBottom: 24}}>
            <p>{t.infoDesc}</p>
          </div>

          <div className="hk-aside" style={{marginBottom: 32}}>
            <strong>{t.infoTitle}</strong>
            <ul style={{marginTop: '8px', marginBottom: 0}}>
              {t.infoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="chatbot-area">
            {CHATBOT_URL ? (
              <iframe
                src={CHATBOT_URL}
                title="hwkim-dev Chatbot"
                style={{width: '100%', height: '600px', border: '1px solid var(--rule)', borderRadius: '4px'}}
                allow="microphone"
              />
            ) : (
              <div className="hk-paper-item" style={{textAlign: 'center', padding: '48px 24px', background: 'var(--paper-2)', border: '1px dashed var(--rule)'}}>
                <div style={{fontSize: '32px', marginBottom: '16px'}}>🤖</div>
                <h3 className="hk-section__h">{t.comingSoonTitle}</h3>
                <p style={{fontSize: '14px', color: 'var(--muted)', margin: '8px 0'}}>{t.comingSoonDesc}</p>
                <div style={{marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--wip)'}}>
                  <span style={{width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor'}} />
                  {t.statusLabel}
                </div>
              </div>
            )}
          </div>

          <section className="hk-section">
            <h3 className="hk-section__h" style={{fontSize: '18px'}}>{t.questionsTitle}</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: '12px'}}>
              {t.questions.map((q, i) => (
                <span key={i} style={{color: 'var(--muted)', fontSize: '13px', fontStyle: 'italic'}}>
                  &ldquo;{q}&rdquo;
                </span>
              ))}
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
