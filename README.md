# 하늘숲홈케어 (skyforestclean)

`skyforest-demo/index.html` (컨펌 완료된 단일 파일 데모)를 **Next.js 16 App Router + ISR** 로 100% 이식한 운영 프로젝트.
구조·패턴은 `erum-inc` 기준.

- 도메인: **https://skyforestclean.com**
- 개발 서버: `npm run dev` → http://localhost:3427
- Next 빌드: `npm run build:next` · 로컬 실행: `npm start` · 린트: `npm run lint`
- Cloudflare 배포 빌드: `npm run build` (= `opennextjs-cloudflare build`) — 아래 §9 참조

---

## 1. 이식 원칙

| 항목 | 방침 |
|---|---|
| CSS | `src/app/globals.css` = 데모 `<style>` 블록 **verbatim**. 파일 하단 "이식 보정" 3줄만 추가 |
| 마크업 | 데모 템플릿 함수(`detailHTML` / `subDetailHTML` / `expoDetailHTML` / `formHTML` …)가 만들던 DOM 을 JSX 로 1:1 재현 |
| 데이터 | 데모 JS 데이터 블록을 스크립트로 추출해 `src/lib/content/*.ts` 로 이동 (값 무변경) |
| 이미지 | 데모 930장을 가져와 WebP 로 변환 → **929장 / 133MB** (아래 참조) |
| 라우팅 | 데모의 `.page` 토글 → 실제 라우트 32개 |

### 검증 방법 (재실행 가능)

데모 `<script>` 를 Node `vm` + DOM 스텁으로 실행해 각 페이지 HTML 을 생성하고, Next SSR 결과와
노드 단위(클래스 시퀀스 / 텍스트 / `src` / `data-lbg`·`data-lbs`·`data-lbc`)로 비교한다.

**마크업 기준 32p 중 26p 완전 일치.** 남은 차이는 전부 의도된 것이다.

### 데모와 의도적으로 다른 부분

| # | 항목 | 내용 |
|---|---|---|
| 1 | 헤더 로고 | `<a class="logo-link">` 로 감쌈(홈 링크 크롤링용). `display:flex` 보정으로 픽셀 동일 |
| 2 | 줄눈 하위 6p 후기 | 데모 `REV_PROV` 경로 버그 수정 (아래) |
| 3 | 홈 SEO | 타이틀·description 에 "새집증후군" 추가 (2026-08-07) |
| 4 | 새집증후군 설명 패널 | 5열 → **1열 가로 전체**, 이미지 1장 교체 (아래) |

> **2. 데모 버그 수정**: 데모의 `REV_PROV`(페이지별 원본 게재 후기 출처)만 경로 앞 슬래시가 빠져 있어
> `REV_ITEMS` 와 키가 어긋난다. 그 결과 "원본 게재 페이지 후기 우선" 매칭이 통째로 무효화되고
> 줄눈 하위 6p(아스팍샤인·무펄·케라폭시·스타라이크·푸가리테·빅라이언)가 일반 줄눈 후기만 노출한다.
> 이식하면서 경로를 맞춰 원래 의도대로 동작시켰다 (`src/lib/content/reviews-manifest.ts` 주석 참조).
> 데모 쪽도 동일하게 고치면 두 결과가 다시 일치한다.

> **4. 새집증후군 설명 패널** (`/cleaning/sick` 의 `.explain-grid`, 이 페이지 전용):
> 데모는 5열이라 278px 폭 원본이 ~161px 로 축소돼 본문 글씨를 읽을 수 없었다.
> 타 서비스의 `.strip` 처럼 **1장씩 가로 전체(850px)로** 키웠다. 카드 테두리와 클릭 확대는 유지.
> 보정 CSS 는 `globals.css` 하단 "운영 반영" 블록에 있고, 미디어쿼리보다 뒤에 와서 전 해상도 1열이다.
> 원본이 278px 뿐이라 데스크톱에서는 3배 확대돼 다소 부드럽지만(고해상도본은 카피본에도 없음)
> 축소돼 못 읽던 이전보다는 확실히 낫고, 모바일은 1.17배로 거의 원본 해상도다.
> `thumbnail_20250122_65c8b011b5f69` 는 고객이 "서비스 시공" 블록을 덜어낸 수정본으로 교체했다(278x489).

---

## 2. 이미지 (WebP 변환 · 2026-08-07)

데모 원본은 파일명이 `thumbnail_` 로 시작하지만 실제로는 썸네일이 아니라 원본급이었다(657장 358MB, 평균 545KB, 최대 4.7MB).
`next/image` 없이 `<img>` 로 그대로 서빙하는 구조라 전량 WebP 로 변환했다.

| | 파일 수 | 용량 |
|---|---|---|
| 변환 전 | 930 | 405.7 MB |
| 변환 후 | 929 | **133.2 MB** (67% 감소) |

- **929장 전부 원본 해상도 그대로.** 원본이 모두 가로 1920px 이하라 리샘플링이 한 번도 일어나지 않았고, 코덱만 바뀌었다.
- 픽셀 오차(RMSE, 0~255): 조직도 2.0 · 후기 캡처 1.6~3.4 · 인증서 4.9 · 단가표 8.2 → 육안 식별 불가 수준
- 제외 1장: `thumbnail_20260629_f4686fcf5485b.jpg.png` — 확장자가 이중인 잔여 파일(실사용본은 같은 이름 `.jpg`), 어디에서도 참조되지 않아 뺐다
- 원본 백업: `D:\projectClaude\_backup\skyforestclean-images-original` (930장 408MB)

### 가로폭만 제한하는 이유

처음에 `fit:'inside'` 로 가로·세로를 함께 1920 으로 묶었더니 세로로 긴 설명 스트립(860x4800)이
**344x1920** 이 돼 가로폭이 절반 이하로 줄었다. 이 이미지는 `.strip` 에서 850px 폭으로 렌더되므로 그대로 흐려진다.
그래서 높이는 제한하지 않는다. (`scripts/optimize-images.mjs` 주석 참조)

### 데이터는 원본 확장자를 유지한다

데모와 대조하기 쉽도록 `src/lib/content/*` 의 리터럴은 `.jpg`/`.png` 를 그대로 두고,
`.webp` 매핑은 **`src/lib/content/images.ts` 의 `toWebp()` 한 곳**에서만 한다
(`rf()` · `IMG` · `REV_ITEMS` · `REV_PROV` 가 전부 이 함수를 거친다).
`og-image.jpg` 와 `favicon.png` 는 공유 미리보기 호환을 위해 변환하지 않았다.

### 재변환

```bash
node scripts/optimize-images.mjs ../skyforest-demo/images public/images-new
```

---

## 3. 라우트 (32p)

| 라우트 | SEO 키 | 비고 |
|---|---|---|
| `/` | `home` | 히어로 슬라이드 · 프로세스 · 갤러리 · 후기 마퀴 · 상담폼 |
| `/about` | `about` | 소개 · 대표 인사말 · 수상 · 조직도 |
| `/expo` | `expo` | 박람회 목록 6건 |
| `/expo/[slug]` | `expo-*` | 상세 6p — `olympicpark` `osong` `eversky` `convention` `gym` `redcarpet` |
| `/contact` | `contact` | 상담 폼 |
| `/[service]` | `cleaning` `grout` `nano` `elastic` | 부모 4p |
| `/[service]/[child]` | `cleaning-new` 등 | 하위 18p (청소3 · 줄눈8 · 나노4 · 탄성3) |

모든 동적 라우트는 `generateStaticParams` + `dynamicParams = false` → 알 수 없는 경로는 404.

### 박람회 현장

일자(`dt`)는 근거가 확실한 건이 하나뿐이라 **전면 제거**했고, 장소 · 운영 서비스 · 현장 설명으로 구성한다.

- 목록 카드: 제목 → 장소 칩 → 현장 설명 → `운영 서비스 · {svc}` → 자세히 보기
- 상세: 히어로(제목·설명) → 정보 박스 2개(장소 / 운영 서비스) → 갤러리 → 목록·상담 CTA

---

## 4. SEO

`src/lib/content/seo.ts` 의 **SEO 테이블이 페이지 메타의 단일 소스**다 (32개 항목: 경로 · title · description).
여기에 항목을 추가하면 `metadata` 와 `sitemap.xml` 이 함께 갱신된다.

- 페이지 메타: `pageMetadata(id)` → title(absolute) · description · canonical · OG · Twitter
- 사이트맵: `src/app/sitemap.ts` 가 SEO 테이블에서 32 URL 파생 (우선순위 홈 1.0 → 서비스 0.9/0.8 → 박람회 0.6)
- `robots.txt`: 전체 허용 + `/api/` 차단 + 사이트맵 위치
- 네이버 소유확인: `naver-site-verification` 메타 (`lib/constants.ts` 의 `NAVER_SITE_VERIFICATION`)
- JSON-LD: 공통 `HomeAndConstructionBusiness`(+`hasOfferCatalog` 5종) · `WebSite`, 페이지별 `Service` · `BreadcrumbList`
- OG 이미지: `public/og-image.jpg` (1200x630)

배포 후 할 일: 네이버 서치어드바이저 · 구글 서치콘솔에 사이트 등록 + `sitemap.xml` 제출.

---

## 5. 상담신청 (실연동 완료)

브라우저 → `POST /api/contact` (Next 라우트) → `POST https://api.growworks.co.kr/v1/skyforest/contact`

서버에서 중계하므로 **CORS 허용 목록과 무관**하다. slug 는 어드민에 등록된 **`skyforest`** (도메인 `skyforestclean.com` 과 다름).

### 화면 ↔ API 필드 매핑

| 화면 항목 | API 필드 | 비고 |
|---|---|---|
| 성함 | `name` | 2자 이상 필수, 100자 절단 |
| 연락처 | `phone` | 필수, 숫자 9~11자리 검증, 50자 절단 |
| 관심 서비스 (입주청소·줄눈시공·나노코팅·새집증후군·탄성코트) | `serviceType` | `, ` join, 255자 절단 |
| 평수 | `budget` | 명세상 재활용 허용 필드, 100자 절단 |
| 희망일자 · 주소 | `message` 상단 | `희망일자: ` / `시공 주소: ` 라벨 + 빈 줄 후 문의내용 |
| 문의내용 | `message` 하단 | |
| 개인정보 동의 | (전송 안 함) | 화면 전용 필수 체크 |

### 명세 주의사항 (구현에 반영됨)

- `Content-Type: application/json` 헤더 필수 (누락 시 400 이 아니라 **500**) — charset 파라미터는 붙이지 않는다
- 서버는 `name`·`phone` 만 검증 → 나머지는 클라이언트 + `lib/validations.ts` 가 담당
- 길이 초과 시 500 이 될 수 있어 **전송 전 절단** (`toContactPayload`)
- 성공 판정은 `201` + `{success:true}`, 실패 분기는 `error` **코드** (`VALIDATION` 등, message 는 바뀔 수 있음)
- `attachments` 미사용 — 첨부 도입 시 `/upload` 선호출 후 `[{url,name}]` **객체 배열**로 전송 (문자열 배열은 어드민 링크 깨짐)

### 전송 테스트 결과 (2026-08-07)

- 로컬 에코 서버로 바이트 검증: `Content-Type: application/json`, Content-Length 297 = 실제 UTF-8 바이트 수,
  hex `ed959c eab880 …` = 정상 UTF-8. **한글 깨짐 없음.**
- 실제 API 전송 성공 (upstream 201 + `{success:true}`).
  **어드민에 남은 테스트 건 `넥스트연동테스트` / `010-0000-0000` 은 확인 후 삭제 필요.**
- 검증 실패 분기 확인: 성함 2자 미만 · 연락처 자릿수 · 필드 누락 모두 `VALIDATION` + 한글 메시지 400.

### 실제 접수를 원치 않을 때

`.env.local` 의 `CONTACT_API_MOCK=true` → 외부 호출 없이 콘솔 로그 + 성공 응답.

---

## 6. 구조

```
src/
  app/
    globals.css              데모 CSS verbatim (+ 이식 보정)
    layout.tsx               Header / main#main / Footer / Fab / Lightbox / RevealObserver + 공통 메타·JSON-LD
    page.tsx  about/  expo/  contact/  [service]/[child]/
    api/contact/route.ts     상담 접수 프록시
    sitemap.ts robots.ts not-found.tsx
  components/
    layout/  Header Footer Fab Lightbox RevealObserver PageShell
    sections/ Hero Counters ReviewSection
    forms/   ContactForm
    ui/      ReviewMarquee CaseGallery ZoomChip
    seo/     JsonLd
  lib/
    content/                 ★ 콘텐츠 (mock → API 교체 지점)
      index.ts               파사드: getServices/getExpoList/getHomeReviews …
      seo.ts                 ★ 페이지별 SEO 단일 소스
      images.ts services.ts case-pools.ts strips.ts
      reviews-manifest.ts reviews.ts gallery.ts expo.ts process.ts
    constants.ts validations.ts seo/{jsonld,metadata}.ts
  types/content.ts
scripts/
  extract-content.mjs      데모 index.html → src/lib/content/*.ts 추출 (줄 번호 의존, 헤더 주석 참조)
  optimize-images.mjs      원본 이미지 → WebP 변환
public/images/{real,reviews,placeholder}  ·  public/og-image.jpg  ·  public/favicon.png
```

### `.page` 래퍼를 유지하는 이유

라우트당 하나만 렌더하지만(`PageShell` 이 항상 `active`) 래퍼는 남긴다.

1. `#home .sec-head{text-align:left}` 같은 **페이지 스코프 CSS** 를 그대로 살리기 위해
2. 라이트박스 그룹 수집 범위(`closest('.page')`)를 데모와 동일하게 두기 위해

### 클라이언트 컴포넌트 (데모 JS 이식분)

| 컴포넌트 | 데모 원본 |
|---|---|
| `Hero` | 4.8초 슬라이드 로테이션 + `heroNum`/`heroBar` |
| `Counters` | `runCounters()` — 2.2초 ease-out 카운트업 |
| `RevealObserver` | `revealOnScroll()` — `vh*0.9` 임계값, 라우트 변경 시 `.in` 리셋 후 재계산 |
| `Lightbox` | `[data-lbg]` 델리게이션 · 이전/다음 · 카운터 · 캡션 · 키보드 · src dedupe |
| `CaseGallery` | `moreCases()` — 16장씩 더보기 |
| `Header` | 모바일 `nav.gnb.open` 토글, 링크 클릭 시 닫힘 |
| `ContactForm` | `formHTML()` + `sendContact()` — 검증 · 동의 · 접수 완료 화면 |

---

## 7. 콘텐츠 교체 (박람회 등 API 연동 대기)

**`src/lib/content/index.ts` 의 함수 본문만 바꾸면 된다.** 페이지/컴포넌트는 건드리지 않는다.

```ts
// 현재
export async function getExpoList(): Promise<ExpoItem[]> { return EXPO }

// API 확정 후
export async function getExpoList(): Promise<ExpoItem[]> {
  return apiFetch<ExpoItem[]>('/expos', { next: { revalidate: 600, tags: ['expo'] } })
}
```

캐시 주기는 각 페이지의 `export const revalidate` (홈·서비스·박람회 600초, 회사소개·사이트맵 3600초).

---

## 8. 남은 작업 / 주의

- **어드민 테스트 건 삭제** — `넥스트연동테스트` (2026-08-07 전송)
- **카카오톡 상담 채널 URL 미정** — `components/layout/Fab.tsx` 의 `.kko` 는 데모와 동일하게 `href="#"`
- **원본 근거 없는 수치** — 홈 카운터(`12,500+` / `12개` / `24종`)는 시안 창작 예시. 실수치 확보 시 `lib/constants.ts` 의 `HOME_COUNTERS` 교체
- **대표자 표기** — 원본 푸터는 최수현, 인사말은 서선미. 데모를 따라 **서선미**로 통일
- **favicon** — 데모와 동일하게 `public/favicon.png` 만 제공. `/favicon.ico` 요청은 404
  (브라우저는 metadata 의 PNG 링크 사용. 이때 서버 로그에 Next 내부 `NoFallbackError` 가 찍히지만 응답은 정상 404)
- **Cloudflare Workers(OpenNext) 배포 구성 완료** — §9 참조. 첫 배포 전 R2 버킷
  `skyforestclean-opennext-cache` 존재 여부와 Worker 이름(`skyforest`) 일치를 확인할 것

---

## 9. 배포 (Cloudflare Workers · OpenNext)

```bash
npm run build      # opennextjs-cloudflare build → .open-next/
npm run deploy     # build + wrangler deploy
npm run preview    # build + 로컬 workerd 미리보기
```

로컬에서 `deploy`/`preview` 를 쓰려면 **Node.js 22 이상**이 필요하다(wrangler 4.x 요구사항).
Workers Builds(대시보드 CI)는 자체 Node 를 쓰므로 무관하다.

### `name` 은 실제 Worker 이름과 반드시 같아야 한다

`wrangler.jsonc` 의 `name` 이 Cloudflare 에 배포되는 Worker 이름과 다르면 아래 에러가 난다.

```
✘ [ERROR] Service binding 'WORKER_SELF_REFERENCE' references Worker 'skyforestclean'
  which was not found. [code: 10143]
  → /workers/scripts/skyforest/versions
```

`WORKER_SELF_REFERENCE` 는 **자기 자신을 가리키는 서비스 바인딩**이라 값이 Worker 이름과 어긋나면
"없는 Worker" 를 참조하게 된다. 위 예시는 스크립트는 `skyforest` 로 올라가는데 바인딩은
`skyforestclean` 을 가리켜서 실패한 경우다. 현재 설정은 `name: "skyforest"` 로 맞춰 뒀다.

> 참고: 이 사이트는 **`WORKER_SELF_REFERENCE` 자체가 필요 없다.**
> OpenNext 기본 revalidation queue 가 `dummy` 라 자기 참조를 쓰지 않기 때문이다
> (`res.revalidate()` 나 memory/durable-object queue 를 쓸 때만 필요).
> 그래서 `wrangler.jsonc` 에 해당 `services` 바인딩을 넣지 않았다.
> 예전 설정에 남아 있다면 지우거나 `service` 값을 `name` 과 동일하게 맞출 것.

### 바인딩

| 바인딩 | 리소스 | 용도 |
|---|---|---|
| `ASSETS` | `.open-next/assets` | 정적 자산 (931파일 / 최대 0.9MB — Workers 한도 20,000파일·25MiB 이내) |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 `skyforestclean-opennext-cache` | ISR 증분 캐시 |

`vars` 로 `SITE_SLUG` `API_BASE_URL` `CONTACT_API_MOCK` `NEXT_PUBLIC_SITE_URL` 을 주입한다.
`CONTACT_API_MOCK=false` 이므로 배포본의 상담 신청은 실제로 접수된다.

### Workers Builds 설정 (대시보드)

| 항목 | 값 |
|---|---|
| Build command | **`npm run build`** |
| Deploy command | `npx wrangler deploy` |

**Build command 를 비워두면 배포가 실패한다.**

```
Executing user deploy command: npx wrangler deploy
OpenNext project detected, calling `opennextjs-cloudflare deploy`
ERROR Could not find compiled Open Next config, did you run the build command?
```

`wrangler deploy` 는 OpenNext 프로젝트를 감지하면 **다른 어떤 처리보다 먼저**
`opennextjs-cloudflare deploy` 로 위임한다(`maybeDelegateToOpenNextDeployCommand`).
그래서 `wrangler.jsonc` 의 `build.command` 는 실행될 기회가 없고,
`opennextjs-cloudflare deploy` 에는 빌드를 선행하는 옵션도 없다.
즉 `.open-next/` 는 **반드시 별도 Build command 로 미리 만들어져 있어야 한다.**

Build command 를 못 쓰는 상황이면 Deploy command 를 `npm run deploy`
(= `opennextjs-cloudflare build && opennextjs-cloudflare deploy`)로 바꿔도 된다.

`open-next.config.ts` 에서 `config.buildCommand = 'npm run build:next'` 를 지정해,
Build command 가 `npm run build` 여도 내부 Next 빌드가 재귀 호출되지 않게 했다.
