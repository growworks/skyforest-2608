import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'
import { getExpoItem, getExpoList } from '@/lib/content'
import { img } from '@/lib/content/images'

export const revalidate = 600
// 어드민에서 박람회를 새로 추가하면 재빌드 없이도 첫 요청 때 렌더된다.
// (false 로 두면 빌드 시점 목록에 없는 slug 는 무조건 404)
export const dynamicParams = true

export async function generateStaticParams() {
  const list = await getExpoList()
  return list.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const e = await getExpoItem(slug)
  if (!e) return {}
  // SEO 테이블에 없는 신규 항목은 API 값으로 title·description 을 만든다
  return pageMetadata(e.id, {
    image: img(e.cover),
    fallback: { path: `/expo/${e.slug}`, title: e.nm, description: e.desc },
  })
}

export default async function ExpoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // 목록 한 번만 조회해서 현재 항목과 앞/뒤 항목을 함께 구한다.
  // (galleries API 는 상세 엔드포인트가 없어 목록에서 찾는 구조와도 맞는다)
  const list = await getExpoList()
  const idx = list.findIndex((x) => x.slug === slug)
  if (idx === -1) notFound()

  const e = list[idx]
  const prev = list[idx - 1]
  const next = list[idx + 1]

  return (
    <PageShell id={e.id}>
      <JsonLd
        data={breadcrumbLd([
          { name: '홈', url: '/' },
          { name: '박람회 현장', url: '/expo' },
          { name: e.nm, url: `/expo/${e.slug}` },
        ])}
      />

      <section className="sub-hero">
        <img className="bg" src={img(e.cover)} alt={e.nm} />
        <div className="veil"></div>
        <div className="inner">
          <div className="crumb">
            <Link href="/">홈</Link> · <Link href="/expo">박람회 현장</Link> · {e.nm}
          </div>
          <h1>{e.nm}</h1>
          <p>{e.desc}</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="expo-info reveal">
            <div className="box">
              <b>{e.loc}</b>
              <span>장소</span>
            </div>
            <div className="box">
              <b>{e.svc}</b>
              <span>운영 서비스</span>
            </div>
          </div>

          <div className="gal reveal" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {e.photos.map((k, i) => (
              <div
                className="cell"
                data-lbg={`expo-${e.id}`}
                data-lbs={img(k)}
                data-lbc={e.nm}
                key={`${k}-${i}`}
              >
                <img src={img(k)} alt={`${e.nm} 현장 사진`} loading="lazy" />
              </div>
            ))}
          </div>

          {(prev || next) && (
            <nav className="expo-nav reveal" aria-label="박람회 현장 둘러보기">
              {prev && (
                <Link className="item prev" href={`/expo/${prev.slug}`}>
                  <span className="thumb">
                    <img src={img(prev.cover)} alt="" loading="lazy" />
                  </span>
                  <span className="txt">
                    <span className="dir">← 이전 현장</span>
                    <span className="ttl">{prev.nm}</span>
                  </span>
                </Link>
              )}
              {next && (
                <Link className="item next" href={`/expo/${next.slug}`}>
                  <span className="thumb">
                    <img src={img(next.cover)} alt="" loading="lazy" />
                  </span>
                  <span className="txt">
                    <span className="dir">다음 현장 →</span>
                    <span className="ttl">{next.nm}</span>
                  </span>
                </Link>
              )}
            </nav>
          )}

          <div className="back-strip reveal">
            <Link className="cta ghost" href="/expo">
              ← 박람회 목록으로
            </Link>
            <Link className="cta" href="/contact" style={{ marginLeft: 8 }}>
              상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
