import React, {useState} from 'react';
import Layout from '@theme/Layout';

/**
 * 프로젝트 데이터를 여기에 추가하세요.
 *
 * {
 *   name: '저장소 이름',
 *   description: '한 줄 설명',
 *   tags: ['Python', 'CUDA', 'PyTorch'],
 *   repo: 'https://github.com/hwkim-dev/repo-name',
 *   release: 'https://github.com/hwkim-dev/repo-name/releases',  // 없으면 생략
 *   language: 'Python',   // 주 언어
 *   stars: 0,             // 없으면 생략
 *   status: 'active',     // 'active' | 'wip' | 'archived'
 * }
 */
const PROJECTS = [
  // 예시 — 실제 프로젝트로 교체하세요
  // {
  //   name: 'cuda-attention-kernel',
  //   description: 'Transformer Attention을 위한 최적화된 CUDA 커널 구현체',
  //   tags: ['CUDA', 'C++', 'PyTorch'],
  //   repo: 'https://github.com/hwkim-dev/cuda-attention-kernel',
  //   release: 'https://github.com/hwkim-dev/cuda-attention-kernel/releases',
  //   language: 'CUDA C++',
  //   stars: 0,
  //   status: 'active',
  // },
];

const STATUS_CONFIG = {
  active: {label: '🟢 Active', color: '#16a34a'},
  wip: {label: '🚧 WIP', color: '#d97706'},
  archived: {label: '📦 Archived', color: '#94a3b8'},
};

const ALL_TAGS_LABEL = '전체';

export default function Projects() {
  const allTags = [
    ALL_TAGS_LABEL,
    ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags || []))).sort(),
  ];
  const [activeTag, setActiveTag] = useState(ALL_TAGS_LABEL);

  const filtered =
    activeTag === ALL_TAGS_LABEL
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags?.includes(activeTag));

  return (
    <Layout title="Projects" description="hwkim-dev의 GitHub 저장소 & 릴리즈 쇼케이스">
      <main className="page-container">
        <div className="page-header">
          <h1>🛠️ 프로젝트 &amp; 저장소</h1>
          <p>직접 만든 GitHub 저장소와 릴리즈를 소개합니다.</p>
          <a
            href="https://github.com/hwkim-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary button--sm"
          >
            ⭐ GitHub 프로필 전체 보기 →
          </a>
        </div>

        {PROJECTS.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔧</div>
            <h3>프로젝트를 추가할 예정입니다</h3>
            <p>진행 중인 프로젝트가 정리되면 이곳에 소개하겠습니다.</p>
            <a
              href="https://github.com/hwkim-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
              style={{marginTop: '1.2rem', display: 'inline-block'}}
            >
              GitHub에서 바로 보기
            </a>
          </div>
        ) : (
          <>
            {/* Tag Filter */}
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
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}

function ProjectCard({project}) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.active;

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-name">
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <span className="project-status" style={{color: status.color}}>
          {status.label}
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
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          📁 Repository
        </a>
        {project.release && (
          <a
            href={project.release}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link release"
          >
            🚀 Releases
          </a>
        )}
      </div>

      {(project.language !== undefined || project.stars !== undefined) && (
        <div className="project-footer">
          {project.language && (
            <span className="project-language">● {project.language}</span>
          )}
          {project.stars !== undefined && (
            <span className="project-stars">⭐ {project.stars}</span>
          )}
        </div>
      )}
    </div>
  );
}
