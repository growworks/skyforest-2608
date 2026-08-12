import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/seo/metadata'
import { PageShell } from '@/components/layout/PageShell'
import { Hero } from '@/components/sections/Hero'
import { Counters } from '@/components/sections/Counters'
import { ContactForm } from '@/components/forms/ContactForm'
import { ReviewMarquee } from '@/components/ui/ReviewMarquee'
import { getHomeGallery, getHomeReviews, getHomeSteps } from '@/lib/content'
import { IMG, img } from '@/lib/content/images'
import { HOME_SERVICE_CARDS } from '@/lib/constants'

/** 콘텐츠 갱신 주기 (admin API 연동 후에도 이 값이 ISR 주기가 된다) */
export const revalidate = 600

export const metadata: Metadata = pageMetadata('home')

export default async function HomePage() {
  const [steps, gal, reviews] = await Promise.all([
    getHomeSteps(),
    getHomeGallery(),
    getHomeReviews(),
  ])

  return (
    <PageShell id="home">
      <Hero />

      <section>
        <div className="container">
          <div className="sec-head reveal">
            <h2>프리미엄 홈케어 서비스</h2>
            <p>입주에 필요한 모든 시공을 최고 수준으로 제공합니다.</p>
          </div>
          <div className="svc-grid">
            {HOME_SERVICE_CARDS.map((c, i) => (
              <Link
                className={`svc reveal${i ? ` d${i}` : ''}`}
                href={c.href}
                key={c.href}
              >
                <img src={IMG[c.k]} alt={c.t} />
                <div className="veil"></div>
                <div className="body">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="more">자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="proc alt">
        <div className="container">
          <div className="sec-head reveal">
            <h2>믿을 수 있는 시공 프로세스</h2>
            <p>상담부터 AS 이력등록까지, 단계별 관리로 하자를 원천 차단합니다.</p>
          </div>
          <div className="grid reveal" id="procGrid">
            {steps.map((s) => (
              <div className="step" key={s[0]}>
                <div className="no">{s[0]}</div>
                <h4>{s[1]}</h4>
                <div className="thumb">
                  <img src={img(s[2])} alt={s[1]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gal-sec">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 20,
              marginBottom: 8,
            }}
            className="reveal"
          >
            <div>
              <h2 style={{ fontSize: 'clamp(1.65rem,3vw,2.3rem)' }}>생생한 시공 현장</h2>
              <p className="muted" style={{ marginTop: 8 }}>
                결과로 증명하는 하늘숲홈케어의 실력입니다. 사진을 클릭하면 크게 보입니다.
              </p>
            </div>
          </div>
          <div className="gal reveal" id="gal">
            {gal.map((g, i) => (
              <div
                className="cell"
                data-t={g.t}
                data-lbg="home-gal"
                data-lbs={img(g.k)}
                data-lbc={`${g.t} 시공 현장`}
                key={`${g.k}-${i}`}
              >
                <img src={img(g.k)} alt={`${g.t} 시공`} loading="lazy" />
                <span className="tag">{g.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="sec-head reveal" style={{ marginBottom: 28 }}>
            <h2>고객님이 직접 증명합니다</h2>
            <p>조작 없는 100% 실제 후기 · 클릭하면 크게 보입니다</p>
          </div>
        </div>
        <ReviewMarquee list={reviews} gid="home-rev" />
      </section>

      <section>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-side reveal">
              <h2>상담 문의</h2>
              <p className="muted">
                관심 서비스를 모두 선택해주세요.
                <br />
                담당 지부장이 빠르게 연락드립니다.
              </p>
              <Counters />
            </div>
            <ContactForm className="form-card reveal d1" />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
