/**
 * 사이트 콘텐츠 타입 — 데모 index.html 의 데이터 블록 형태를 그대로 옮긴 것.
 * 필드명(t/d/s/g/n/o/f …)은 데모 원본을 유지해 이식 diff 를 최소화한다.
 * 추후 admin API 연동 시 이 타입이 응답 스키마의 기준이 된다.
 */

/** 가격 표 (head = 열 제목, rows = 행) */
export interface PriceTable {
  head: string[]
  rows: string[][]
}

/** 하위(서브의 서브) 서비스 — 예: 케라폭시, 논슬립코팅 */
export interface ServiceChild {
  id: string
  /** 제목 */
  t: string
  /** 한 줄 설명 */
  d: string
  /** 대표 이미지 (IMG 키 또는 경로) */
  img: string
  /** 자재 등급 뱃지 */
  grade?: string
  /** 원산지 뱃지 */
  origin?: string
  /** "왜 필요할까요?" 본문 */
  intro?: string
  /** 시공 범위 항목 (현재 화면 미노출, 데이터는 보존) */
  scope?: string[]
  priceTable?: PriceTable
  /** 표 대신 원본 단가 이미지를 쓰는 경우 */
  priceImg?: string
  priceLead?: string
  priceNote?: string
  /** 인증서·시험성적서 이미지 */
  certImgs?: string[]
  /** 원본 상세 통이미지 */
  tall?: string[]
  /** 컬러·샘플 이미지 */
  samples?: string[]
  samplesTitle?: string
  /** 인포그래픽 그리드 (새집증후군 등) */
  explainImgs?: string[]
  gallery?: string[]

  /* ── 파생 필드 (services.ts 에서 주입) ── */
  /** 원본 생생현장 풀 */
  caseList?: string[]
  /** 원본 본문 설명이미지 시퀀스 */
  strip?: string[]
  /** 내용 분류상 일치하는 후기 */
  revList?: ReviewCard[]
}

/** 검증된 자재·장비 카드 */
export interface ServiceMaterial {
  /** 분류 */
  g: string
  /** 자재명 */
  n: string
  /** 원산지/구분 */
  o: string
  /** 특징 목록 */
  f: string[]
  img?: string
}

/** 청소서비스 안내 4블록 (원본 홈페이지 레이아웃) */
export interface ServiceInfoBlock {
  t: string
  s: string
  d: string
  imgs: string[]
}

/** 이미지·설명이 붙는 프로세스 단계 */
export interface ServiceProcessStep {
  t: string
  d: string
  img: string
}

/** 부모 서비스 — 청소서비스 / 줄눈시공 / 나노코팅 / 탄성코트 */
export interface Service {
  label: string
  title: string
  /** 히어로 이미지 (IMG 키) */
  hero: string
  /** 후기 필터용 한글 태그 */
  tag: string
  lead: string
  /** GNB 메가드롭다운 설명 */
  navDesc: string
  /** true 면 라인업 제목을 "프리미엄 자재 N종" 으로 표기 */
  matChildren?: boolean
  note?: string
  priceLead?: string
  priceNote?: string
  procTitle?: string
  infoBlocks?: ServiceInfoBlock[]
  materials?: ServiceMaterial[]
  children: ServiceChild[]
  /** 문자열 배열이면 제목만, 객체 배열이면 설명·이미지까지 렌더 */
  process: Array<string | ServiceProcessStep>
  priceTable?: PriceTable
  gallery: string[]
}

/** 후기 매니페스트 항목 */
export interface RevItem {
  /** 파일 경로 */
  f: string
  /** 서비스 코드 (cleaning/grout/nano/elastic) */
  svc: string
  /** 디테일 코드 */
  det: string
}

/** 마퀴에 렌더되는 후기 카드 */
export interface ReviewCard {
  src: string
  cap: string
}

/** 서비스 태그가 붙은 후기 카드 (홈 마퀴 구성용) */
export interface TaggedReview extends ReviewCard {
  /** 한글 서비스 태그 */
  s: string
}

/** 홈 갤러리 셀 */
export interface GalleryItem {
  /** 한글 태그 */
  t: string
  /** 이미지 경로 */
  k: string
}

/** 홈 프로세스 단계 [번호, 제목, 이미지키] */
export type HomeStep = [string, string, string]

/** 박람회 현장 (일자는 근거 부족으로 표기하지 않는다) */
export interface ExpoItem {
  /** 데모 원본 id — SEO 테이블 키와 동일 */
  id: string
  /** 라우팅 세그먼트 */
  slug: string
  /** 박람회명 */
  nm: string
  /** 장소 */
  loc: string
  /** 운영 서비스 */
  svc: string
  desc: string
  cover: string
  photos: string[]
}
