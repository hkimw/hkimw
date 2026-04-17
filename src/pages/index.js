import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Home',
    metaDesc: 'hwkim-dev — Deep Learning, Parallel Programming, Systems Optimization',
    tagline: 'Deep Learning · Parallel Programming · Systems Optimization',
    bio: 'I am interested in GPU acceleration, CUDA programming, and deep learning inference optimization. I study and build things, and record what I learn here.',
    ctaBlog: 'Read Blog',
    ctaProjects: 'View Projects',
    skillsTitle: '⚙️ Interests & Skills',
    skills: [
      'Deep Learning',
      'CUDA / GPU Programming',
      'Parallel Programming',
      'Systems Optimization',
      'PyTorch',
      'C / C++',
      'Python',
      'HPC',
      'DL Inference Acceleration',
    ],
    navTitle: '🗂️ Explore',
    contactTitle: '📬 Contact',
    cards: [
      {
        icon: '📝',
        title: 'Blog',
        description: 'Study notes, daily life, news clips, reviews, and random thoughts.',
        to: '/blog',
        tags: ['Paper', 'Study', 'Review', 'News', 'Daily'],
      },
      {
        icon: '📄',
        title: 'Papers',
        description:
          'Archive of papers, posters, and conference presentations I have authored or contributed to.',
        to: '/papers',
        tags: [],
      },
      {
        icon: '🛠️',
        title: 'Projects',
        description:
          'GitHub repositories and releases I have built. Check out the tech stack and links.',
        to: '/projects',
        tags: [],
      },
      {
        icon: '🤖',
        title: 'Chatbot',
        description: 'Ask anything about me and my projects. An AI assistant will answer.',
        to: '/chatbot',
        tags: [],
      },
    ],
  },
  ko: {
    pageTitle: '홈',
    metaDesc: 'hwkim-dev — 딥러닝, 병렬 프로그래밍, 시스템 최적화',
    tagline: '딥러닝 · 병렬 프로그래밍 · 시스템 최적화',
    bio: 'GPU 가속, CUDA 프로그래밍, 딥러닝 추론 최적화에 관심을 두고 공부하고 있습니다. 연구와 개발을 병행하며 배운 것들을 이 공간에 기록하고 공유합니다.',
    ctaBlog: '블로그 보기',
    ctaProjects: '프로젝트 보기',
    skillsTitle: '⚙️ 관심 분야 & 기술',
    skills: [
      'Deep Learning',
      'CUDA / GPU 프로그래밍',
      '병렬 프로그래밍',
      '시스템 최적화',
      'PyTorch',
      'C / C++',
      'Python',
      'HPC',
      '딥러닝 추론 가속',
    ],
    navTitle: '🗂️ 페이지 둘러보기',
    contactTitle: '📬 연락하기',
    cards: [
      {
        icon: '📝',
        title: '블로그',
        description: '공부 기록, 일상, 뉴스 클리핑, 리뷰, 그리고 잡다한 생각들을 기록합니다.',
        to: '/blog',
        tags: ['논문', '공부', '리뷰', '뉴스', '일상'],
      },
      {
        icon: '📄',
        title: '논문',
        description: '작성 또는 기여한 논문, 포스터, 학회 발표를 정리하는 아카이브입니다.',
        to: '/papers',
        tags: [],
      },
      {
        icon: '🛠️',
        title: '프로젝트',
        description:
          '직접 만든 GitHub 저장소와 릴리즈를 소개합니다. 기술 스택과 링크를 확인하세요.',
        to: '/projects',
        tags: [],
      },
      {
        icon: '🤖',
        title: '챗봇',
        description: '저와 제 프로젝트에 대해 무엇이든 물어보세요. AI가 대신 답해드립니다.',
        to: '/chatbot',
        tags: [],
      },
    ],
  },
};

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      {/* Hero */}
      <header className="hero-section">
        <div className="hero-content">
          <img
            className="hero-avatar"
            src="https://github.com/hwkim-dev.png"
            alt="hwkim-dev avatar"
          />
          <div className="hero-text">
            <h1 className="hero-name">hwkim-dev</h1>
            <p className="hero-tagline">{t.tagline}</p>
            <p className="hero-bio">{t.bio}</p>
            <div className="hero-actions">
              <Link className="button button--primary button--lg" to="/blog">
                {t.ctaBlog}
              </Link>
              <Link className="button button--secondary button--lg" to="/projects">
                {t.ctaProjects}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        {/* Skills */}
        <section className="skills-section">
          <h2 className="section-title">{t.skillsTitle}</h2>
          <div className="skills-grid">
            {t.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Nav Cards */}
        <section className="nav-cards-section">
          <h2 className="section-title">{t.navTitle}</h2>
          <div className="nav-cards-grid">
            {t.cards.map((card) => (
              <Link key={card.title} to={card.to} className="nav-card">
                <div className="nav-card-icon">{card.icon}</div>
                <h3 className="nav-card-title">{card.title}</h3>
                <p className="nav-card-desc">{card.description}</p>
                {card.tags.length > 0 && (
                  <div className="nav-card-tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="nav-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <h2 className="section-title">{t.contactTitle}</h2>
          <div className="contact-links">
            <a
              className="contact-link github"
              href="https://github.com/hwkim-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>⭐</span> GitHub
            </a>
            <a className="contact-link email" href="mailto:k1h6w4@gmail.com">
              <span>✉️</span> k1h6w4@gmail.com
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
