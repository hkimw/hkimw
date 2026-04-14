import React from 'react';
import Layout from '@theme/Layout';

const SAMPLE_QUESTIONS = [
  'hwkim-dev는 어떤 분야를 공부하나요?',
  '대표 프로젝트 3개를 추천해줘',
  '논문 또는 연구 관련 저장소가 있나요?',
  '최근 릴리즈된 프로젝트는 뭐야?',
  'CUDA 관련 프로젝트가 있나요?',
  '연락처나 GitHub 링크를 알려줘',
];

/**
 * 챗봇이 배포되면 아래 URL을 입력하세요.
 * null 이면 "준비 중" 화면을 보여줍니다.
 *
 * 예: const CHATBOT_URL = 'https://your-chatbot.streamlit.app';
 */
const CHATBOT_URL = null;

export default function Chatbot() {
  return (
    <Layout title="Chatbot" description="hwkim-dev에 대해 무엇이든 물어보세요 — AI 챗봇">
      <main className="page-container">
        <div className="page-header">
          <h1>🤖 AI 챗봇</h1>
          <p>
            저와 제 프로젝트에 대해 무엇이든 물어보세요.
            <br />
            자기소개부터 저장소 Q&amp;A까지 AI가 답해드립니다.
          </p>
        </div>

        <div className="chatbot-layout">
          {/* Left: Info Panel */}
          <aside className="chatbot-info">
            <div className="chatbot-card">
              <h3>💡 챗봇 소개</h3>
              <p>이 챗봇은 hwkim-dev의 프로필, 프로젝트, 논문에 대한 질의응답을 도와줍니다.</p>
              <ul>
                <li>자기소개 및 관심 분야</li>
                <li>프로젝트 소개 &amp; 추천</li>
                <li>논문 / 연구 관련 질문</li>
                <li>저장소 및 릴리즈 안내</li>
                <li>연락처 &amp; 링크 안내</li>
              </ul>
            </div>

            <div className="chatbot-card">
              <h3>💬 이렇게 물어보세요</h3>
              <div className="sample-questions">
                {SAMPLE_QUESTIONS.map((q, i) => (
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
                <h3>챗봇 연결 준비 중</h3>
                <p>곧 챗봇이 이 페이지에 연결될 예정입니다.</p>
                <p className="chatbot-note">
                  배포 후 이곳에서 바로 대화할 수 있게 됩니다.
                </p>
                <div className="chatbot-status">
                  <span className="status-dot wip" />
                  개발 진행 중
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
