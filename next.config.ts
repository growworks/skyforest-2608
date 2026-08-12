import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 데모 이미지는 전부 public/images 로컬 자산이라 원격 패턴이 필요 없다.
  // (외부 CDN/관리자 API 이미지 도입 시 remotePatterns 를 여기에 추가)
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
