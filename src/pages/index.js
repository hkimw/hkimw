import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import TechNetwork from '@site/src/components/visual/TechNetwork';

const T = {
  en: {
    metaDesc: 'AI systems · FPGA acceleration · LLM inference',
    tag: 'AI systems · FPGA acceleration · LLM inference · Seoul, KR',
    pitch: [
      <>I work on the hardware/software boundary of AI systems: <strong>FPGA-based NPUs</strong>, LLM inference kernels, memory-bound workloads, and the runtimes that connect models to silicon.</>,
      <>My main project is <strong>pccx</strong> — a small research stack around a custom 64-bit ISA, an INT8 systolic array, runtime queues, and a Python-facing driver for edge FPGA inference. I care about the uncomfortable last mile of deployment: where the model graph finally meets memory bandwidth, queues, and hardware limits.</>,
    ],
    threadsTitle: 'Research threads',
    threadsSub: 'The topics I keep returning to when I read papers or build systems.',
    threads: [
      {kicker: 'memory-bound inference', title: "When bandwidth becomes the model's real batch size", desc: 'Decode-phase LLM inference often feels less like "more MACs" and more like carefully shaped data movement.'},
      {kicker: 'gemm / gemv', title: 'The kernel shape matters more than the operation name', desc: <>GEMV is not merely GEMM with <code>N = 1</code>; the memory access pattern changes the whole optimization target.</>},
      {kicker: 'runtime', title: 'A driver is part of the accelerator', desc: 'Queues, synchronization, scratchpads, and transfer overlap decide whether the hardware feels fast or broken.'},
      {kicker: 'low-bit systems', title: 'Quantization is a system design problem', desc: 'Weight precision, activation precision, packing, and hardware datapaths have to be reasoned about together.'},
    ],
    toolboxTitle: 'Toolbox',
    toolboxSub: 'A compact snapshot. This is not meant to be a resume table.',
    toolbox: [
      {k: 'hardware', v: 'SystemVerilog, Vitis HLS, FPGA bring-up, systolic-array datapaths'},
      {k: 'systems', v: 'C/C++, Python runtimes, queues, memory layout, profiling, small kernels'},
      {k: 'ai inference', v: 'Transformer inference, KV-cache, GEMM/GEMV, quantization, roofline-style analysis'},
      {k: 'writing', v: 'paper notes, architecture diagrams, reproducible experiment logs'},
    ],
  },
  ko: {
    metaDesc: 'AI 시스템 · FPGA 가속 · LLM 추론',
    tag: 'AI 시스템 · FPGA 가속 · LLM 추론 · 서울',
    pitch: [
      <>AI 시스템의 하드웨어/소프트웨어 경계에서 작업합니다: <strong>FPGA 기반 NPU</strong>, LLM 추론 커널, 메모리 바운드 워크로드, 그리고 모델을 실리콘에 연결하는 런타임.</>,
      <>주요 프로젝트인 <strong>pccx</strong>는 커스텀 64비트 ISA, INT8 시스톨릭 어레이, 런타임 큐, Python 드라이버 스택으로 구성된 엣지 FPGA 추론 연구 스택입니다. 모델 그래프가 메모리 대역폭, 큐, 하드웨어 한계와 만나는 마지막 구간을 연구합니다.</>,
      <>지능형반도체학과 학부생으로, FPGA 기반 NPU와 LLM 추론 최적화를 하드웨어부터 런타임까지 연결해 공부하고 있습니다.</>,
    ],
    threadsTitle: '연구 주제',
    threadsSub: '논문을 읽거나 시스템을 만들 때 계속 돌아오게 되는 주제들.',
    threads: [
      {kicker: 'memory-bound inference', title: '대역폭이 모델의 실질 배치 크기가 될 때', desc: '디코드 단계 LLM 추론은 "더 많은 MAC"보다는 신중하게 설계된 데이터 이동에 가깝습니다.'},
      {kicker: 'gemm / gemv', title: '커널의 형태가 연산 이름보다 중요하다', desc: <>GEMV는 단순히 <code>N = 1</code>인 GEMM이 아닙니다. 메모리 접근 패턴이 최적화 목표 전체를 바꿉니다.</>},
      {kicker: 'runtime', title: '드라이버도 가속기의 일부', desc: '큐, 동기화, 스크래치패드, 전송 오버랩이 하드웨어를 빠르게 느끼게 할지, 고장난 것처럼 느끼게 할지를 결정합니다.'},
      {kicker: 'low-bit systems', title: '양자화는 시스템 설계 문제', desc: '가중치 정밀도, 활성화 정밀도, 패킹, 하드웨어 데이터패스를 함께 고려해야 합니다.'},
    ],
    toolboxTitle: '기술 스택',
    toolboxSub: '간략한 스냅샷입니다.',
    toolbox: [
      {k: 'hardware', v: 'SystemVerilog, Vitis HLS, FPGA bring-up, systolic-array datapaths'},
      {k: 'systems', v: 'C/C++, Python runtimes, queues, memory layout, profiling, small kernels'},
      {k: 'ai inference', v: 'Transformer inference, KV-cache, GEMM/GEMV, quantization, roofline-style analysis'},
      {k: 'writing', v: 'paper notes, architecture diagrams, reproducible experiment logs'},
    ],
  },
};

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = T[currentLocale] ?? T.en;

  return (
    <Layout title="Home" description={t.metaDesc}>
      <main id="main">
        <section id="top" className="hk-hero" aria-labelledby="home-title">
          <div className="hk-page">
            <div className="hk-hero__row">
              <div>
                <h1 id="home-title" className="hk-hero__h">Hyunwoo KIM<span className="kor">김현우</span></h1>
                <p className="hk-hero__tag">{t.tag}</p>

                <div className="hk-hero__pitch hk-prose">
                  {t.pitch.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <div className="hk-contacts" aria-label="Contact and profile links">
                  <a href="mailto:k1h6w4@gmail.com">email<span className="arrow">↗</span></a>
                  <a href="https://github.com/hkimw" target="_blank" rel="noopener noreferrer">github<span className="arrow">↗</span></a>
                  <a href="/papers">papers</a>
                  <a href="/projects">projects</a>
                  <a href="/now">now</a>
                </div>
              </div>

              <div className="hk-avatar" aria-hidden="true">
                <img src={useBaseUrl('/img/me_light.jpg')} alt="Profile (Light)" className="hk-avatar-img-light" />
                <img src={useBaseUrl('/img/me_dark.jpg')} alt="Profile (Dark)" className="hk-avatar-img-dark" />
              </div>
            </div>

            <TechNetwork />
          </div>
        </section>

        <section id="threads" className="hk-section" aria-labelledby="threads-title">
          <div className="hk-page">
            <span className="hk-section__idx"><span className="num">01</span>threads</span>
            <h2 id="threads-title" className="hk-section__h">{t.threadsTitle}</h2>
            <p className="hk-section__sub">{t.threadsSub}</p>

            <ul className="hk-thread-grid" style={{display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--hk-s-4)'}}>
              {t.threads.map((thread, i) => (
                <li key={i} className="hk-thread">
                  <div className="hk-thread__kicker">{thread.kicker}</div>
                  <div className="hk-thread__title">{thread.title}</div>
                  <p className="hk-thread__desc">{thread.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="toolbox" className="hk-section" aria-labelledby="toolbox-title">
          <div className="hk-page">
            <span className="hk-section__idx"><span className="num">02</span>toolbox</span>
            <h2 id="toolbox-title" className="hk-section__h">{t.toolboxTitle}</h2>
            <p className="hk-section__sub">{t.toolboxSub}</p>

            <ul className="hk-toolbox">
              {t.toolbox.map((item, i) => (
                <li key={i}><span className="k">{item.k}</span><span className="v">{item.v}</span></li>
              ))}
            </ul>
          </div>
        </section>

      </main>
    </Layout>
  );
}
