import type { Metadata } from 'next'
import { SEO, routeOf } from '@/lib/content/seo'
import { OG_IMAGE, SITE, SITE_URL } from '@/lib/constants'

/**
 * 페이지별 메타데이터 빌더.
 * SEO 테이블(src/lib/content/seo.ts)이 title·description 의 단일 소스다.
 *
 * NOTE: 테이블의 `t` 는 "… | 하늘숲홈케어" 까지 포함된 완성형이라
 *       layout 의 title.template 이 다시 붙지 않도록 `absolute` 로 넣는다.
 */
export function pageMetadata(
  id: string,
  opts?: {
    image?: string
    /**
     * SEO 테이블에 항목이 없을 때(어드민에서 새로 추가된 박람회 등) 사용할 값.
     * 테이블에 있으면 테이블이 우선한다.
     */
    fallback?: { path: string; title: string; description: string }
  },
): Metadata {
  const fb = opts?.fallback
  const e = SEO[id] ?? (fb ? { p: fb.path, t: `${fb.title} | ${SITE.brand}`, d: fb.description } : undefined)
  if (!e) return {}

  const path = SEO[id] ? routeOf(id) : e.p
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const image = opts?.image ?? OG_IMAGE

  return {
    title: { absolute: e.t },
    description: e.d,
    // 루트는 sitemap 과 표기를 맞추기 위해 끝 슬래시를 유지한다
    alternates: { canonical: path === '/' ? url : path },
    openGraph: {
      title: e.t,
      description: e.d,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: e.t }],
    },
    twitter: {
      title: e.t,
      description: e.d,
      images: [image],
    },
  }
}
