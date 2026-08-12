import { OG_IMAGE, SITE, SITE_URL } from '@/lib/constants'
import { IMG } from '@/lib/content/images'

/** 사이트 공통 조직 정보 (데모 index.html 의 JSON-LD 이식) */
export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}#organization`,
  name: SITE.brand,
  alternateName: '하늘숲클린',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${IMG['logo-brand']}`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description:
    '줄눈시공·입주청소·나노코팅·새집증후군·탄성코트 전문. 100% 지부장 직영 책임시공.',
  telephone: `+82-${SITE.tel}`,
  email: SITE.email,
  foundingDate: SITE.founded,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '경기도',
    addressLocality: '광주시',
    streetAddress: '목현동 133-6',
  },
  areaServed: { '@type': 'Country', name: '대한민국' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '홈케어 시공 서비스',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '입주청소' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '줄눈시공' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '나노코팅' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '새집증후군 케어' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '탄성코트' } },
    ],
  },
}

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.brand,
  url: `${SITE_URL}/`,
  inLanguage: 'ko-KR',
  publisher: { '@id': `${SITE_URL}#organization` },
}

/** 서비스 페이지용 Service 스키마 */
export function serviceLd(opts: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: { '@type': 'Country', name: '대한민국' },
  }
}

/** 빵부스러기 */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  }
}
