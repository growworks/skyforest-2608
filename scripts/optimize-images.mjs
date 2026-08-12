/**
 * public/images 자산을 WebP 로 변환한다.
 *
 *   node scripts/optimize-images.mjs <원본폴더> [출력폴더]
 *   예) node scripts/optimize-images.mjs ../skyforest-demo/images public/images-new
 *
 * 정책
 *  - **가로폭만** 1920px 로 제한(축소만, 확대 없음).
 *    세로로 긴 스트립/통이미지(예: 860x4800)는 높이를 함께 제한하면 가로폭까지 줄어
 *    렌더 폭(스트립 ~850px)보다 작아져 흐려진다. 그래서 높이는 제한하지 않는다.
 *  - reviews/     q88 — 카톡·맘카페 캡처라 한글 가독성이 최우선
 *  - real/ PNG    q88 — 인증서·설명 스트립·인포그래픽 등 텍스트 포함 스크린샷
 *  - real/ JPG    q84 — 시공 사진
 *  - placeholder/ q90 — 로고(알파)
 *  - WebP 가 원본보다 커지면 q72 → q60 으로 재시도
 *
 * 변환 후에는 파일명 확장자가 .webp 로 바뀐다. 데이터(src/lib/content/*)는 원본 확장자를
 * 그대로 두고, 경로 매핑은 src/lib/content/images.ts 의 toWebp() 한 곳에서만 한다.
 *
 * 원본은 반드시 따로 보관할 것. (2026-08-07 변환 시 원본 백업: D:\projectClaude\_backup\skyforestclean-images-original)
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2]
const DST = process.argv[3] ?? 'public/images-new'
const MAX = 1920

if (!SRC) {
  console.error('사용법: node scripts/optimize-images.mjs <원본폴더> [출력폴더]')
  process.exit(1)
}

/** 어디에서도 참조되지 않는 잔여 파일 (확장자 이중, 조직도는 .jpg 가 실사용본) */
const DROP = new Set(['real/thumbnail_20260629_f4686fcf5485b.jpg.png'])

function qualityFor(rel, ext) {
  if (rel.startsWith('reviews/')) return 88
  if (rel.startsWith('placeholder/')) return 90
  return ext === '.png' ? 88 : 84
}

const files = []
for (const dir of fs.readdirSync(SRC)) {
  const d = path.join(SRC, dir)
  if (!fs.statSync(d).isDirectory()) continue
  for (const f of fs.readdirSync(d)) files.push(`${dir}/${f}`)
}

let inBytes = 0
let outBytes = 0
let done = 0
const grew = []

async function convert(rel) {
  if (DROP.has(rel)) {
    console.log('  drop:', rel)
    return
  }
  const src = path.join(SRC, rel)
  const ext = path.extname(rel).toLowerCase()
  const origSize = fs.statSync(src).size
  const out = path.join(DST, rel.replace(/\.(jpe?g|png)$/i, '.webp'))
  fs.mkdirSync(path.dirname(out), { recursive: true })

  const encode = (q) =>
    sharp(src)
      .resize({ width: MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, effort: 5 })
      .toBuffer()

  let buf = await encode(qualityFor(rel, ext))
  for (const q of [72, 60]) {
    if (buf.length <= origSize) break
    buf = await encode(q)
  }

  fs.writeFileSync(out, buf)
  inBytes += origSize
  outBytes += buf.length
  if (buf.length > origSize) grew.push(rel)
  if (++done % 100 === 0) console.log(`  ${done}/${files.length} …`)
}

fs.mkdirSync(DST, { recursive: true })
const queue = files.slice()
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const rel = queue.shift()
      try {
        await convert(rel)
      } catch (e) {
        console.error('  FAIL', rel, e.message)
        process.exitCode = 1
      }
    }
  }),
)

const mb = (n) => (n / 1048576).toFixed(1)
console.log(`\n변환 완료: ${done}개`)
console.log(`  ${mb(inBytes)} MB → ${mb(outBytes)} MB (${((1 - outBytes / inBytes) * 100).toFixed(1)}% 감소)`)
if (grew.length) console.log(`  원본보다 큰 파일: ${grew.length}개`, grew.slice(0, 5))
