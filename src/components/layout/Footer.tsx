import Link from 'next/link'
import { IMG } from '@/lib/content/images'
import { SITE } from '@/lib/constants'

/** 데모 <footer> 이식 */
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="cols">
          <div>
            <img className="logo-foot" src={IMG['logo-white']} alt="하늘숲홈케어" />
            <p>
              100% 지부장체제, 하청 없는 완벽한 시공.
              <br />
              고객님의 소중한 공간을 가장 아름답고 쾌적하게 만들어 드립니다.
            </p>
          </div>
          <div>
            <h4>고객센터</h4>
            <ul>
              <li style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{SITE.tel}</li>
              <li>긴급 {SITE.telEmergency}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
          <div>
            <h4>서비스</h4>
            <ul>
              <li>
                <Link href="/cleaning">청소서비스</Link>
              </li>
              <li>
                <Link href="/grout">줄눈시공</Link>
              </li>
              <li>
                <Link href="/nano">나노코팅</Link>
              </li>
              <li>
                <Link href="/elastic">탄성코트</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>사업자 정보</h4>
            <ul style={{ color: '#8b919d' }}>
              <li>상호: {SITE.brand}</li>
              <li>대표: {SITE.ceo}</li>
              <li>사업자등록번호: {SITE.bizNo}</li>
              <li>주소: {SITE.address}</li>
              <li>이메일: {SITE.email}</li>
            </ul>
          </div>
        </div>
        <div className="copy">© 2026 하늘숲홈케어. All rights reserved.</div>
      </div>
    </footer>
  )
}
