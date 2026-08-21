/**
 * 콘텐츠 파사드 (mock → API 교체 지점)
 *
 * 박람회 현장은 **포트폴리오 API 연동 완료**(src/lib/api/portfolios.ts).
 * 나머지(서비스·홈 섹션·후기)는 아직 데모에서 이식한 로컬 데이터를 반환한다.
 * 추가 연동 시에도 **이 파일의 함수 본문만** 교체하면 페이지/컴포넌트는 그대로다.
 * 캐시(ISR)는 각 페이지의 `export const revalidate` 로 제어.
 */
import { SERVICES, SERVICE_KEYS, findChild } from './services'
import { fetchExpoList } from '@/lib/api/portfolios'
import { GAL } from './gallery'
import { STEPS } from './process'
import { HOME_REVIEWS, REVIEWS } from './reviews'
import type {
  ExpoItem,
  GalleryItem,
  HomeStep,
  Service,
  ServiceChild,
  TaggedReview,
} from '@/types/content'

/* ────────────────────────────── 서비스 ────────────────────────────── */

export async function getServices(): Promise<Record<string, Service>> {
  return SERVICES
}

export async function getServiceKeys(): Promise<string[]> {
  return SERVICE_KEYS
}

export async function getService(key: string): Promise<Service | undefined> {
  return SERVICES[key]
}

export async function getServiceChild(
  key: string,
  slug: string,
): Promise<ServiceChild | undefined> {
  return findChild(key, slug)
}

/* ────────────────────────────── 박람회 ────────────────────────────── */

/** 포트폴리오 API(`category=박람회현장`) 연동. 장애 시 정적 데이터로 폴백한다. */
export async function getExpoList(): Promise<ExpoItem[]> {
  return fetchExpoList()
}

/** 상세 엔드포인트를 쓰지 않는다 — 목록 응답에 custom·images 가 모두 실려 있다. */
export async function getExpoItem(slug: string): Promise<ExpoItem | undefined> {
  const list = await fetchExpoList()
  return list.find((e) => e.slug === slug)
}

/* ──────────────────────────── 홈 섹션 ───────────────────────────── */

export async function getHomeGallery(): Promise<GalleryItem[]> {
  return GAL
}

export async function getHomeSteps(): Promise<HomeStep[]> {
  return STEPS
}

export async function getHomeReviews(): Promise<TaggedReview[]> {
  return HOME_REVIEWS
}

export async function getAllReviews(): Promise<TaggedReview[]> {
  return REVIEWS
}
