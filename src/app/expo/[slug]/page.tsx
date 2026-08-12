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
export const dynamicParams = false

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
  return pageMetadata(e.id, { image: img(e.cover) })
}

export default async function ExpoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const e = await getExpoItem(slug)
  if (!e) notFound()

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
