import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 데모 마크업 100% 이식 원칙상 <img> 를 그대로 사용한다 (next/image 미사용).
      '@next/next/no-img-element': 'off',
    },
  },
  // .open-next/.wrangler 는 OpenNext 빌드 산출물(생성 코드)이라 검사 대상이 아니다
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.open-next/**',
    '.wrangler/**',
    'cloudflare-env.d.ts',
  ]),
])

export default eslintConfig
