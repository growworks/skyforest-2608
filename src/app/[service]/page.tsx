import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/PageShell'
import { ReviewSection } from '@/components/sections/ReviewSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, serviceLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'
import { getService, getServiceKeys } from '@/lib/content'
import { childHref } from '@/lib/content/services'
import { img } from '@/lib/content/images'
import { SITE_URL } from '@/lib/constants'
import type { ServiceProcessStep } from '@/types/content'

export const revalidate = 600
export const dynamicParams = false

export async function generateStaticParams() {
  const keys = await getServiceKeys()
  return keys.map((service) => ({ service }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const s = await getService(service)
  if (!s) return {}
  return pageMetadata(service, { image: img(s.hero) })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  const s = await getService(service)
  if (!s) notFound()

  const mats = s.materials ?? []
  const hasMats = mats.length > 0
  const matGridCls = mats.length === 3 ? 'mat-grid cols3' : 'mat-grid'
  const isObjProc = typeof s.process[0] === 'object'
  const procCols = Math.min(s.process.length, 4)

  return (
    <PageShell id={service}>
      <JsonLd
        data={[
          serviceLd({
            name: s.title,
            description: s.lead,
            url: `${SITE_URL}/${service}`,
            image: `${SITE_URL}${img(s.hero)}`,
          }),
          breadcrumbLd([
            { name: '홈', url: '/' },
            { name: s.label, url: `/${service}` },
          ]),
        ]}
      />

      <section className="sub-hero">
        <img className="bg" src={img(s.hero)} alt={s.title} />
        <div className="veil"></div>
        <div className="inner">
          <div className="crumb">
            <Link href="/">홈</Link> · {s.label}
          </div>
          <h1>{s.title}</h1>
          <p>{s.lead}</p>
        </div>
      </section>

      <section className="proc alt">
        <div className="container">
          <div className="sec-head reveal">
            <h2>{s.procTitle || '시공 단계'}</h2>
            <p>단계별 관리로 하자를 원천 차단합니다.</p>
          </div>
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${procCols},1fr)`, gap: 14 }}
          >
            {s.process.map((p, i) => {
              const step = p as ServiceProcessStep
              const title = isObjProc ? step.t : (p as string)
              const im = isObjProc ? step.img : s.gallery[i % s.gallery.length]
              return (
                <div className="step" key={title}>
                  <div className="no">{'0' + (i + 1)}</div>
                  <h4 style={{ fontSize: '.95rem' }}>{title}</h4>
                  {isObjProc && <p className="p-desc">{step.d}</p>}
                  <div className="thumb">
                    <img src={img(im)} alt={title} loading="lazy" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {hasMats && (
        <section>
          <div className="container">
            <div className="sec-head reveal">
              <h2>검증된 자재·장비</h2>
              <p>안전성과 성능이 입증된 자재만 사용합니다.</p>
            </div>
            <div className={matGridCls}>
              {mats.map((m) => (
                <div className="mat reveal" key={m.n}>
                  <div className="top">
                    <div>
                      <span className="grade">{m.g}</span>
                      <h4>{m.n}</h4>
                    </div>
                    <span className="origin">{m.o}</span>
                  </div>
                  <div className="swatch">
                    <img src={img(m.img || 'mat-generic')} alt={m.n} loading="lazy" />
                  </div>
                  <ul>
                    {m.f.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={hasMats ? 'alt' : undefined}>
        <div className="container" style={{ maxWidth: 1020 }}>
          <div className="sec-head reveal">
            {s.matChildren ? (
              <>
                <h2>프리미엄 자재 {s.children.length}종</h2>
                <p>
                  공간과 취향에 맞는 자재를 선택하세요. 자재별 상세 페이지에서 특징을 확인할 수
                  있습니다.
                </p>
              </>
            ) : (
              <>
                <h2>{s.label} 세부 서비스</h2>
                <p>공간과 목적에 맞는 세부 서비스를 선택하세요.</p>
              </>
            )}
          </div>

          <div className={s.children.length >= 4 ? 'cards4' : 'cards3'}>
            {s.children.map((c) => (
              <Link
                className="info-card sub-card reveal"
                href={childHref(service, c)}
                key={c.id}
              >
                <div className="im">
                  <img src={img(c.img)} alt={c.t} loading="lazy" />
                </div>
                <div className="txt">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  {c.grade && (
                    <div className="chips">
                      <span className="chip am">{c.grade}</span>
                      <span className="chip">{c.origin}</span>
                    </div>
                  )}
                  <span className="more">자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>

          {s.note && (
            <div
              style={{
                background: 'var(--accent-soft)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: 10,
                padding: '14px 18px',
                marginTop: 26,
                fontSize: '.9rem',
              }}
            >
              {s.note}
            </div>
          )}
        </div>
      </section>

      <section className={hasMats ? undefined : 'alt'}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>시공 갤러리</h2>
            <p>사진을 클릭하면 크게 보입니다.</p>
          </div>
          <div className="gal" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {s.gallery.map((g, i) => (
              <div
                className="cell"
                data-lbg={`gal-${service}`}
                data-lbs={img(g)}
                data-lbc={`${s.label} 시공 현장`}
                key={`${g}-${i}`}
              >
                <img src={img(g)} alt={`${s.label} 시공사진`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewSection parentKey={service} label={s.label} />
    </PageShell>
  )
}
