import { REV_ITEMS, SVC_KO, revCap } from './reviews-manifest'
import type { TaggedReview } from '@/types/content'

/** 전체 후기 (매니페스트에서 파생) */
export const REVIEWS: TaggedReview[] = REV_ITEMS.map((it) => ({
  src: it.f,
  s: SVC_KO[it.svc],
  cap: revCap(),
}))

/**
 * 홈 마퀴용 후기 40장.
 * 서비스별로 라운드로빈해서 한 종류가 몰리지 않게 섞는다. (데모 HOME_REVIEWS 이식)
 */
export const HOME_REVIEWS: TaggedReview[] = (() => {
  const by: Record<string, TaggedReview[]> = {}
  REVIEWS.forEach((r) => {
    ;(by[r.s] = by[r.s] || []).push(r)
  })
  const keys = Object.keys(by)
  const out: TaggedReview[] = []
  let i = 0
  while (out.length < 40) {
    let added = false
    for (const k of keys) {
      const l = by[k]
      if (l[i]) {
        out.push(l[i])
        added = true
        if (out.length >= 40) break
      }
    }
    if (!added) break
    i++
  }
  return out
})()
