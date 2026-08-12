/**
 * 데모(skyforest-demo/index.html)의 데이터 블록을 src/lib/content/*.ts 로 추출한다.
 *
 *   node scripts/extract-content.mjs
 *
 * 손으로 옮기면 오타가 나므로 항상 이 스크립트로 뽑는다. 값은 무변경이 원칙이고,
 * 아래 두 가지만 보정한다.
 *   1) REV_PROV 경로 앞 슬래시 — 데모에는 빠져 있어 REV_ITEMS 와 키가 어긋난다(출처 매칭 무효화)
 *   2) EXPO 에 라우팅용 slug 부여 (데모 id 'expo-olympicpark' → 'olympicpark')
 *
 * !! 주의 !!
 * 데모의 **줄 번호에 의존**한다. 데모가 갱신되면 아래 L(...) 인자를 다시 맞춰야 한다.
 * (grep -n "^const SERVICES={" 등으로 확인)
 * 마지막 확인 기준: 2026-08-07 데모 (정적 배포본).
 *
 * 이미지 확장자는 원본(.jpg/.png) 그대로 둔다. WebP 매핑은 src/lib/content/images.ts 의
 * toWebp() 한 곳에서만 처리한다.
 */
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'D:/projectClaude/skyforest-demo/index.html'
const OUT = 'D:/projectClaude/skyforestclean/src/lib/content'

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/)
const L = (a, b) => lines.slice(a - 1, b).join('\n')
const rhs = (n, name) => L(n, n).replace(new RegExp('^const ' + name + '='), '').replace(/;$/, '')

/** 데모 REV_PROV 는 REV_ITEMS 와 달리 선행 슬래시가 빠져 있어 맞춰준다 */
const fixPaths = (s) =>
  s.replaceAll("'images/reviews/", "'/images/reviews/").replaceAll('"images/reviews/', '"/images/reviews/')

fs.mkdirSync(OUT, { recursive: true })

/* ────────────── images.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'images.ts'),
  `/**
 * 이미지 매니페스트 — 데모 index.html 의 IMG 블록 verbatim.
 */

const P = '/images/placeholder/'
const R = '/images/real/'

/** 원본 홈페이지 카피본 실사진 (thumbnail_ 프리픽스) */
export const rf = (f: string): string => R + 'thumbnail_' + f

export const IMG: Record<string, string> = {
${L(614, 632)}
}

/** 매니페스트 키면 실경로로, 이미 경로면 그대로 돌려준다. */
export function img(k?: string): string {
  return IMG[k ?? ''] || k || ''
}
`,
  'utf8',
)

/* ────────────── case-pools.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'case-pools.ts'),
  `import { rf } from './images'

/** 원본 홈페이지 "생생현장" 이미지 풀 — 페이지별 순서 그대로 */
export const CASE_POOLS: Record<string, string[]> = {
${L(695, 704)}
}
`,
  'utf8',
)

/* ────────────── strips.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'strips.ts'),
  `import { rf } from './images'

/**
 * 원본 본문 설명이미지 시퀀스(페이지 순서 그대로).
 * 서브페이지에서 여백 없이 이어붙인 세로 스트립으로 렌더된다.
 */
export const STRIPS: Record<string, string[]> = {
${L(716, 730)}
}
`,
  'utf8',
)

/* ────────────── reviews-manifest.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'reviews-manifest.ts'),
  `import type { RevItem } from '@/types/content'

/** 후기 캡션 — 제품명 대신 통일 표기 (데모 revCap 이식) */
export const revCap = (): string => '하늘숲홈케어 후기'

/** 서비스 코드 → 한글 태그 */
export const SVC_KO: Record<string, string> = ${rhs(708, 'SVC_KO')}

/** 디테일 코드 → 한글 라벨 */
export const DET_KO: Record<string, string> = ${rhs(709, 'DET_KO')}

/**
 * 원본 홈페이지에서 해당 페이지에 실제로 게재돼 있던 후기(출처).
 * NOTE: 데모 원본은 여기만 선행 슬래시가 빠져 있어 REV_ITEMS 와 키가 어긋난다(= 출처 매칭 무효화).
 *       이식하면서 경로를 맞춰 원래 의도대로 동작시킨다.
 */
export const REV_PROV: Record<string, string[]> = ${fixPaths(rhs(711, 'REV_PROV'))}

/**
 * 후기 이미지 단일 소스 — public/images/reviews 를 내용 기반으로 분류한 매니페스트.
 * 신규 후기는 폴더에 파일을 추가하고 이 배열에 항목을 추가한다.
 */
export const REV_ITEMS: RevItem[] = ${rhs(712, 'REV_ITEMS')}
`,
  'utf8',
)

/* ────────────── services.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'services.ts'),
  `import { rf } from './images'
import { CASE_POOLS } from './case-pools'
import { STRIPS } from './strips'
import { REV_ITEMS, REV_PROV, revCap } from './reviews-manifest'
import type { PriceTable, RevItem, Service, ServiceChild } from '@/types/content'

/* ============ 줄눈 단가 2계열 (원본 홈페이지 게시 기준) ============ */
export const GROUT_STD_PRICE: PriceTable = ${rhs(735, 'GROUT_STD_PRICE')}
export const GROUT_PREM_PRICE: PriceTable = ${rhs(736, 'GROUT_PREM_PRICE')}
export const GROUT_STD_NOTE = ${rhs(737, 'GROUT_STD_NOTE')}
export const GROUT_PREM_NOTE = ${rhs(738, 'GROUT_PREM_NOTE')}

/* ============ 서비스 데이터 (부모 4 + 하위 18) ============ */
export const SERVICES: Record<string, Service> = {
${L(740, 908)}
}

/* 시공사례: 원본 페이지별 생생현장 풀 그대로 매핑 */
const CASE_MAP: Record<string, string> = ${rhs(912, 'CASE_MAP')}

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const k = CASE_MAP[c.id]
    if (k && CASE_POOLS[k]) c.caseList = CASE_POOLS[k]
    if (STRIPS[c.id] && STRIPS[c.id].length) c.strip = STRIPS[c.id]
  }),
)

/* 후기: 내용 일치 → 원본 게재 페이지(출처) → 같은 서비스 순으로 매핑 */
const CHILD_REV: Record<string, [string, string]> = ${rhs(916, 'CHILD_REV')}

const REV_BY_FILE = new Map<string, RevItem>(REV_ITEMS.map((it) => [it.f, it]))

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const m = CHILD_REV[c.id]
    if (!m) return
    const seen = new Set<string>()
    const pick = (arr: (RevItem | undefined)[]): RevItem[] =>
      arr.filter((it): it is RevItem => !!it && it.svc === m[0] && !seen.has(it.f) && (seen.add(it.f), true))
    const exact = pick(REV_ITEMS.filter((it) => it.det === m[1]))
    const fromPage = pick((REV_PROV[c.id] || []).map((f) => REV_BY_FILE.get(f)))
    const same = pick(REV_ITEMS)
    const list = [...exact, ...fromPage, ...same].slice(0, 24)
    if (list.length) c.revList = list.map((it) => ({ src: it.f, cap: revCap() }))
  }),
)

/** 부모 서비스 키 목록 (GNB / 라우팅 순서) */
export const SERVICE_KEYS = Object.keys(SERVICES)

/** 'cleaning-new' → 'new' (라우트 세그먼트) */
export function childSlug(parentKey: string, child: ServiceChild): string {
  return child.id.slice(parentKey.length + 1)
}

/** 하위 서비스 링크 */
export function childHref(parentKey: string, child: ServiceChild): string {
  return \`/\${parentKey}/\${childSlug(parentKey, child)}\`
}

/** 라우트 세그먼트로 하위 서비스 조회 */
export function findChild(parentKey: string, slug: string): ServiceChild | undefined {
  return SERVICES[parentKey]?.children.find((c) => childSlug(parentKey, c) === slug)
}
`,
  'utf8',
)

/* ────────────── gallery.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'gallery.ts'),
  `import { rf } from './images'
import type { GalleryItem } from '@/types/content'

/** 홈 갤러리 — 원본 홈페이지 실사진 */
export const GAL: GalleryItem[] = [
${L(935, 946)}
]
`,
  'utf8',
)

/* ────────────── expo.ts ────────────── */
// 데모 id 'expo-olympicpark' → 라우트 세그먼트 'olympicpark'
const expoBody = L(951, 968).replace(/\{id:'expo-([a-z]+)',/g, (_m, s) => `{id:'expo-${s}',slug:'${s}',`)
if ((expoBody.match(/slug:'/g) || []).length !== 6) throw new Error('EXPO slug 매칭 실패')

fs.writeFileSync(
  path.join(OUT, 'expo.ts'),
  `import { rf } from './images'
import type { ExpoItem } from '@/types/content'

/**
 * 박람회 현장 — 원본 홈페이지 실사진 + 현수막 근거 기반 제목.
 * 일자(dt)는 근거가 확실치 않아 전면 제거하고 장소·운영 서비스·현장 설명으로 구성한다.
 * slug 는 데모 id 에서 'expo-' 접두사를 뗀 값.
 */
export const EXPO: ExpoItem[] = [
${expoBody}
]

export function findExpo(slug: string): ExpoItem | undefined {
  return EXPO.find((e) => e.slug === slug)
}
`,
  'utf8',
)

/* ────────────── process.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'process.ts'),
  `import type { HomeStep } from '@/types/content'

/** 홈 "믿을 수 있는 시공 프로세스" 5단계 */
export const STEPS: HomeStep[] = ${rhs(972, 'STEPS')}
`,
  'utf8',
)

/* ────────────── seo.ts (페이지별 SEO 단일 소스) ────────────── */
const seoBody = L(642, 673)
fs.writeFileSync(
  path.join(OUT, 'seo.ts'),
  `/**
 * 페이지별 SEO 단일 소스 — 데모 index.html 의 SEO 테이블에서 추출.
 * key = 데모 page id, p = 경로, t = <title>, d = meta description.
 * 라우트가 늘어나면 여기에 항목을 추가하면 sitemap·metadata 가 함께 갱신된다.
 *
 * !! 운영 반영분이 있으니 scripts/extract-content.mjs 로 통째로 덮어쓰지 말 것 !!
 *   - 'home': 타이틀·설명에 "새집증후군" 추가 (2026-08-07, 네이버 노출 확인 후)
 *     데모는 아직 이 항목이 없다. 재추출 시 이 줄을 다시 반영할 것.
 */
export interface SeoEntry {
  /** 경로 (끝 슬래시 포함, 데모 표기 그대로) */
  p: string
  /** 페이지 타이틀 (브랜드 접미사 포함 완성형) */
  t: string
  /** meta description */
  d: string
}

export const SEO: Record<string, SeoEntry> = {
${seoBody}
}

/** 끝 슬래시를 제거한 Next 라우트 경로 ('/' 는 그대로) */
export function routeOf(id: string): string {
  const p = SEO[id]?.p ?? '/'
  return p === '/' ? '/' : p.replace(/\\/$/, '')
}
`,
  'utf8',
)

console.log('generated:', fs.readdirSync(OUT).join(', '))
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'D:/projectClaude/skyforest-demo/index.html'
const OUT = 'D:/projectClaude/skyforestclean/src/lib/content'

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/)
const L = (a, b) => lines.slice(a - 1, b).join('\n')
const rhs = (n, name) => L(n, n).replace(new RegExp('^const ' + name + '='), '').replace(/;$/, '')

/** 데모 REV_PROV 는 REV_ITEMS 와 달리 선행 슬래시가 빠져 있어 맞춰준다 */
const fixPaths = (s) =>
  s.replaceAll("'images/reviews/", "'/images/reviews/").replaceAll('"images/reviews/', '"/images/reviews/')

fs.mkdirSync(OUT, { recursive: true })

/* ────────────── images.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'images.ts'),
  `/**
 * 이미지 매니페스트 — 데모 index.html 의 IMG 블록 verbatim.
 */

const P = '/images/placeholder/'
const R = '/images/real/'

/** 원본 홈페이지 카피본 실사진 (thumbnail_ 프리픽스) */
export const rf = (f: string): string => R + 'thumbnail_' + f

export const IMG: Record<string, string> = {
${L(614, 632)}
}

/** 매니페스트 키면 실경로로, 이미 경로면 그대로 돌려준다. */
export function img(k?: string): string {
  return IMG[k ?? ''] || k || ''
}
`,
  'utf8',
)

/* ────────────── case-pools.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'case-pools.ts'),
  `import { rf } from './images'

/** 원본 홈페이지 "생생현장" 이미지 풀 — 페이지별 순서 그대로 */
export const CASE_POOLS: Record<string, string[]> = {
${L(695, 704)}
}
`,
  'utf8',
)

/* ────────────── strips.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'strips.ts'),
  `import { rf } from './images'

/**
 * 원본 본문 설명이미지 시퀀스(페이지 순서 그대로).
 * 서브페이지에서 여백 없이 이어붙인 세로 스트립으로 렌더된다.
 */
export const STRIPS: Record<string, string[]> = {
${L(716, 730)}
}
`,
  'utf8',
)

/* ────────────── reviews-manifest.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'reviews-manifest.ts'),
  `import type { RevItem } from '@/types/content'

/** 후기 캡션 — 제품명 대신 통일 표기 (데모 revCap 이식) */
export const revCap = (): string => '하늘숲홈케어 후기'

/** 서비스 코드 → 한글 태그 */
export const SVC_KO: Record<string, string> = ${rhs(708, 'SVC_KO')}

/** 디테일 코드 → 한글 라벨 */
export const DET_KO: Record<string, string> = ${rhs(709, 'DET_KO')}

/**
 * 원본 홈페이지에서 해당 페이지에 실제로 게재돼 있던 후기(출처).
 * NOTE: 데모 원본은 여기만 선행 슬래시가 빠져 있어 REV_ITEMS 와 키가 어긋난다(= 출처 매칭 무효화).
 *       이식하면서 경로를 맞춰 원래 의도대로 동작시킨다.
 */
export const REV_PROV: Record<string, string[]> = ${fixPaths(rhs(711, 'REV_PROV'))}

/**
 * 후기 이미지 단일 소스 — public/images/reviews 를 내용 기반으로 분류한 매니페스트.
 * 신규 후기는 폴더에 파일을 추가하고 이 배열에 항목을 추가한다.
 */
export const REV_ITEMS: RevItem[] = ${rhs(712, 'REV_ITEMS')}
`,
  'utf8',
)

/* ────────────── services.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'services.ts'),
  `import { rf } from './images'
import { CASE_POOLS } from './case-pools'
import { STRIPS } from './strips'
import { REV_ITEMS, REV_PROV, revCap } from './reviews-manifest'
import type { PriceTable, RevItem, Service, ServiceChild } from '@/types/content'

/* ============ 줄눈 단가 2계열 (원본 홈페이지 게시 기준) ============ */
export const GROUT_STD_PRICE: PriceTable = ${rhs(735, 'GROUT_STD_PRICE')}
export const GROUT_PREM_PRICE: PriceTable = ${rhs(736, 'GROUT_PREM_PRICE')}
export const GROUT_STD_NOTE = ${rhs(737, 'GROUT_STD_NOTE')}
export const GROUT_PREM_NOTE = ${rhs(738, 'GROUT_PREM_NOTE')}

/* ============ 서비스 데이터 (부모 4 + 하위 18) ============ */
export const SERVICES: Record<string, Service> = {
${L(740, 908)}
}

/* 시공사례: 원본 페이지별 생생현장 풀 그대로 매핑 */
const CASE_MAP: Record<string, string> = ${rhs(912, 'CASE_MAP')}

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const k = CASE_MAP[c.id]
    if (k && CASE_POOLS[k]) c.caseList = CASE_POOLS[k]
    if (STRIPS[c.id] && STRIPS[c.id].length) c.strip = STRIPS[c.id]
  }),
)

/* 후기: 내용 일치 → 원본 게재 페이지(출처) → 같은 서비스 순으로 매핑 */
const CHILD_REV: Record<string, [string, string]> = ${rhs(916, 'CHILD_REV')}

const REV_BY_FILE = new Map<string, RevItem>(REV_ITEMS.map((it) => [it.f, it]))

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const m = CHILD_REV[c.id]
    if (!m) return
    const seen = new Set<string>()
    const pick = (arr: (RevItem | undefined)[]): RevItem[] =>
      arr.filter((it): it is RevItem => !!it && it.svc === m[0] && !seen.has(it.f) && (seen.add(it.f), true))
    const exact = pick(REV_ITEMS.filter((it) => it.det === m[1]))
    const fromPage = pick((REV_PROV[c.id] || []).map((f) => REV_BY_FILE.get(f)))
    const same = pick(REV_ITEMS)
    const list = [...exact, ...fromPage, ...same].slice(0, 24)
    if (list.length) c.revList = list.map((it) => ({ src: it.f, cap: revCap() }))
  }),
)

/** 부모 서비스 키 목록 (GNB / 라우팅 순서) */
export const SERVICE_KEYS = Object.keys(SERVICES)

/** 'cleaning-new' → 'new' (라우트 세그먼트) */
export function childSlug(parentKey: string, child: ServiceChild): string {
  return child.id.slice(parentKey.length + 1)
}

/** 하위 서비스 링크 */
export function childHref(parentKey: string, child: ServiceChild): string {
  return \`/\${parentKey}/\${childSlug(parentKey, child)}\`
}

/** 라우트 세그먼트로 하위 서비스 조회 */
export function findChild(parentKey: string, slug: string): ServiceChild | undefined {
  return SERVICES[parentKey]?.children.find((c) => childSlug(parentKey, c) === slug)
}
`,
  'utf8',
)

/* ────────────── gallery.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'gallery.ts'),
  `import { rf } from './images'
import type { GalleryItem } from '@/types/content'

/** 홈 갤러리 — 원본 홈페이지 실사진 */
export const GAL: GalleryItem[] = [
${L(935, 946)}
]
`,
  'utf8',
)

/* ────────────── expo.ts ────────────── */
// 데모 id 'expo-olympicpark' → 라우트 세그먼트 'olympicpark'
const expoBody = L(951, 968).replace(/\{id:'expo-([a-z]+)',/g, (_m, s) => `{id:'expo-${s}',slug:'${s}',`)
if ((expoBody.match(/slug:'/g) || []).length !== 6) throw new Error('EXPO slug 매칭 실패')

fs.writeFileSync(
  path.join(OUT, 'expo.ts'),
  `import { rf } from './images'
import type { ExpoItem } from '@/types/content'

/**
 * 박람회 현장 — 원본 홈페이지 실사진 + 현수막 근거 기반 제목.
 * 일자(dt)는 근거가 확실치 않아 전면 제거하고 장소·운영 서비스·현장 설명으로 구성한다.
 * slug 는 데모 id 에서 'expo-' 접두사를 뗀 값.
 */
export const EXPO: ExpoItem[] = [
${expoBody}
]

export function findExpo(slug: string): ExpoItem | undefined {
  return EXPO.find((e) => e.slug === slug)
}
`,
  'utf8',
)

/* ────────────── process.ts ────────────── */
fs.writeFileSync(
  path.join(OUT, 'process.ts'),
  `import type { HomeStep } from '@/types/content'

/** 홈 "믿을 수 있는 시공 프로세스" 5단계 */
export const STEPS: HomeStep[] = ${rhs(972, 'STEPS')}
`,
  'utf8',
)

/* ────────────── seo.ts (페이지별 SEO 단일 소스) ────────────── */
const seoBody = L(642, 673)
fs.writeFileSync(
  path.join(OUT, 'seo.ts'),
  `/**
 * 페이지별 SEO 단일 소스 — 데모 index.html 의 SEO 테이블에서 추출.
 * key = 데모 page id, p = 경로, t = <title>, d = meta description.
 * 라우트가 늘어나면 여기에 항목을 추가하면 sitemap·metadata 가 함께 갱신된다.
 *
 * !! 운영 반영분이 있으니 scripts/extract-content.mjs 로 통째로 덮어쓰지 말 것 !!
 *   - 'home': 타이틀·설명에 "새집증후군" 추가 (2026-08-07, 네이버 노출 확인 후)
 *     데모는 아직 이 항목이 없다. 재추출 시 이 줄을 다시 반영할 것.
 */
export interface SeoEntry {
  /** 경로 (끝 슬래시 포함, 데모 표기 그대로) */
  p: string
  /** 페이지 타이틀 (브랜드 접미사 포함 완성형) */
  t: string
  /** meta description */
  d: string
}

export const SEO: Record<string, SeoEntry> = {
${seoBody}
}

/** 끝 슬래시를 제거한 Next 라우트 경로 ('/' 는 그대로) */
export function routeOf(id: string): string {
  const p = SEO[id]?.p ?? '/'
  return p === '/' ? '/' : p.replace(/\\/$/, '')
}
`,
  'utf8',
)

console.log('generated:', fs.readdirSync(OUT).join(', '))
