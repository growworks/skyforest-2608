'use client'

import { useCallback, useEffect, useState } from 'react'

type Shot = { s: string; c: string }

/**
 * 데모 라이트박스 이식.
 * `[data-lbg]` 델리게이션 — 같은 그룹(data-lbg)끼리 이전/다음·카운터·캡션·키보드 지원.
 * 그룹 수집 범위는 데모와 동일하게 현재 `.page` 안으로 한정하고, 중복 src 는 dedupe 한다.
 */
export function Lightbox() {
  const [list, setList] = useState<Shot[]>([])
  const [idx, setIdx] = useState(0)
  const [on, setOn] = useState(false)

  const close = useCallback(() => {
    setOn(false)
    document.body.style.overflow = ''
  }, [])

  const step = useCallback(
    (d: number) => {
      setIdx((i) => (list.length ? (i + d + list.length) % list.length : i))
    },
    [list],
  )

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const t = target?.closest<HTMLElement>('[data-lbg]')
      if (!t) return

      const g = t.dataset.lbg
      const page = t.closest('.page') || document
      const els = Array.from(page.querySelectorAll<HTMLElement>(`[data-lbg="${g}"]`))
      const seen = new Map<string, string>()
      els.forEach((n) => {
        const s = n.dataset.lbs || n.querySelector('img')?.getAttribute('src') || ''
        if (s && !seen.has(s)) seen.set(s, n.dataset.lbc || '')
      })
      const next = [...seen.entries()].map(([s, c]) => ({ s, c }))
      if (!next.length) return

      const src = t.dataset.lbs || t.querySelector('img')?.getAttribute('src') || ''
      setList(next)
      setIdx(Math.max(0, next.findIndex((x) => x.s === src)))
      setOn(true)
      document.body.style.overflow = 'hidden'
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!on) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [on, close, step])

  // 언마운트 시 스크롤 잠금 해제 보장
  useEffect(() => () => {
    document.body.style.overflow = ''
  }, [])

  const it = list[idx]
  const multi = list.length > 1

  return (
    <div
      className={`lb${on ? ' on' : ''}`}
      id="lb"
      role="dialog"
      aria-label="이미지 크게 보기"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'lb') close()
      }}
    >
      <span className="lb-cnt" id="lbCnt">
        {multi ? `${idx + 1} / ${list.length}` : ''}
      </span>
      <button className="lb-x" onClick={close} aria-label="닫기">
        ×
      </button>
      <button
        className="lb-prev"
        style={{ display: multi ? 'flex' : 'none' }}
        onClick={() => step(-1)}
        aria-label="이전"
      >
        ‹
      </button>
      <img id="lbImg" src={it?.s || undefined} alt={it?.c || ''} />
      <button
        className="lb-next"
        style={{ display: multi ? 'flex' : 'none' }}
        onClick={() => step(1)}
        aria-label="다음"
      >
        ›
      </button>
      <div className="lb-cap" id="lbCap" style={{ display: it?.c ? 'block' : 'none' }}>
        {it?.c || ''}
      </div>
    </div>
  )
}
