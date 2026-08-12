import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { SEO, routeOf } from '@/lib/content/seo'

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
 * sitemap 은 SEO 테이블에서 파생된다.
 * 라우트를 추가하면 src/lib/content/seo.ts 에 항목만 넣으면 metadata·sitemap 이 함께 갱신된다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return Object.keys(SEO).map((id) => ({
    url: `${SITE_URL}${routeOf(id)}`,
    lastModified,
    ...weightOf(id),
  }))
}
