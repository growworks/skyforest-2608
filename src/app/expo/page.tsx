import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'
import { getExpoList } from '@/lib/content'
import { IMG, img } from '@/lib/content/images'

export const revalidate = 600

export const metadata: Metadata = pageMetadata('expo')

export default async function ExpoListPage() {
  const list = await getExpoList()

  return (
    <PageShell id="expo">
      <JsonLd
        data={breadcrumbLd([
          { name: '홈', url: '/' },
          { name: '박람회 현장', url: '/expo' },
        ])}
      />

      <section className="sub-hero">
        <img className="bg" src={IMG['expo-hero']} alt="박람회 상담 현장" />
        <div className="veil"></div>
        <div className="inner">
          <h1>박람회 현장</h1>
          <p>
            수많은 입주 박람회에서 공식 지정업체로 선정되며 검증된 실력과 신뢰를 현장에서 직접
            보여드리고 있습니다.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 1040 }}>
          <div className="expo-list" id="expoList">
            {list.map((e, i) => (
              <Link
                className={`expo-card reveal${i % 2 ? ' d1' : ''}`}
                href={`/expo/${e.slug}`}
                key={e.slug}
              >
                <div className="im">
                  <img src={img(e.cover)} alt={e.nm} loading="lazy" />
                </div>
                <div className="txt">
                  <h3>{e.nm}</h3>
                  <div className="meta">
                    <span className="chip am">{e.loc}</span>
                  </div>
                  <p>{e.desc}</p>
                  <p className="expo-svc">운영 서비스 · {e.svc}</p>
                  <span className="more">현장 자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
