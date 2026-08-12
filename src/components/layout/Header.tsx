'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IMG, img } from '@/lib/content/images'
import { SERVICES, SERVICE_KEYS, childHref } from '@/lib/content/services'

/**
 * 데모 header.site + buildNav() 이식.
 * - PC: `.gnb-item:hover .mega` 로 메가드롭다운 (CSS 전담)
 * - 모바일: `.menu-toggle` 로 `nav.gnb.open` 토글, 페이지 이동 시 자동 닫힘
 */
export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site">
      <div className="container nav">
        <Link className="logo-link" href="/" aria-label="하늘숲홈케어 홈">
          <img className="logo-img" src={IMG['logo-brand']} alt="하늘숲홈케어" />
        </Link>

        {/* 데모 go() 가 하던 "링크 누르면 모바일 메뉴 닫기" 재현 */}
        <nav className={`gnb${open ? ' open' : ''}`} id="gnb" onClick={() => setOpen(false)}>
          <div className="gnb-item">
            <Link href="/about">회사소개</Link>
          </div>
          <div className="gnb-item">
            <Link href="/expo">박람회 현장</Link>
          </div>

          {SERVICE_KEYS.map((key) => {
            const s = SERVICES[key]
            const two = s.children.length > 4
            const links = s.children.map((c) => (
              <Link className="mg-link" href={childHref(key, c)} key={c.id}>
                <span className="mg-thumb">
                  <img src={img(c.img)} alt={c.t} />
                </span>
                <span>
                  <span className="mg-t">{c.t}</span>
                  <span className="mg-d">{c.d}</span>
                </span>
              </Link>
            ))

            return (
              <div className="gnb-item" key={key}>
                <Link href={`/${key}`}>{s.label}</Link>
                <div className={`mega${two ? ' cols2' : ''}`}>
                  <div className="mg-head">
                    <b>{s.label}</b>
                    <span>{s.navDesc}</span>
                  </div>
                  {two ? <div className="mg-grid">{links}</div> : links}
                  <Link className="mg-all" href={`/${key}`}>
                    {s.label} 전체보기 →
                  </Link>
                </div>
              </div>
            )
          })}
        </nav>

        <Link className="cta" href="/contact">
          상담문의
        </Link>

        <button
          className="menu-toggle"
          aria-label="메뉴"
          aria-expanded={open}
          aria-controls="gnb"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
