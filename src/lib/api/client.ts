import { API_BASE_URL, SITE_SLUG } from '@/lib/constants'

/**
 * GrowWorks 공개 API 공통 래퍼 — `${API_BASE_URL}/v1/${SITE_SLUG}{path}` 로 요청한다.
 * (slug 는 `skyforest`. 도메인 skyforestclean.com 과 다르니 주의)
 *
 * 인증이 없고 GET 은 모든 오리진에 개방돼 있지만, 서버 컴포넌트에서 호출해
 * ISR 캐시(next.revalidate/tags)를 태운다.
 *
 * 명세 주의사항 (docs/api/openapi-skyforest.yaml):
 *  - 요청에 `Content-Type: application/json` 이 없으면 400 이 아니라 500
 *  - 에러 분기는 `message` 가 아니라 `error` **코드**로 (VALIDATION / SITE_NOT_FOUND / ... )
 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type FetchInit = RequestInit & { next?: { revalidate?: number; tags?: string[] } }

export async function apiFetch<T = unknown>(path: string, init: FetchInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/v1/${SITE_SLUG}${path}`

  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  })

  if (!res.ok) {
    let code = 'HTTP_' + res.status
    let message = res.statusText
    try {
      const body = (await res.json()) as { error?: string; message?: string }
      if (body.error) code = body.error
      if (body.message) message = body.message
    } catch {
      /* 본문이 JSON 이 아닐 수 있다 */
    }
    throw new ApiError(res.status, code, `${code}: ${message} (${url})`)
  }

  return res.json() as Promise<T>
}
