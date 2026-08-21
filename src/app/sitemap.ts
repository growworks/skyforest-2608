import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { SEO, routeOf } from '@/lib/content/seo'
import { getExpoList } from '@/lib/content'

export const revalidate = 3600

/** id 접두사별 우선순위·갱신주기 */
function weightOf(id: string): { priority: number; changeFrequency: 'weekly' | 'monthly' } {
  if (id === 'home') return { priority: 1, changeFrequency: 'weekly' }
  if (id === 'contact') return { priority: 0.8, changeFrequency: 'monthly' }
  if (id === 'about') return { priority: 0.7, changeFrequency: 'monthly' }
  if (id === 'expo') return { priority: 0.7, changeFrequency: 'weekly' }
  if (id.startsWith('expo-')) return { priority: 0.6, changeFrequency: 'monthly' }
  // 서비스: 부모(단일 세그먼트) 0.9 / 하위 0.8
  return id.includes('-')
    ? { priority: 0.8, changeFrequency: 'weekly' }
    : { priority: 0.9, changeFrequency: 'weekly' }
}

/**
 * 정적 페이지·서비스는 SEO 테이블에서, **박람회 상세는 포트폴리오 API 에서** 파생한다.
 * (어드민에서 항목이 늘어도 사이트맵이 따라간다. SEO 테이블의 expo-* 항목은 메타 문구용으로만 남는다)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticEntries = Object.keys(SEO)
    .filter((id) => !id.startsWith('expo-'))
    .map((id) => ({ url: `${SITE_URL}${routeOf(id)}`, lastModified, ...weightOf(id) }))

  const expoEntries = (await getExpoList()).map((e) => ({
    url: `${SITE_URL}/expo/${e.slug}`,
    lastModified,
    ...weightOf('expo-'),
  }))

  return [...staticEntries, ...expoEntries]
}
