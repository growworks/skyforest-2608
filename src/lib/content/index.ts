/**
 * 콘텐츠 파사드 (mock → API 교체 지점)
 *
 * 현재는 데모에서 이식한 로컬 목데이터를 그대로 반환한다.
 * admin API 명세가 확정되면 **이 파일의 함수 본문만** apiFetch 호출로 교체하면 되고
 * 페이지/컴포넌트는 건드리지 않는다. 캐시(ISR)는 각 페이지의 `export const revalidate` 로 제어.
 *
 * 교체 예시:
 *   export async function getExpoList() {
 *     return apiFetch<ExpoItem[]>('/expos', { next: { revalidate: 600, tags: ['expo'] } })
 *   }
 */
import { SERVICES, SERVICE_KEYS, findChild } from './services'
import { EXPO, findExpo } from './expo'
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

export async function getExpoList(): Promise<ExpoItem[]> {
  return EXPO
}

export async function getExpoItem(slug: string): Promise<ExpoItem | undefined> {
  return findExpo(slug)
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
