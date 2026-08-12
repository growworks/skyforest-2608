import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Fab } from '@/components/layout/Fab'
import { Lightbox } from '@/components/layout/Lightbox'
import { RevealObserver } from '@/components/layout/RevealObserver'
import { JsonLd } from '@/components/seo/JsonLd'
import { ORGANIZATION_LD, WEBSITE_LD } from '@/lib/seo/jsonld'
import { SEO } from '@/lib/content/seo'
import { NAVER_SITE_VERIFICATION, OG_IMAGE, SITE, SITE_URL } from '@/lib/constants'
import './globals.css'

const home = SEO['home']

export const metadata: Metadata = {
  // 각 페이지는 pageMetadata() 로 title.absolute 를 넣으므로 template 은 예외 상황 대비용
  title: { default: home.t, template: `%s | ${SITE.brand}` },
  description: home.d,
  applicationName: SITE.brand,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/favicon.png', type: 'image/png' }] },
  robots: { index: true, follow: true },
  verification: {
    other: { 'naver-site-verification': NAVER_SITE_VERIFICATION },
  },
  other: { 'theme-color': '#00C3FF' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE.brand,
    url: `${SITE_URL}/`,
    title: home.t,
    description: home.d,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE.brand }],
  },
  twitter: {
    card: 'summary_large_image',
    title: home.t,
    description: home.d,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Fab />
        <Lightbox />
        <RevealObserver />
      </body>
    </html>
  )
}
