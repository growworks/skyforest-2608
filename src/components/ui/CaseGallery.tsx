'use client'

import { useState } from 'react'
import { img } from '@/lib/content/images'

const PAGE = 16

/**
 * 데모 "시공 사례" 갤러리 + moreCases() 이식.
 * 4열 x 4행(16장)만 노출하고 더보기로 16장씩 추가한다.
 */
export function CaseGallery({
  childId,
  title,
  cases,
}: {
  childId: string
  title: string
  cases: string[]
}) {
  const [shown, setShown] = useState(PAGE)
  const left = cases.length - shown

  return (
    <>
      <div className="gal reveal" id={`case-${childId}`}>
        {cases.map((g, i) => (
          <div
            key={`${g}-${i}`}
            className={`cell${i >= shown ? ' hide' : ''}`}
            data-lbg={`case-${childId}`}
            data-lbs={img(g)}
            data-lbc={`${title} 시공 사례`}
          >
            <img src={img(g)} alt={`${title} 시공 사례`} loading="lazy" />
          </div>
        ))}
      </div>
      {left > 0 && (
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button className="cta ghost" onClick={() => setShown((s) => s + PAGE)}>
            시공 사례 더보기 ({left}장)
          </button>
        </div>
      )}
    </>
  )
}
