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

/**
 * Set this to your chatbot's deployed URL to activate the iframe.
 * e.g. 'https://your-chatbot.streamlit.app'
 */
const CHATBOT_URL = null;

export default function Chatbot() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main className="page-container">
        <div className="page-header">
          <h1>{t.h1}</h1>
          <p>
            {t.subtitle.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div className="chatbot-layout">
          {/* Left: Info Panel */}
          <aside className="chatbot-info">
            <div className="chatbot-card">
              <h3>{t.infoTitle}</h3>
              <p>{t.infoDesc}</p>
              <ul>
                {t.infoItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="chatbot-card">
              <h3>{t.questionsTitle}</h3>
              <div className="sample-questions">
                {t.questions.map((q, i) => (
                  <div key={i} className="sample-question">
                    &ldquo;{q}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right: Chat Area */}
          <div className="chatbot-area">
            {CHATBOT_URL ? (
              <iframe
                src={CHATBOT_URL}
                title="hwkim-dev Chatbot"
                className="chatbot-iframe"
                allow="microphone"
              />
            ) : (
              <div className="chatbot-coming-soon">
                <div className="chatbot-icon">🤖</div>
                <h3>{t.comingSoonTitle}</h3>
                <p>{t.comingSoonDesc}</p>
                <p className="chatbot-note">{t.comingSoonNote}</p>
                <div className="chatbot-status">
                  <span className="status-dot wip" />
                  {t.statusLabel}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
