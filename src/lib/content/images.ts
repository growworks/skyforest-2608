/**
 * 이미지 매니페스트 — 데모 index.html 의 IMG 블록 verbatim.
 *
 * public/images 자산은 전부 WebP 로 변환돼 있다(scripts/optimize-images.mjs).
 * 데이터는 데모와 대조하기 쉽도록 **원본 확장자를 그대로 두고**, 경로 매핑은 여기 한 곳에서만 한다.
 */

const P = '/images/placeholder/'
const R = '/images/real/'

/**
 * 로컬 자산 경로의 .jpg/.png → .webp (이미 .webp 면 그대로).
 *
 * **`/images/` 로 시작하는 경로에만 적용한다.** API 가 주는 원격 URL(S3 등)까지 바꾸면
 * 존재하지 않는 파일을 가리키게 된다.
 */
export const toWebp = (p: string): string =>
  p.startsWith('/images/') ? p.replace(/\.(jpe?g|png)$/i, '.webp') : p

/** 원본 홈페이지 카피본 실사진 (thumbnail_ 프리픽스) */
export const rf = (f: string): string => toWebp(R + 'thumbnail_' + f)

const RAW_IMG: Record<string, string> = {
  'logo-brand':P+'logo_brand.png',
  'logo-white':rf('20260629_53529c20efbf8.png'),
  'hero-a':rf('20251007_0feb20b8de61d.jpg'),
  'hero-b':rf('20240528_1d9df369517e2.jpg'),
  'hero-c':rf('20260304_1cfc0ca06cbcb.jpg'),
  'card-cleaning':rf('20240529_cccce275d2161.jpg'),
  'card-grout':rf('20240529_6833666038f3e.jpg'),
  'card-nano':rf('20240529_3e39b81c54e85.jpg'),
  'card-elastic':rf('20251021_466abc3f783ce.jpg'),
  'about-hero':rf('20240513_46c64a9336182.jpg'),
  'about-team':rf('20260823_about-team.jpg'), /* 2026-08-23 고객 교체본 (원본 카피본 아님) */
  'about-ceo':rf('20260514_696ca0da02608.jpg'),
  'org':rf('20260902_org.jpg'), /* 2026-09-02 고객 교체본 (원본 카피본 아님) */
  'award':rf('20260317_911f025dd6005.jpg'),
  'expo-hero':rf('20241010_5cece0289c98b.jpg'),
  'expo-intro':rf('20241010_d363a7da00e54.png'),
  'proc-1':rf('20241114_fbe1373d41426.jpg'),'proc-2':rf('20251007_6e34d243c4d9b.png'),'proc-3':rf('20241012_14a5694aa1082.jpg'),'proc-4':rf('20240530_f9a367fbab853.jpg'),'proc-5':rf('20251007_410b951cea7ac.jpg'),
  'mat-generic':P+'img_material.jpg',
  'g-cleaning':rf('20240529_cccce275d2161.jpg'),'g-grout':rf('20240530_f07baa498a19e.jpg'),'g-coating':rf('20240514_311e4c5e0428b.jpg'),'g-elastic':rf('20250819_af54fbd7369c4.jpg'),'g-hero1':rf('20240528_41a3cb97095b8.jpg'),'g-hero2':rf('20240530_f9a367fbab853.jpg'),'g-material':rf('20240514_9b1f5b9614034.jpg'),
}

/** placeholder 항목까지 포함해 전부 WebP 경로로 정규화 */
export const IMG: Record<string, string> = Object.fromEntries(
  Object.entries(RAW_IMG).map(([k, v]) => [k, toWebp(v)]),
)

/** 매니페스트 키면 실경로로, 이미 경로면 그대로 돌려준다. */
export function img(k?: string): string {
  return toWebp(IMG[k ?? ''] || k || '')
}
