import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/layout/PageShell'

/** 데모 404.html 과 동일하게 색인 제외 */
export const metadata: Metadata = {
  title: { absolute: '페이지를 찾을 수 없습니다 | 하늘숲홈케어' },
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <PageShell id="not-found">
      <section className="alt" style={{ minHeight: '70vh' }}>
        <div className="container">
          <div className="sec-head">
            <h2>페이지를 찾을 수 없습니다</h2>
            <p>주소가 변경되었거나 삭제된 페이지입니다.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link className="cta" href="/">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
