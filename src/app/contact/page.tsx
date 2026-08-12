import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { ContactForm } from '@/components/forms/ContactForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('contact')

export default function ContactPage() {
  return (
    <PageShell id="contact">
      <JsonLd
        data={breadcrumbLd([
          { name: '홈', url: '/' },
          { name: '상담 문의', url: '/contact' },
        ])}
      />
      <section className="alt" style={{ minHeight: '80vh' }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>상담 문의</h2>
            <p>100% 지부장 책임 시공으로 완벽한 결과를 약속합니다.</p>
          </div>
          <ContactForm className="form-card reveal" />
        </div>
      </section>
    </PageShell>
  )
}
