import { z } from 'zod'
import { CONTACT_LIMITS } from '@/lib/constants'

/**
 * 상담 폼 스키마 — 데모 formHTML() 필드에 대응.
 * (관심 서비스 다중선택 / 성함 / 연락처 / 평수 / 희망일자 / 주소 / 문의내용 / 개인정보 동의)
 *
 * 상담 API 서버는 name·phone 만 검증하므로 나머지 형식 검증은 클라이언트와 이 스키마가 담당한다.
 * 개인정보 동의는 화면 전용이라 API 로는 전송하지 않는다.
 */
export const contactSchema = z.object({
  services: z.array(z.string()).default([]),
  name: z
    .string({ error: '성함을 2자 이상 입력해주세요.' })
    .trim()
    .min(2, '성함을 2자 이상 입력해주세요.')
    .max(CONTACT_LIMITS.name),
  phone: z
    .string({ error: '연락처를 정확히 입력해주세요.' })
    .trim()
    .max(CONTACT_LIMITS.phone)
    .refine((v) => {
      const d = v.replace(/\D/g, '')
      return d.length >= 9 && d.length <= 11
    }, '연락처를 정확히 입력해주세요.'),
  area: z.string().trim().max(CONTACT_LIMITS.budget).optional().default(''),
  preferredDate: z.string().trim().max(20).optional().default(''),
  address: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
})

export type ContactInput = z.infer<typeof contactSchema>

/**
 * 화면 입력 → 상담 API 페이로드.
 *
 * 희망일자·주소는 별도 필드가 없어 message 에 라벨 줄로 붙인다.
 * **문의내용을 맨 앞에 두고 라벨 줄을 그 아래로** 놓는다 — 접수 알림이
 * `문의 내용:` 라벨 뒤에 message 를 그대로 붙이기 때문에, 라벨 줄이 앞에 오면
 * "문의 내용:" 바로 밑에 "희망일자: ..." 가 와서 어긋난다.
 * 값이 없는 줄은 넣지 않는다(빈 라벨이 알림에 그대로 나간다).
 */
export function toContactPayload(d: ContactInput) {
  const meta: string[] = []
  if (d.preferredDate) meta.push('희망일자: ' + d.preferredDate)
  if (d.address) meta.push('시공 주소: ' + d.address)

  return {
    name: d.name.slice(0, CONTACT_LIMITS.name),
    phone: d.phone.slice(0, CONTACT_LIMITS.phone),
    serviceType: d.services.join(', ').slice(0, CONTACT_LIMITS.serviceType),
    budget: d.area.slice(0, CONTACT_LIMITS.budget),
    message: [d.message, meta.join('\n')].filter(Boolean).join('\n\n'),
  }
}
