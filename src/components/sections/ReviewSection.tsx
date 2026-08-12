import { ReviewMarquee } from '@/components/ui/ReviewMarquee'
import { SERVICES } from '@/lib/content/services'
import { HOME_REVIEWS, REVIEWS } from '@/lib/content/reviews'
import type { ReviewCard, ServiceChild } from '@/types/content'

/**
 * 데모 reviewSectionHTML() 이식.
 * 내용 분류상 일치하는 후기가 있으면 그것을, 없으면 같은 서비스 후기를,
 * 그마저 없으면(나노·탄성 등) 제목을 일반화하고 홈 후기를 보여준다.
 */
export function ReviewSection({
  parentKey,
  label,
  child,
}: {
  parentKey: string
  label: string
  child?: ServiceChild
}) {
  const p = SERVICES[parentKey]
  let list: ReviewCard[]
  let gid: string
  let heading: string

  if (child?.revList) {
    list = child.revList.slice(0, 24)
    gid = 'rev-' + child.id
    heading = label + ' 고객 후기'
  } else {
    const same = REVIEWS.filter((r) => r.s === p.tag)
    heading = same.length ? label + ' 고객 후기' : '하늘숲홈케어 고객 후기'
    list = same.length ? same : HOME_REVIEWS.slice(0, 16)
    gid = 'rev-' + (child ? child.id : parentKey)
  }

  return (
    <section className="rev alt" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="sec-head reveal" style={{ marginBottom: 36 }}>
          <h2>{heading}</h2>
          <p>조작 없는 100% 실제 후기 · 클릭하면 크게 보입니다</p>
        </div>
      </div>
      <ReviewMarquee list={list} gid={gid} />
    </section>
  )
}
