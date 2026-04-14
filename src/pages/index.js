import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Home" description="hwkim-dev 개인 홈페이지">
      <main style={{maxWidth: 960, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>안녕하세요, hwkim-dev입니다 👋</h1>
        <p>
          딥러닝 가속, 병렬 프로그래밍, 시스템 최적화에 관심을 두고 공부하고 있습니다.
          이 공간은 공부 기록, 프로젝트, 논문, 그리고 챗봇 연결 정보를 정리하는 개인 홈페이지입니다.
        </p>

        <section style={{marginTop: '2rem'}}>
          <h2>Contact</h2>
          <ul>
            <li>Email: your-email@example.com</li>
            <li>GitHub: https://github.com/hwkim-dev</li>
            <li>기타: LinkedIn / Blog / Notion 링크 추가 예정</li>
          </ul>
        </section>

        <section style={{marginTop: '2rem'}}>
          <h2>빠른 이동</h2>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/docs/papers">Papers</Link>
            </li>
            <li>
              <Link to="/docs/projects">Projects / Repositories</Link>
            </li>
            <li>
              <Link to="/docs/chatbot">Chatbot</Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
