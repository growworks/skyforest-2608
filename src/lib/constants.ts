/**
 * 사이트 전역 상수 — 하늘숲홈케어
 * (연락처·사업자정보 등 콘텐츠의 단일 출처)
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skyforestclean.com'

/**
 * GrowWorks Public API.
 * 상담신청 엔드포인트는 `${API_BASE_URL}/v1/${SITE_SLUG}/contact` 로 조립된다.
 * slug 는 어드민에 등록된 **skyforest** (사이트 도메인 skyforestclean.com 과 다름에 주의).
 */
export const API_BASE_URL = process.env.API_BASE_URL || 'https://api.growworks.co.kr'
export const SITE_SLUG = process.env.SITE_SLUG || 'skyforest'

export const SITE = {
  brand: '하늘숲홈케어',
  tagline: '100% 지부장체제, 하청 없는 완벽한 시공',
  ceo: '서선미',
  founded: '2020',
  bizNo: '663-72-00303',
  address: '경기 광주시 목현동 133-6',
  email: 'skyforest_clean@naver.com',
  tel: '1577-3965',
  telHref: 'tel:1577-3965',
  telEmergency: '010-9798-2223',
  hours: '평일 09:00 - 18:00 · 주말/공휴일 휴무',
} as const

/** 네이버 서치어드바이저 소유확인 */
export const NAVER_SITE_VERIFICATION = '90f11fc570ee0b15ba14730a9dd6e6623d5e5d39'

/** 공유 미리보기 이미지 (1200x630) */
export const OG_IMAGE = '/og-image.jpg'

/** 상담 폼 관심 서비스 체크박스 (데모 SVC_OPTIONS) */
export const CONTACT_SERVICES = [
  '입주청소',
  '줄눈시공',
  '나노코팅',
  '새집증후군',
  '탄성코트',
] as const

/**
 * 상담신청 API 필드 길이 제한.
 * 서버가 초과 시 400 이 아니라 500 을 반환할 수 있어 전송 전에 잘라 보낸다.
 */
export const CONTACT_LIMITS = {
  name: 100,
  phone: 50,
  serviceType: 255,
  budget: 100,
} as const

/** 홈 카운터 (원본 근거 없는 시안 예시 수치 — 실수치 확보 시 교체) */
export const HOME_COUNTERS = [
  { n: 12500, suf: '+', lab: '누적 시공건수' },
  { n: 12, suf: '개', lab: '전국 전문 지부장' },
  { n: 24, suf: '종', lab: '검증된 최고급 자재' },
] as const

/** 홈 상단 서비스 카드 4종 (라벨이 SERVICES 와 달라 별도 보관 — 데모 원문 유지) */
export const HOME_SERVICE_CARDS = [
  { href: '/cleaning', k: 'card-cleaning', t: '청소서비스', d: '신축·이사·새집증후군 완벽 케어' },
  { href: '/grout', k: 'card-grout', t: '프리미엄 줄눈', d: '최고급 자재 8종으로 곰팡이·물때 원천 차단' },
  { href: '/nano', k: 'card-nano', t: '나노/논슬립 코팅', d: '오염방지와 미끄럼방지를 동시에' },
  { href: '/elastic', k: 'card-elastic', t: '기능성 탄성코트', d: '결로·곰팡이 방지 프리미엄 도장' },
] as const
