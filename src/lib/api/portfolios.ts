import { z } from 'zod'
import { apiFetch } from './client'
import { EXPO as FALLBACK_EXPO, slugForTitle } from '@/lib/content/expo'
import type { ExpoItem } from '@/types/content'

/**
 * 박람회 현장 = 포트폴리오 카테고리 `박람회현장` (카테고리 id 17)
 *
 * 명세: growworks-web-admin/docs/api/openapi-skyforest.yaml
 *  - 목록 응답에 custom·images 가 모두 실려 있어 **상세 엔드포인트를 쓰지 않는다**
 *    (`/portfolios/{id}` 는 정수 id 만 받고, 문자 slug 를 넘기면 404 가 아니라 500)
 *  - `thumbnailUrl` 은 `images` 에 포함되지 않는다 → 사진 배열은 `[thumbnailUrl, ...images]`
 *  - `custom` 은 값이 비면 키 자체가 빠지므로 항상 옵셔널로 접근
 */

/** 카테고리 이름이 정확히 일치해야 한다. 어드민에서 이름을 바꾸면 목록이 비어버린다. */
const CATEGORY = '박람회현장'

const portfolioSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  category: z.string().nullish(),
  thumbnailUrl: z.string().nullish(),
  images: z.array(z.string()).nullish(),
  link: z.string().nullish(),
  custom: z
    .object({
      /** 라벨은 "서브타이틀" 이지만 실제로는 현장 설명 문단 */
      field_1: z.string().optional(),
      /** 장소 */
      field_2: z.string().optional(),
      /** 운영 서비스 (` · ` 구분) */
      field_3: z.string().optional(),
      /** URL 주소 — 어드민에 추가되면 이 값이 라우팅 slug 가 된다 */
      field_4: z.string().optional(),
    })
    .passthrough()
    .nullish(),
  sortOrder: z.number().nullish(),
  createdAt: z.string(),
})

const listSchema = z.object({
  items: z.array(portfolioSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

type Portfolio = z.infer<typeof portfolioSchema>

/**
 * 라우팅 slug 결정 순서
 *  1. `custom.field_4` (어드민에 "URL 주소" 필드를 추가하면 여기가 진실 소스가 된다)
 *  2. 제목 → 기존 slug 표 (이미 색인된 /expo/olympicpark 등 6건 URL 을 지키기 위함)
 *  3. 정수 id (신규 항목인데 field_4 가 비어 있는 경우의 최후 수단)
 */
function resolveSlug(p: Portfolio): string {
  const custom = p.custom?.field_4?.trim()
  if (custom) return custom
  return slugForTitle(p.title) ?? String(p.id)
}

function toExpoItem(p: Portfolio): ExpoItem {
  const slug = resolveSlug(p)
  const cover = p.thumbnailUrl ?? ''
  // thumbnailUrl 은 images 에 없다. 합친 뒤 혹시 모를 중복만 제거한다.
  const photos = [...new Set([cover, ...(p.images ?? [])].filter(Boolean))]

  return {
    // SEO 테이블 키·DOM id 와 형식을 맞춘다 (expo-olympicpark …)
    id: `expo-${slug}`,
    apiId: p.id,
    slug,
    nm: p.title,
    loc: p.custom?.field_2 ?? '',
    svc: p.custom?.field_3 ?? '',
    desc: p.custom?.field_1 ?? '',
    cover,
    photos,
  }
}

/**
 * 박람회 현장 목록.
 *
 * API 장애 시 사이트가 통째로 죽지 않도록 이식 당시의 정적 데이터로 폴백한다
 * (내용이 API 와 동일하게 등록돼 있다). 폴백이 돌면 서버 로그에 남는다.
 * 폴백 없이 빌드를 실패시키고 싶다면 이 catch 를 제거하면 된다.
 */
export async function fetchExpoList(): Promise<ExpoItem[]> {
  try {
    const data = await apiFetch<unknown>(
      `/portfolios?category=${encodeURIComponent(CATEGORY)}&limit=100`,
      { next: { revalidate: 600, tags: ['expo'] } },
    )
    const parsed = listSchema.parse(data)
    const items = parsed.items.filter((p) => p.category === CATEGORY).map(toExpoItem)
    if (!items.length) {
      console.error('[expo] API 가 빈 목록을 반환했습니다. 카테고리 이름 변경 여부를 확인하세요.')
      return FALLBACK_EXPO
    }
    return items
  } catch (err) {
    console.error('[expo] 포트폴리오 조회 실패 — 정적 데이터로 폴백합니다.', err)
    return FALLBACK_EXPO
  }
}
