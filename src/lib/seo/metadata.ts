import type { Metadata } from 'next'
import { SEO, routeOf } from '@/lib/content/seo'
import { OG_IMAGE, SITE_URL } from '@/lib/constants'

/**
 * 페이지별 메타데이터 빌더.
 * SEO 테이블(src/lib/content/seo.ts)이 title·description 의 단일 소스다.
 *
 * NOTE: 테이블의 `t` 는 "… | 하늘숲홈케어" 까지 포함된 완성형이라
 *       layout 의 title.template 이 다시 붙지 않도록 `absolute` 로 넣는다.
 */
export function pageMetadata(id: string, opts?: { image?: string }): Metadata {
  const e = SEO[id]
  if (!e) return {}

  const path = routeOf(id)
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
