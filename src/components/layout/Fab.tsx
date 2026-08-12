import { SITE } from '@/lib/constants'

/**
 * 데모 .fab 이식 (우하단 카카오톡 · 전화).
 * TODO: 카카오톡 상담 채널 URL 확정 시 kko 의 href 교체. (데모 원본은 "#")
 */
export function Fab() {
  return (
    <div className="fab">
      <a className="kko" href="#" aria-label="카카오톡 상담">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.9 5.36 4.74 6.79-.16.56-.9 3.06-.93 3.27 0 0-.02.15.08.21.1.06.22.02.22.02.29-.04 3.38-2.22 3.9-2.58.63.09 1.29.14 1.99.14 5.52 0 10-3.58 10-8s-4.48-8-10-8Z"
            fill="#3C1E1E"
          />
        </svg>
      </a>
      <a className="tel" href={SITE.telHref} aria-label="전화 상담">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}
