import React, {useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const T = {
  en: {
    locale: 'en',
    pageTitle: 'Projects',
    metaDesc: 'hwkim-dev GitHub repositories & releases showcase',
    h1: 'Projects & Repositories',
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
    locale: 'ko',
    pageTitle: '프로젝트',
    metaDesc: 'hwkim-dev GitHub 저장소 & 릴리즈 쇼케이스',
    h1: '프로젝트 & 저장소',
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
const PROJECTS = [
  {
    name: 'pccx',
    description: {
      en: 'Full-stack hardware-software co-design framework for Edge FPGAs — custom NPU architecture, proprietary ISA, and CUDA-like driver/API to accelerate Transformers and neural networks.',
      ko: 'Edge FPGA용 하드웨어/소프트웨어 풀스택 프레임워크 — 커스텀 NPU 아키텍처, 전용 ISA, CUDA 스타일 드라이버/API로 Transformer와 신경망을 가속합니다.',
    },
    tags: ['FPGA', 'NPU', 'ISA', 'SystemVerilog', 'C/C++', 'LLM'],
    repo: 'https://github.com/hwkim-dev/pccx',
    release: 'https://github.com/hwkim-dev/pccx/releases',
    language: 'SystemVerilog / C++',
    status: 'active',
  },
  {
    name: 'pccx-lab',
    description: {
      en: 'Visual performance profiler and pre-RTL simulator for the pccx NPU — Tauri + Rust + React shell with UVM co-simulation and LLM-driven testbench generation.',
      ko: 'pccx NPU를 위한 시각적 성능 프로파일러 겸 pre-RTL 시뮬레이터 — Tauri + Rust + React 기반, UVM 공동 시뮬레이션과 LLM 테스트벤치 생성을 지원합니다.',
    },
    tags: ['Tauri', 'Rust', 'React', 'UVM', 'NPU', 'Profiler'],
    repo: 'https://github.com/hwkim-dev/pccx-lab',
    release: 'https://github.com/hwkim-dev/pccx-lab/releases',
    language: 'Rust / TypeScript',
    status: 'active',
  },
  {
    name: 'llm-lite',
    description: {
      en: 'Lightweight LLM serving stack focused on low-latency inference and compact deployment.',
      ko: '저지연 추론과 경량 배포에 초점을 맞춘 경량 LLM 서빙 스택.',
    },
    tags: ['LLM', 'Inference', 'Python', 'PyTorch'],
    repo: 'https://github.com/hwkim-dev/llm-lite',
    release: 'https://github.com/hwkim-dev/llm-lite/releases',
    language: 'Python',
    status: 'active',
  },
  {
    name: 'pccx-FPGA-NPU-LLM-kv260',
    description: {
      en: 'LLM inference accelerator on AMD Kria KV260 — custom NPU IP on FPGA with Vitis HLS.',
      ko: 'AMD Kria KV260 기반 LLM 추론 가속기 — Vitis HLS로 구현한 커스텀 NPU IP.',
    },
    tags: ['FPGA', 'NPU', 'LLM', 'Vitis HLS', 'Hardware'],
    repo: 'https://github.com/hwkim-dev/pccx-FPGA-NPU-LLM-kv260',
    release: 'https://github.com/hwkim-dev/pccx-FPGA-NPU-LLM-kv260/releases',
    language: 'C++ / HLS',
    status: 'wip',
  },
  {
    name: 'Driver-drowsiness-detection',
    description: {
      en: 'Real-time driver drowsiness detection using computer vision and deep learning.',
      ko: '컴퓨터 비전과 딥러닝을 활용한 실시간 운전자 졸음 감지 시스템.',
    },
    tags: ['Computer Vision', 'Deep Learning', 'Python', 'OpenCV'],
    repo: 'https://github.com/hwkim-dev/Driver-drowsiness-detection',
    release: 'https://github.com/hwkim-dev/Driver-drowsiness-detection/releases',
    language: 'Python',
    status: 'active',
  },
];

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

  const description =
    typeof project.description === 'string'
      ? project.description
      : project.description?.[t.locale] ?? project.description?.en ?? '';

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

      <p className="project-description">{description}</p>

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
