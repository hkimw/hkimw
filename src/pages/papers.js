import React, {useState} from 'react';
import Layout from '@theme/Layout';

/**
 * 논문 데이터를 여기에 추가하세요.
 *
 * {
 *   title: '논문 제목',
 *   authors: ['저자1', '저자2'],   // 본인은 굵게 표시하려면 앞에 '*' 붙이기
 *   venue: '학회 / 저널 이름',
 *   year: 2024,
 *   tags: ['Deep Learning', 'CUDA'],
 *   links: {
 *     pdf:   'https://...',
 *     arxiv: 'https://arxiv.org/abs/...',
 *     doi:   'https://doi.org/...',
 *     code:  'https://github.com/...',
 *   },
 *   abstract: '논문 요약 (선택)',
 * }
 */
const PAPERS = [
  // 예시 — 실제 논문으로 교체하세요
  // {
  //   title: 'Efficient CUDA Kernel for Transformer Attention',
  //   authors: ['*Hyeonwoo Kim', 'Co-Author A'],
  //   venue: 'SC (Supercomputing)',
  //   year: 2024,
  //   tags: ['CUDA', 'Transformer', 'HPC'],
  //   links: {
  //     pdf: 'https://example.com/paper.pdf',
  //     arxiv: 'https://arxiv.org/abs/0000.00000',
  //     code: 'https://github.com/hwkim-dev/repo',
  //   },
  //   abstract: '이 논문에서는 ...',
  // },
];

export default function Papers() {
  return (
    <Layout title="Papers" description="hwkim-dev 논문 목록 — 작성 및 기여한 논문 아카이브">
      <main className="page-container">
        <div className="page-header">
          <h1>📄 논문 아카이브</h1>
          <p>작성 또는 기여한 논문, 포스터, 학회 발표를 정리하는 페이지입니다.</p>
        </div>

        {PAPERS.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>논문을 추가할 예정입니다</h3>
            <p>작성한 논문이 생기면 이곳에 정리하겠습니다.</p>
          </div>
        ) : (
          <div className="papers-list">
            {PAPERS.map((paper, idx) => (
              <PaperCard key={idx} paper={paper} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

function PaperCard({paper}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="paper-card">
      <div className="paper-meta">
        <span className="paper-year">{paper.year}</span>
        <span className="paper-venue">{paper.venue}</span>
      </div>

      <h2 className="paper-title">{paper.title}</h2>

      <p className="paper-authors">
        {paper.authors.map((author, i) => {
          const isSelf = author.startsWith('*');
          const name = isSelf ? author.slice(1) : author;
          return (
            <span key={i}>
              {i > 0 && ', '}
              {isSelf ? <strong>{name}</strong> : name}
            </span>
          );
        })}
      </p>

      {paper.tags && paper.tags.length > 0 && (
        <div className="paper-tags">
          {paper.tags.map((tag) => (
            <span key={tag} className="paper-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {paper.abstract && (
        <>
          <button
            className="abstract-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▲ 요약 닫기' : '▼ 요약 보기'}
          </button>
          {expanded && <p className="paper-abstract">{paper.abstract}</p>}
        </>
      )}

      {paper.links && Object.keys(paper.links).length > 0 && (
        <div className="paper-links">
          {paper.links.pdf && (
            <a
              href={paper.links.pdf}
              className="paper-link pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>
          )}
          {paper.links.arxiv && (
            <a
              href={paper.links.arxiv}
              className="paper-link arxiv"
              target="_blank"
              rel="noopener noreferrer"
            >
              arXiv
            </a>
          )}
          {paper.links.doi && (
            <a
              href={paper.links.doi}
              className="paper-link doi"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI
            </a>
          )}
          {paper.links.code && (
            <a
              href={paper.links.code}
              className="paper-link code"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}
