/** 데모 ZOOM_CHIP 이식 — "클릭하면 크게 보입니다" 뱃지 */
export function ZoomChip() {
  return (
    <span className="zoom-chip">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6M8 11h6" />
      </svg>
      클릭하면 크게 보입니다
    </span>
  )
}
