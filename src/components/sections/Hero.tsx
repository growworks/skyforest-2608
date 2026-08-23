'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMG } from '@/lib/content/images'

const SLIDES = [
  { k: 'hero-a', alt: '하늘숲홈케어 시공 현장' },
  { k: 'hero-b', alt: '입주청소 완료 현장' },
  { k: 'hero-c', alt: '코팅 완료 현장' },
]

/** 데모 홈 히어로 + 4.8초 슬라이드 로테이션 이식 */
export function Hero() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), 4800)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="hero" style={{ padding: 0 }}>
      {SLIDES.map((s, i) => (
        <img
          key={s.k}
          className={`slide${i === slide ? ' on' : ''}`}
          src={IMG[s.k]}
          alt={s.alt}
          fetchPriority={i === 0 ? 'high' : undefined}
        />
      ))}
      <div className="veil"></div>
      <div className="container hero-inner">
        <p className="kicker">100% 지부장 체계 · 하청 없는 책임시공</p>
        <h1>
          진심을 다하는
          <br />
          <em>완벽한 홈케어</em>
        </h1>
        <p className="lead">
          입주청소부터 줄눈·나노코팅·탄성코트까지.
          <br />
          상담부터 시공, AS까지 지부장 한 사람이 처음부터 끝까지 책임집니다.
        </p>
        <div className="hero-actions">
          <Link className="cta" href="/contact">
            무료 상담 신청
          </Link>
          <a className="hero-link" href="#gal-sec">
            시공사례 보기 →
          </a>
        </div>
        <div className="hero-nav">
          <span id="heroNum">{'0' + (slide + 1)}</span>
          <span className="bar">
            <i id="heroBar" style={{ width: `${((slide + 1) / SLIDES.length) * 100}%` }} />
          </span>
          <span>{'0' + SLIDES.length}</span>
        </div>
      </div>
    </section>
  )
}
