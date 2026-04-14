import React, {useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    pageTitle: 'Projects',
    metaDesc: 'hwkim-dev GitHub repositories & releases showcase',
    h1: '🛠️ Projects & Repositories',
    subtitle: 'Open source repositories and releases I have built.',
    githubBtn: '⭐ View full GitHub profile →',
    emptyTitle: 'Projects coming soon',
    emptyDesc: 'I will showcase my projects here once they are ready.',
    githubDirectBtn: 'View on GitHub',
    repoBtn: '📁 Repository',
    releaseBtn: '🚀 Releases',
    allFilter: 'All',
    status: {
      active: '🟢 Active',
      wip: '🚧 WIP',
      archived: '📦 Archived',
    },
  },
  ko: {
    pageTitle: '프로젝트',
    metaDesc: 'hwkim-dev GitHub 저장소 & 릴리즈 쇼케이스',
    h1: '🛠️ 프로젝트 & 저장소',
    subtitle: '직접 만든 GitHub 저장소와 릴리즈를 소개합니다.',
    githubBtn: '⭐ GitHub 프로필 전체 보기 →',
    emptyTitle: '프로젝트를 추가할 예정입니다',
    emptyDesc: '진행 중인 프로젝트가 정리되면 이곳에 소개하겠습니다.',
    githubDirectBtn: 'GitHub에서 바로 보기',
    repoBtn: '📁 Repository',
    releaseBtn: '🚀 Releases',
    allFilter: '전체',
    status: {
      active: '🟢 Active',
      wip: '🚧 WIP',
      archived: '📦 Archived',
    },
  },
};

const STATUS_COLOR = {
  active: '#16a34a',
  wip: '#d97706',
  archived: '#94a3b8',
};

/**
 * Add your projects here.
 *
 * {
 *   name: 'repo-name',
 *   description: 'One-line description',
 *   tags: ['Python', 'CUDA', 'PyTorch'],
 *   repo: 'https://github.com/hwkim-dev/repo-name',
 *   release: 'https://github.com/hwkim-dev/repo-name/releases',  // optional
 *   language: 'Python',   // primary language
 *   stars: 0,             // optional
 *   status: 'active',     // 'active' | 'wip' | 'archived'
 * }
 */
const PROJECTS = [];

export default function Projects() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  const allTags = [t.allFilter, ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags ?? []))).sort()];
  const [activeTag, setActiveTag] = useState(t.allFilter);

  const filtered =
    activeTag === t.allFilter
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags?.includes(activeTag));

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main className="page-container">
        <div className="page-header">
          <h1>{t.h1}</h1>
          <p>{t.subtitle}</p>
          <a
            href="https://github.com/hwkim-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary button--sm"
          >
            {t.githubBtn}
          </a>
        </div>

        {PROJECTS.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔧</div>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyDesc}</p>
            <a
              href="https://github.com/hwkim-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
              style={{marginTop: '1.2rem', display: 'inline-block'}}
            >
              {t.githubDirectBtn}
            </a>
          </div>
        ) : (
          <>
            {allTags.length > 1 && (
              <div className="project-filters">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`filter-btn${activeTag === tag ? ' active' : ''}`}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            <div className="projects-grid">
              {filtered.map((project, idx) => (
                <ProjectCard key={idx} project={project} t={t} />
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}

function ProjectCard({project, t}) {
  const statusLabel = t.status[project.status] ?? t.status.active;
  const statusColor = STATUS_COLOR[project.status] ?? STATUS_COLOR.active;

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-name">
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <span className="project-status" style={{color: statusColor}}>
          {statusLabel}
        </span>
      </div>

      <p className="project-description">{project.description}</p>

      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="project-links">
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
          {t.repoBtn}
        </a>
        {project.release && (
          <a href={project.release} target="_blank" rel="noopener noreferrer" className="project-link release">
            {t.releaseBtn}
          </a>
        )}
      </div>

      {(project.language !== undefined || project.stars !== undefined) && (
        <div className="project-footer">
          {project.language && <span className="project-language">● {project.language}</span>}
          {project.stars !== undefined && <span className="project-stars">⭐ {project.stars}</span>}
        </div>
      )}
    </div>
  );
}
