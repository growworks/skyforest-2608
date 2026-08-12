'use client'

import { useId, useRef, useState } from 'react'
import { CONTACT_LIMITS, CONTACT_SERVICES, SITE } from '@/lib/constants'

type Errors = { name?: string; phone?: string; consent?: string }

/**
 * 데모 formHTML() + sendContact() 이식.
 * 마크업은 데모와 동일하고, 전송만 /api/contact 프록시를 거친다.
 */
export function ContactForm({ className }: { className?: string }) {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)

  const [services, setServices] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [failMsg, setFailMsg] = useState('')
  const [done, setDone] = useState(false)

  const id = (k: string) => `${k}${uid}`

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return

    const form = e.currentTarget
    const f = new FormData(form)
    const get = (k: string) => String(f.get(k) ?? '').trim()

    const name = get('name')
    const phone = get('phone')
    const digits = phone.replace(/\D/g, '')
    const consent = f.get('consent') === 'on'

    const next: Errors = {}
    if (name.length < 2) next.name = '성함을 2자 이상 입력해주세요.'
    if (digits.length < 9 || digits.length > 11) next.phone = '연락처를 정확히 입력해주세요.'
    if (!consent) next.consent = '개인정보 수집·이용에 동의해주세요.'

    setFailMsg('')
    setErrors(next)
    if (Object.keys(next).length) {
      // 첫 오류로 스크롤 (데모 동작)
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('.err:not(:empty)')
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      })
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services,
          name,
          phone,
          area: get('area'),
          preferredDate: get('preferredDate'),
          address: get('address'),
          message: get('message'),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean
        error?: string
        message?: string
      }

      if (res.ok && data.success) {
        setDone(true)
        return
      }
      setFailMsg(
        data.error === 'VALIDATION' && data.message
          ? data.message
          : `접수 중 문제가 발생했습니다. 잠시 후 다시 시도하시거나 ${SITE.tel}로 전화주세요.`,
      )
    } catch {
      setFailMsg(`네트워크 연결을 확인해주세요. 계속 안 되면 ${SITE.tel}로 전화주세요.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={className}>
      {done ? (
        <form className="cform">
          <div className="form-done">
            <b>상담 신청이 접수되었습니다.</b>
            <p>
              담당 지부장이 확인 후 순차적으로 연락드립니다. 급하시면 {SITE.tel}로 전화주세요.
            </p>
          </div>
        </form>
      ) : (
        <form className="cform" ref={formRef} noValidate onSubmit={onSubmit}>
          <div className="checks">
            {CONTACT_SERVICES.map((s) => (
              <label key={s}>
                <input type="checkbox" checked={services.includes(s)} onChange={() => toggle(s)} />
                {s}
              </label>
            ))}
          </div>

          <div className="f2">
            <div className="frow">
              <label htmlFor={id('nm')}>
                성함 <em>*</em>
              </label>
              <input
                id={id('nm')}
                name="name"
                maxLength={CONTACT_LIMITS.name}
                autoComplete="name"
                placeholder="홍길동"
              />
              <p className="err" role="alert">
                {errors.name}
              </p>
            </div>
            <div className="frow">
              <label htmlFor={id('ph')}>
                연락처 <em>*</em>
              </label>
              <input
                id={id('ph')}
                name="phone"
                type="tel"
                maxLength={CONTACT_LIMITS.phone}
                autoComplete="tel"
                placeholder="010-0000-0000"
              />
              <p className="err" role="alert">
                {errors.phone}
              </p>
            </div>
          </div>

          <div className="f2">
            <div className="frow">
              <label htmlFor={id('ar')}>평수</label>
              <input id={id('ar')} name="area" maxLength={40} placeholder="예: 32평" />
            </div>
            <div className="frow">
              <label htmlFor={id('dt')}>희망일자</label>
              <input id={id('dt')} name="preferredDate" type="date" />
            </div>
          </div>

          <div className="frow">
            <label htmlFor={id('ad')}>주소</label>
            <input
              id={id('ad')}
              name="address"
              maxLength={200}
              autoComplete="street-address"
              placeholder="시공 희망 주소"
            />
          </div>

          <div className="frow">
            <label htmlFor={id('ms')}>문의내용</label>
            <textarea id={id('ms')} name="message" rows={3} placeholder="문의 내용을 입력해주세요" />
          </div>

          <label className="consent">
            <input type="checkbox" name="consent" />
            <span>
              상담을 위한 개인정보(성함·연락처·주소) 수집·이용에 동의합니다. 상담 종료 후 3년간
              보관하며 이후 파기합니다.
            </span>
          </label>
          <p className="err" role="alert">
            {errors.consent}
          </p>

          <button type="submit" className="submit" disabled={sending}>
            {sending ? '접수 중...' : '상담 신청하기'}
          </button>
          <p className={`form-msg${failMsg ? ' error' : ''}`} aria-live="polite">
            {failMsg}
          </p>
        </form>
      )}

      <div className="cs-strip">
        <span>전화가 더 편하시다면</span>
        <b>고객센터 {SITE.tel}</b>
        <span>긴급 {SITE.telEmergency} · 평일 09:00-18:00</span>
      </div>
    </div>
  )
}
