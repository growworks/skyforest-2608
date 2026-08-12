'use client'

import { useEffect, useRef, useState } from 'react'
import { HOME_COUNTERS } from '@/lib/constants'

const DUR = 2200

/** 데모 runCounters() 이식 — 2.2초 ease-out 카운트업 */
export function Counters() {
  const [t, setT] = useState(0)
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const start = performance.now()
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / DUR)
      setT(p)
      if (p < 1) raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return () => {
      if (raf.current !== undefined) cancelAnimationFrame(raf.current)
    }
  }, [])

  const ease = 1 - Math.pow(1 - t, 3)

  return (
    <div className="trust" id="counterGrid">
      {HOME_COUNTERS.map((c) => {
        const val = t >= 1 ? c.n : Math.floor(c.n * ease)
        return (
          <div key={c.lab}>
            {/* 애니메이션 시작 전(SSR/최초 렌더)은 데모와 동일하게 접미사 없이 "0" */}
            <div className="num">{t === 0 ? '0' : val.toLocaleString() + c.suf}</div>
            <div className="lab">{c.lab}</div>
          </div>
        )
      })}
    </div>
  )
}
