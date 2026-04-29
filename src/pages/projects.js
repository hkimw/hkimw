import React, {useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import EChartsBlock from '@site/src/components/visual/EChartsBlock';

const T = {
  en: {
    locale: 'en',
    pageTitle: 'Projects',
    metaDesc: 'hkimw GitHub repositories & releases showcase',
    h1: 'Things I’m building',
    subtitle: 'A short list. Mostly hardware/software boundary work.',
    allFilter: 'all',
    status: {
      active: 'active',
      wip: 'wip',
      archived: 'archived',
    },
  },
  ko: {
    locale: 'ko',
    pageTitle: '프로젝트',
    metaDesc: 'hkimw GitHub 저장소 & 릴리즈 쇼케이스',
    h1: 'Things I’m building',
    subtitle: '하드웨어/소프트웨어 경계에서 작업 중인 프로젝트들입니다.',
    allFilter: 'all',
    status: {
      active: 'active',
      wip: 'wip',
      archived: 'archived',
    },
  },
};

const PROJECTS = [
  {
    name: 'pccx',
    description: {
      en: 'A parallel compute core executor for edge FPGAs: custom ISA, INT8 systolic array, runtime queues, and a Python-facing driver stack.',
      ko: 'Edge FPGA용 병렬 컴퓨팅 코어 프레임워크: 커스텀 ISA, INT8 시스톨릭 어레이, 런타임 큐, Python 드라이버 스택.',
    },
    why: {
      en: 'It lets me study edge LLM inference behavior: memory movement, kernel shape, and driver overhead rather than MAC count alone.',
      ko: 'LLM 추론 과정에서 MAC 연산량 외에도 메모리 이동, 커널 형태, 드라이버 오버헤드가 어떤 영향을 주는지 연구하기 위해 만들었습니다.',
    },
    tags: ['FPGA', 'NPU', 'ISA', 'SystemVerilog', 'C/C++', 'LLM'],
    repo: 'https://github.com/hkimw/pccx',
    release: 'https://github.com/hkimw/pccx/releases',
    language: 'SystemVerilog / C++ / Python',
    status: 'active',
  },
  {
    name: 'pccx-lab',
    description: {
      en: 'Visual performance profiler and pre-RTL simulator for the pccx NPU.',
      ko: 'pccx NPU를 위한 시각적 성능 프로파일러 겸 pre-RTL 시뮬레이터.',
    },
    why: {
      en: 'Hardware needs good software tooling to be debuggable. This bridges the gap between Verilog waveforms and high-level execution graphs.',
      ko: '하드웨어를 디버깅하려면 좋은 소프트웨어 도구가 필요합니다. Verilog 파형과 고수준 실행 그래프 사이의 간극을 메우기 위한 도구입니다.',
    },
    tags: ['Tauri', 'Rust', 'React', 'Profiler'],
    repo: 'https://github.com/hkimw/pccx-lab',
    release: 'https://github.com/hkimw/pccx-lab/releases',
    language: 'Rust / TypeScript',
    status: 'active',
  },
  {
    name: 'llm-lite',
    description: {
      en: 'A compact LLM serving/reference stack with Python runtime pieces, C++ kernels, and KV-cache experiments.',
      ko: 'Python 런타임과 C++ 커널, KV-cache 실험을 포함하는 경량 LLM 서빙 스택.',
    },
    why: {
      en: 'It gives me a software baseline before moving an optimization down into FPGA kernels.',
      ko: '최적화 아이디어를 FPGA 커널로 내리기 전에 소프트웨어 베이스라인을 빠르게 검증하기 위해 사용합니다.',
    },
    tags: ['LLM', 'Inference', 'Python', 'PyTorch'],
    repo: 'https://github.com/hkimw/llm-lite',
    release: 'https://github.com/hkimw/llm-lite/releases',
    language: 'Python / C++',
    status: 'active',
  },
  {
    name: 'NPU-FPGA-Transformer-Accelerator-KV260',
    description: {
      en: 'Transformer inference IP on AMD Kria KV260: systolic GEMM plus small special-function units for operations around attention and normalization.',
      ko: 'AMD Kria KV260 기반 Transformer 추론 IP. 시스톨릭 GEMM과 Attention, Normalization을 위한 특수 연산 유닛을 포함합니다.',
    },
    why: {
      en: 'It pushed me from "model acceleration" into memory hierarchy, scheduling, and runtime design.',
      ko: '단순한 모델 가속을 넘어 메모리 계층 구조, 스케줄링, 런타임 설계의 중요성을 깨닫게 해준 프로젝트입니다.',
    },
    tags: ['FPGA', 'NPU', 'LLM', 'SystemVerilog', 'Hardware'],
    repo: 'https://github.com/hkimw/NPU-FPGA-Transformer-Accelerator-KV260',
    release: 'https://github.com/hkimw/NPU-FPGA-Transformer-Accelerator-KV260/releases',
    language: 'SystemVerilog',
    status: 'wip',
  },
  {
    name: 'driver-drowsiness-detection',
    description: {
      en: 'An undergraduate latency-focused computer vision project using facial landmarks and a small model.',
      ko: '얼굴 랜드마크와 경량 모델을 활용한 학부 시절 컴퓨터 비전 지연시간 최적화 프로젝트.',
    },
    why: {
      en: 'It was the first project that made me care more about end-to-end latency than benchmark accuracy.',
      ko: '단순한 벤치마크 정확도보다 엔드투엔드 레이턴시에 더 신경 쓰게 된 첫 번째 프로젝트입니다.',
    },
    tags: ['Computer Vision', 'Deep Learning', 'Python'],
    repo: 'https://github.com/hkimw/Driver-drowsiness-detection',
    release: 'https://github.com/hkimw/Driver-drowsiness-detection/releases',
    language: 'Python',
    status: 'archived',
  },
];

export default function Projects() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  const allTags = useMemo(() => 
    Array.from(new Set(PROJECTS.flatMap((p) => p.tags ?? []))).sort()
  , []);

  const [activeTag, setActiveTag] = useState(null);

  const filtered = useMemo(() => {
    let list = activeTag === null
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags?.includes(activeTag));
    return list.filter((p) => !p.localeOnly || p.localeOnly === t.locale);
  }, [activeTag, t.locale]);

  return (
    <Layout title={t.pageTitle} description={t.metaDesc}>
      <main id="main">
        <section className="hk-section hk-page" style={{marginTop: 'var(--hk-s-10)'}}>
          <span className="hk-section__idx"><span className="num">01</span>work</span>
          <h2 className="hk-section__h">{t.h1}</h2>
          <p className="hk-section__sub">{t.subtitle}</p>

          <EChartsBlock type="latency" />

          <div className="hk-tagbar" role="group" aria-label="Project filters">
            <button 
              className={activeTag === null ? 'is-active' : ''} 
              onClick={() => setActiveTag(null)}
              data-tag="all"
            >
              {t.allFilter}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={activeTag === tag ? 'is-active' : ''}
                onClick={() => setActiveTag(tag)}
                data-tag={tag}
              >
                {tag.toLowerCase()}
              </button>
            ))}
          </div>

          <ul className="hk-proj-list">
            {filtered.map((project, idx) => (
              <ProjectRow key={idx} p={project} t={t} />
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

function ProjectRow({p, t}) {
  const statusLabel = t.status[p.status] ?? t.status.active;
  const statusClass =
    p.status === 'active' ? 'hk-status--live' :
    p.status === 'wip'    ? 'hk-status--wip'  :
                            'hk-status--arch';

  const description = useMemo(() => 
    typeof p.description === 'string'
      ? p.description
      : p.description?.[t.locale] ?? p.description?.en ?? ''
  , [p.description, t.locale]);

  const why = useMemo(() => 
    typeof p.why === 'string'
      ? p.why
      : p.why?.[t.locale] ?? p.why?.en ?? ''
  , [p.why, t.locale]);

  return (
    <li className="hk-proj">
      <a className="hk-proj__link" href={p.repo} target="_blank" rel="noopener noreferrer">
        <div className="hk-proj__top">
          <span className="hk-proj__name">{p.name}</span>
          <span className={`hk-status ${statusClass}`}>{statusLabel}</span>
          {p.language && <span className="hk-proj__meta">· {p.language}</span>}
        </div>
        <p className="hk-proj__desc">{description}</p>
        {why && (
          <p className="hk-proj__why"><strong>why it matters</strong> · {why}</p>
        )}
      </a>
      <div className="hk-proj__links">
        <a href={p.repo} target="_blank" rel="noopener noreferrer">source</a>
        {p.release && (
          <>
            <span className="sep">·</span>
            <a href={p.release} target="_blank" rel="noopener noreferrer">releases</a>
          </>
        )}
      </div>
    </li>
  );
}