import { rf } from './images'
import type { ExpoItem } from '@/types/content'

/**
 * 박람회 현장 — 원본 홈페이지 실사진 + 현수막 근거 기반 제목.
 * 일자(dt)는 근거가 확실치 않아 전면 제거하고 장소·운영 서비스·현장 설명으로 구성한다.
 * slug 는 데모 id 에서 'expo-' 접두사를 뗀 값.
 */
export const EXPO: ExpoItem[] = [
  {id:'expo-olympicpark',slug:'olympicpark',nm:'올림픽파크 포레온 입주박람회',loc:'대형 전시홀',svc:'줄눈시공 · 케라폭시 · 아스팍톤 · 입주청소',
   desc:'올림픽파크 포레온 입주박람회 공식 참여 현장입니다. 케라폭시·아스팍톤 줄눈 자재를 실물로 비교해 보여드리고, 입주청소를 묶은 패키지 상담을 함께 진행했습니다.',
   cover:rf('20241010_b47face0a97db.jpg'),photos:[rf('20241010_b47face0a97db.jpg'),rf('20241010_ff9116a72037b.jpg')]},
  {id:'expo-osong',slug:'osong',nm:'오송역파라곤 센트럴시티 3차 입주행사',loc:'단지 커뮤니티 · 상가동',svc:'줄눈시공 · 케라폭시 · 무펄폴리',
   desc:'단지 실내 통로를 가득 채운 상담 인파 속에서 진행했습니다. MAPEI 케라폭시와 무펄폴리 컬러 샘플보드로 타일에 맞는 줄눈 색을 직접 골라 드렸습니다.',
   cover:rf('20241010_6103dedc86b92.jpg'),photos:[rf('20241010_6103dedc86b92.jpg'),rf('20241010_81e30d0b20ef3.jpg'),rf('20241010_06ed146acc39c.jpg'),rf('20241010_5cece0289c98b.jpg'),rf('20241010_9a4c74737e00f.jpg'),rf('20241010_b7e8d27125999.jpg')]},
  {id:'expo-eversky',slug:'eversky',nm:'에버스카이 입주박람회',loc:'실내체육관 (청북)',svc:'입주청소 · 줄눈시공 · 케라폭시',
   desc:'스타라이크 에보·빅라이언 등 프리미엄 줄눈 자재를 실물 그대로 진열했습니다. 관중석까지 이어진 대기 줄 속에서 상담 테이블을 풀가동한 현장입니다.',
   cover:rf('20251007_deedff105ca65.jpg'),photos:[rf('20251007_deedff105ca65.jpg'),rf('20251007_59f70d404feb2.jpg'),rf('20251007_7402f419156fe.jpg'),rf('20251007_eb9446d69ffbd.jpg'),rf('20251009_f347f2be290e7.jpg')]},
  {id:'expo-convention',slug:'convention',nm:'컨벤션홀 입주박람회',loc:'컨벤션홀',svc:'아스팍톤 · 케라폭시 · 입주청소',
   desc:'기둥형 라이트패널 부스에서 아스팍톤·케라폭시 줄눈과 입주청소 패키지를 안내했습니다. 상담원 세 명이 동시에 응대할 만큼 문의가 몰렸습니다.',
   cover:rf('20241114_51a9f9699c5ae.jpg'),photos:[rf('20241114_51a9f9699c5ae.jpg'),rf('20241114_5996a4be4a552.jpg'),rf('20241114_76ff050ba0047.jpg'),rf('20241114_685facc00bebd.jpg'),rf('20241114_fbe1373d41426.jpg')]},
  {id:'expo-gym',slug:'gym',nm:'실내체육관 입주박람회',loc:'실내체육관',svc:'홈케어 전 서비스',
   desc:'LX Z:IN 매장 앞자리에서 홈케어 전 서비스를 한 번에 상담했습니다. 줄눈·청소·코팅을 함께 계약하는 입주민이 많았던 현장입니다.',
   cover:rf('20241010_01a394055c931.jpg'),photos:[rf('20241010_01a394055c931.jpg'),rf('20241010_ad4267db0b174.jpg'),rf('20241010_f8d1655338361.jpg')]},
  {id:'expo-redcarpet',slug:'redcarpet',nm:'입주박람회 특설 부스',loc:'실내체육관 · 강당',svc:'입주청소 · 줄눈시공 · 케라폭시',
   desc:'레드카펫 특설 부스에 캐릭터 패널월을 세우고 줄눈 샘플을 진열했습니다. 새집증후군·공기수비대 부스와 나란히 운영한 현장입니다.',
   cover:rf('20251009_752e7c4aa89d1.jpg'),photos:[rf('20251009_752e7c4aa89d1.jpg'),rf('20251009_cabf838c9ec5b.jpg'),rf('20251009_23ae76da55580.jpg')]},
]

export function findExpo(slug: string): ExpoItem | undefined {
  return EXPO.find((e) => e.slug === slug)
}

/**
 * 제목 → slug 표.
 * 포트폴리오 API 에는 slug 를 담을 필드가 없어서(`link` 는 전 건 null),
 * 어드민에 "URL 주소"(custom.field_4)가 추가되기 전까지 **이미 색인된 6건의 URL** 을
 * 지키기 위한 매칭표다. field_4 가 채워지면 그쪽이 우선한다.
 */
const SLUG_BY_TITLE: Record<string, string> = Object.fromEntries(
  EXPO.map((e) => [e.nm, e.slug]),
)

export function slugForTitle(title: string): string | undefined {
  return SLUG_BY_TITLE[title.trim()]
}
