/**
 * 데모의 `.page` 래퍼 이식.
 * 데모는 SPA 라 `.page` 를 토글했지만, 여기서는 라우트당 하나만 렌더하므로 항상 active 다.
 * 이 래퍼를 유지하는 이유:
 *  - `#home .sec-head{text-align:left}` 같은 페이지 스코프 CSS 를 그대로 살리기 위해
 *  - 라이트박스 그룹 수집 범위(`closest('.page')`)를 데모와 동일하게 두기 위해
 */
export function PageShell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="page active">
      {children}
    </div>
  )
}
