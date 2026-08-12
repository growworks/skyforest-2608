import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/PageShell'
import { ReviewSection } from '@/components/sections/ReviewSection'
import { CaseGallery } from '@/components/ui/CaseGallery'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, serviceLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'
import { getService, getServiceChild } from '@/lib/content'
import { SERVICES, SERVICE_KEYS, childSlug } from '@/lib/content/services'
import { img } from '@/lib/content/images'
import { SITE, SITE_URL } from '@/lib/constants'
import type { PriceTable, Service, ServiceChild } from '@/types/content'

export const revalidate = 600
export const dynamicParams = false

export async function generateStaticParams() {
  return SERVICE_KEYS.flatMap((service) =>
    SERVICES[service].children.map((c) => ({ service, child: childSlug(service, c) })),
  )
}

type Params = { params: Promise<{ service: string; child: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service, child: slug } = await params
  const s = await getService(service)
  const c = await getServiceChild(service, slug)
  if (!s || !c) return {}
  return pageMetadata(c.id, { image: img(c.img) })
}

const CHECK = (
  <svg viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

/* ── 가격 안내 (데모 subPriceHTML) ── */
function PriceSection({ p, child, cls }: { p: Service; child: ServiceChild; cls?: string }) {
  const pt: PriceTable | undefined = child.priceTable || p.priceTable
  const lead = child.priceLead || p.priceLead || '고객만족이 우선이기에 합리적인 가격을 제시합니다.'
  const note =
    child.priceNote || p.priceNote || '※ 현장 상태·시공 범위에 따라 최종 금액은 실측 후 확정됩니다.'

  let body: React.ReactNode
  if (child.priceImg) {
    body = (
      <div className="strip reveal" style={{ marginTop: 0 }}>
        <img src={img(child.priceImg)} alt={`${child.t} 단가표`} loading="lazy" />
      </div>
    )
  } else if (pt) {
    body = (
      <div style={{ overflowX: 'auto' }} className="reveal">
        <table className="price-table">
          <thead>
            <tr>
              {pt.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pt.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    body = (
      <div className="cs-strip reveal" style={{ marginTop: 0 }}>
        <span>정확한 단가는 전화 상담으로 안내드립니다</span>
        <b>고객센터 {SITE.tel}</b>
        <span>긴급 {SITE.telEmergency} · 평일 09:00-18:00</span>
      </div>
    )
  }

  return (
    <section className={cls}>
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="sec-head reveal" style={{ marginBottom: 36 }}>
          <h2>가격 안내</h2>
          <p>{lead}</p>
        </div>
        {body}
        {/* note 에 <br> 이 포함된 항목이 있어 데모와 동일하게 HTML 로 렌더한다 */}
        <p
          className="muted"
          style={{ fontSize: '.8rem', marginTop: 12 }}
          dangerouslySetInnerHTML={{ __html: note }}
        />
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link className="cta" href="/contact">
            무료 견적 상담 받기
          </Link>
        </div>
      </div>
    </section>
  )
}

export default async function ServiceChildPage({ params }: Params) {
  const { service, child: slug } = await params
  const p = await getService(service)
  const child = await getServiceChild(service, slug)
  if (!p || !child) notFound()

  /* 색상/샘플은 무펄줄눈만 별도 그리드, 나머지는 설명 스트립 하단에 이어붙임 */
  const sampleGrid = child.id === 'grout-nopearl'
  const stripImgs = [
    ...(child.strip || [...(child.tall || []), ...(child.certImgs || [])]),
    ...((!sampleGrid && child.samples) || []),
  ]
  const cases =
    child.caseList || [
      ...new Set([child.img, ...(child.gallery || p.gallery), ...p.gallery]),
    ]

  /* 데모와 동일하게 섹션을 먼저 모으고, 배경 교차(alt)를 뒤에서부터 역산한다 */
  const secs: Array<(cls: string | undefined) => React.ReactNode> = []

  // 1. 가격 안내
  secs.push((cls) => <PriceSection key="price" p={p} child={child} cls={cls} />)

  // 2. 왜 필요할까 + 설명자료 + 상세 통이미지
  secs.push((cls) => (
    <section className={cls} key="why">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="sec-head reveal" style={{ marginBottom: 24 }}>
          <h2>{child.t}, 왜 필요할까요?</h2>
        </div>
        <p
          className="muted reveal"
          style={{ fontSize: '1.02rem', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
        >
          {child.intro}
        </p>

        {!!child.explainImgs?.length && (
          <div className="explain-grid reveal">
            {child.explainImgs.map((s, i) => (
              <div
                className="cell"
                data-lbg={`exp-${child.id}`}
                data-lbs={s}
                data-lbc={`${child.t} 안내 자료`}
                key={s}
              >
                <img src={s} alt={`${child.t} 안내 자료 ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {!!stripImgs.length && (
          <div className="strip reveal">
            {stripImgs.map((k, i) => (
              <img
                src={img(k)}
                alt={`${child.t} 상세 안내 ${i + 1}`}
                loading="lazy"
                key={`${k}-${i}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  ))

  // 3. 청소서비스 공통 안내 4블록 (원본 홈페이지 레이아웃)
  if (p.infoBlocks) {
    secs.push((cls) => (
      <section className={cls} key="info">
        <div className="container" style={{ maxWidth: 1060 }}>
          <div className="sec-head reveal">
            <h2>하늘숲홈케어 {child.t}</h2>
            <p>모든 과정을 정해진 기준대로, 빠짐없이 진행합니다.</p>
          </div>
          <div className="iblock-grid">
            {p.infoBlocks!.map((b, bi) => (
              <div className={`iblock reveal${bi % 2 ? ' d1' : ''}`} key={b.t}>
                <div className="ib-head">
                  <span className="ib-badge">{CHECK}</span>
                  <h3>{b.t}</h3>
                  <span className="ib-sub">{b.s}</span>
                </div>
                <p className="ib-desc">{b.d}</p>
                <div className="ib-imgs">
                  {b.imgs.map((s) => (
                    <div
                      className="cell"
                      data-lbg={`info-${child.id}`}
                      data-lbs={s}
                      data-lbc={`${b.t} · ${b.s}`}
                      key={s}
                    >
                      <img src={s} alt={b.t} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ))
  }

  // 4. 컬러·샘플 그리드 (무펄줄눈 전용, 클릭 확대)
  if (sampleGrid && child.samples?.length) {
    secs.push((cls) => (
      <section className={cls} key="samples">
        <div className="container" style={{ maxWidth: 1020 }}>
          <div className="sec-head reveal">
            <h2>{child.samplesTitle || '컬러 · 샘플'}</h2>
            <p>클릭하면 크게 보입니다.</p>
          </div>
          <div className="sample-grid reveal">
            {child.samples!.map((s, i) => (
              <div
                className="cell"
                data-lbg={`smp-${child.id}`}
                data-lbs={s}
                data-lbc={child.samplesTitle || `${child.t} 샘플`}
                key={s}
              >
                <img src={s} alt={`${child.t} 샘플 ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ))
  }

  // 5. 시공 사례 — 원본 생생현장 풀 그대로, 4열 x 4행 + 더보기
  secs.push((cls) => (
    <section className={cls} key="cases">
      <div className="container">
        <div className="sec-head reveal">
          <h2>시공 사례</h2>
          <p>사진을 클릭하면 크게 보입니다.</p>
        </div>
        <CaseGallery childId={child.id} title={child.t} cases={cases} />
      </div>
    </section>
  ))

  const n = secs.length

  return (
    <PageShell id={child.id}>
      <JsonLd
        data={[
          serviceLd({
            name: child.t,
            description: child.intro || child.d,
            url: `${SITE_URL}/${service}/${slug}`,
            image: `${SITE_URL}${img(child.img)}`,
          }),
          breadcrumbLd([
            { name: '홈', url: '/' },
            { name: p.label, url: `/${service}` },
            { name: child.t, url: `/${service}/${slug}` },
          ]),
        ]}
      />

      <section className="sub-hero">
        <img className="bg" src={img(child.img)} alt={child.t} />
        <div className="veil"></div>
        <div className="inner">
          <div className="crumb">
            <Link href="/">홈</Link> · <Link href={`/${service}`}>{p.label}</Link> · {child.t}
          </div>
          <h1>{child.t}</h1>
          <p>{child.d}</p>
          {child.grade && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
              <span className="chip am" style={{ fontSize: '.78rem', padding: '4px 12px' }}>
                {child.grade}
              </span>
              <span
                className="chip"
                style={{
                  fontSize: '.78rem',
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,.12)',
                  borderColor: 'rgba(255,255,255,.3)',
                  color: '#fff',
                }}
              >
                {child.origin}
              </span>
            </div>
          )}
        </div>
      </section>

      {secs.map((fn, i) => fn((n - 1 - i) % 2 === 1 ? 'alt' : undefined))}

      <ReviewSection parentKey={service} label={child.t} child={child} />
    </PageShell>
  )
}
