import type { ReviewCard } from '@/types/content'

/** 데모 marqueeHTML() — 8장 미만이면 반복 채우고, 무한 스크롤을 위해 2배로 이어붙인다. */
function buildTrack(list: ReviewCard[]): ReviewCard[] {
  let l = list.slice()
  if (!l.length) return []
  while (l.length < 8) l = l.concat(l)
  l = l.slice(0, Math.max(8, list.length))
  return [...l, ...l]
}

function RevCard({ r, gid }: { r: ReviewCard; gid: string }) {
  return (
    <div className="rev-card" data-lbg={gid} data-lbs={r.src} data-lbc={r.cap || ''}>
      <img src={r.src} alt={r.cap || '고객 후기 캡처'} loading="lazy" />
      <div className="rv-foot">
        <span>{r.cap || '고객 후기'}</span>
        <span className="zi">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          크게보기
        </span>
      </div>
    </div>
  )
}

/** 후기 캡처 마퀴 (홈 · 서비스 페이지 공통) */
export function ReviewMarquee({ list, gid }: { list: ReviewCard[]; gid: string }) {
  const track = buildTrack(list)
  if (!track.length) return null
  return (
    <div className="marquee reveal">
      <div className="fade-l"></div>
      <div className="fade-r"></div>
      <div className="track">
        {track.map((r, i) => (
          <RevCard key={`${r.src}-${i}`} r={r} gid={gid} />
        ))}
      </div>
    </div>
  )
}
