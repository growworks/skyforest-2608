import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { ZoomChip } from '@/components/ui/ZoomChip'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'
import { IMG } from '@/lib/content/images'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata('about')

const cards = [
  { t: '100% 직영 시공', d: '하청 없이 본사에서 직접 검증한 지부장들이 책임지고 시공합니다.' },
  { t: '친환경 인증 자재', d: '안전성이 입증된 최고급 친환경 자재만을 엄선하여 사용합니다.' },
  { t: '철저한 사후 관리', d: '시공 후에도 안심할 수 있는 체계적인 AS 시스템을 운영합니다.' },
]

export default function AboutPage() {
  return (
    <PageShell id="about">
      <JsonLd
        data={breadcrumbLd([
          { name: '홈', url: '/' },
          { name: '회사소개', url: '/about' },
        ])}
      />

      <section className="sub-hero" style={{ padding: '88px 0' }}>
        <img className="bg" src={IMG['about-hero']} alt="회사소개" />
        <div className="veil"></div>
        <div className="inner">
          <h1>하늘숲홈케어</h1>
          <p>
            100% 지부장체제, 하청 없는 완벽한 시공. 고객님의 소중한 공간을 가장 아름답고 쾌적하게
            만들어 드립니다.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div
            className="ph reveal"
            style={{ borderRadius: 24, aspectRatio: '21/9', marginBottom: 32 }}
          >
            <img src={IMG['about-team']} alt="하늘숲홈케어 워크샵 단체사진" />
          </div>
          <h3 className="reveal" style={{ fontSize: '1.8rem', marginBottom: 14 }}>
            오직 고객님의 만족만을 생각합니다.
          </h3>
          <p className="muted reveal">
            하늘숲홈케어는 2020년 창립하여 줄눈시공·입주청소·나노코팅·새집증후군·탄성코트를
            전문으로 하는 홈케어 전문 기업입니다. 100% 소속 지부장 체계로만 운영하며, 안전하고
            피부에 자극적이지 않은 친환경제만 사용하여 차별화된 기술과 지속성으로 보답합니다.
          </p>
          <div className="cards3" style={{ marginTop: 36 }}>
            {cards.map((c, i) => (
              <div
                className={`reveal${i ? ` d${i}` : ''}`}
                key={c.t}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  padding: 28,
                  textAlign: 'center',
                }}
              >
                <h4 style={{ marginBottom: 8 }}>{c.t}</h4>
                <p className="muted" style={{ fontSize: '.9rem' }}>
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="sec-head reveal" style={{ marginBottom: 40 }}>
            <h2>대표 인사말</h2>
          </div>
          <div className="ceo-grid">
            <div className="ph reveal" style={{ borderRadius: 18, aspectRatio: '3/4' }}>
              <img src={IMG['about-ceo']} alt="하늘숲홈케어 대표 서선미" />
            </div>
            <div>
              <h3 className="reveal" style={{ fontSize: '1.6rem', marginBottom: 18 }}>
                {'"진심을 다하는 시공, 결과로 증명하겠습니다."'}
              </h3>
              <p className="muted reveal" style={{ marginBottom: 12 }}>
                안녕하십니까, 하늘숲홈케어 대표 서선미입니다.
              </p>
              <p className="muted reveal" style={{ marginBottom: 12 }}>
                저희 하늘숲홈케어는 2020년 창립하여{' '}
                <b style={{ color: 'var(--ink)' }}>줄눈·청소·나노코팅·새집증후군을 전문</b>으로 하고
                있습니다. <b style={{ color: 'var(--ink)' }}>100% 소속 지점 체계로만 운영</b>되며,
                안전하고 피부에 자극적이지 않은 친환경제만 사용하여 차별화된 기술과 지속성으로 임하고
                있습니다.
              </p>
              <p className="muted reveal" style={{ marginBottom: 12 }}>
                고객의 입장에서 고객을 먼저 생각하기에 정직하고 성실하게, 고객 한 분 한 분 정성을
                다해 노력하겠습니다.{' '}
                <b style={{ color: 'var(--accent-t)' }}>
                  소중한 우리 가족 보금자리, 하늘숲홈케어가 최선을 다해 지켜드리겠습니다.
                </b>
              </p>
              <p className="reveal" style={{ fontWeight: 800, marginTop: 16 }}>
                하늘숲홈케어 대표 서선미 올림
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="sec-head reveal" style={{ marginBottom: 36 }}>
            <h2>수상 · 신뢰</h2>
            <p>2026 Korea Consumer Awards 수상 등 고객이 인정한 서비스 품질입니다.</p>
          </div>
          <div
            className="ph reveal"
            style={{ borderRadius: 20, aspectRatio: '16/9', maxWidth: 860, margin: '0 auto' }}
          >
            <img src={IMG['award']} alt="2026 Korea Consumer Awards 시상식 단체 기념사진" />
          </div>
          <p
            className="muted reveal"
            style={{ textAlign: 'center', fontSize: '.8rem', marginTop: 14 }}
          >
            2026 Korea Consumer Awards 시상식
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="sec-head reveal" style={{ marginBottom: 36 }}>
            <h2>100% 지부장 책임 시공 체제</h2>
            <p>
              전국 100% 각 지역 지부장으로 운영하며 하청·외주가 없습니다. 인정받은 기술력의 실력
              있는 팀장님만 선별해 직영팀으로 구성하고, 개선을 위해 매달 회의와 교육을 실시하고
              있습니다.
            </p>
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div
              className="tall-wrap reveal"
              style={{ background: '#fff' }}
              data-lbg="org"
              data-lbc="하늘숲홈케어 공식 조직도"
            >
              <img
                src={IMG['org']}
                alt="하늘숲홈케어 조직도 — 서선미 CEO 및 CS고객관리·줄눈시공·입주청소·나노코팅·새집증후군·탄성코트 부문"
              />
              <ZoomChip />
            </div>
            <p
              className="muted reveal"
              style={{ textAlign: 'center', fontSize: '.8rem', marginTop: 14 }}
            >
              하늘숲홈케어 공식 조직도
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
