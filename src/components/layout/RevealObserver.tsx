'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * 데모 revealOnScroll() 이식.
 * `.reveal` 이 뷰포트 90% 지점에 들어오면 `.in` 을 부여한다(데모와 동일한 임계값).
 * 라우트가 바뀌면 데모의 go() 와 동일하게 `.in` 을 걷어내고 다시 계산한다.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      document.querySelectorAll<HTMLElement>('.page.active .reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in')
      })
    }

    // 페이지 전환 시 재생 (데모 go() 동작)
    document
      .querySelectorAll<HTMLElement>('.page.active .reveal')
      .forEach((el) => el.classList.remove('in'))

    reveal()
    const t = window.setTimeout(reveal, 60)

    window.addEventListener('scroll', reveal, { passive: true })
    window.addEventListener('resize', reveal)
    window.addEventListener('load', reveal)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', reveal)
      window.removeEventListener('load', reveal)
    }
  }, [pathname])

  return null
}
