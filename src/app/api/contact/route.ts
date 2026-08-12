import { NextRequest, NextResponse } from 'next/server'
import { contactSchema, toContactPayload } from '@/lib/validations'
import { API_BASE_URL, SITE_SLUG } from '@/lib/constants'

/**
 * 상담신청 프록시 → GrowWorks Public API
 * `POST ${API_BASE_URL}/v1/${SITE_SLUG}/contact` (slug=skyforest, 인증 없음)
 *
 * 명세 주의사항 (skyforest-demo/DEPLOY.md):
 *  - `Content-Type: application/json` 헤더 필수 (누락 시 400 이 아니라 500)
 *  - 서버는 name·phone 만 검증 → 나머지 필수값·형식 검증은 이쪽에서 수행
 *  - 길이 초과 시 400 이 아니라 500 이 될 수 있어 전송 전 절단 (toContactPayload)
 *  - 성공 판정은 201 + {success:true}, 실패 분기는 error **코드** (message 는 바뀔 수 있음)
 *  - attachments 는 미사용 (첨부 도입 시 /upload 선호출 후 [{url,name}] 객체 배열로 전송)
 *
 * 브라우저가 아니라 서버에서 호출하므로 CORS 허용 목록과 무관하다.
 */
export async function POST(request: NextRequest) {
  let parsed
  try {
    const body = (await request.json()) as Record<string, unknown>
    parsed = contactSchema.safeParse(body)
  } catch {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json(
      { error: 'VALIDATION', message: first?.message ?? '입력값을 다시 확인해주세요.' },
      { status: 400 },
    )
  }

  const payload = toContactPayload(parsed.data)

  if (process.env.CONTACT_API_MOCK === 'true') {
    console.log('[Contact Submission · MOCK]', JSON.stringify(payload, null, 2))
    return NextResponse.json({ success: true })
  }

  try {
    const res = await fetch(`${API_BASE_URL}/v1/${SITE_SLUG}/contact`, {
      method: 'POST',
      // 한글이 깨지지 않도록 문자열을 그대로 넘겨 런타임이 UTF-8 로 인코딩하게 둔다.
      // (charset 파라미터를 덧붙이면 서버가 Content-Type 을 못 알아볼 수 있어 명세 표기 그대로 사용)
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    let data: { success?: boolean; error?: string; message?: string } = {}
    try {
      data = (await res.json()) as typeof data
    } catch {
      /* 본문이 JSON 이 아닐 수 있다 */
    }

    if (res.status === 201 && data.success) {
      return NextResponse.json({ success: true })
    }

    if (data.error === 'VALIDATION') {
      return NextResponse.json({ error: 'VALIDATION', message: data.message }, { status: 400 })
    }

    console.error('[Contact API Error]', res.status, JSON.stringify(data))
    return NextResponse.json({ error: 'UPSTREAM' }, { status: 502 })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json({ error: 'NETWORK' }, { status: 502 })
  }
}
