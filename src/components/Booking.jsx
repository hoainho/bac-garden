import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { sendBookingToTelegram } from '../utils/telegram'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >{children}</div>
  )
}

const TIMES = ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','11:00',
  '11:30','12:00','12:30','13:00','13:30','17:00','17:30','18:00',
  '18:30','19:00','19:30','20:00','20:30','21:00']

const CONTACT = [
  { icon: '📍', label: 'Địa chỉ',       value: '123 Phố Cổ, Hoàn Kiếm, Hà Nội' },
  { icon: '📞', label: 'Điện thoại',     value: '0912 345 678  —  0987 654 321'  },
  { icon: '🕐', label: 'Giờ mở cửa',    value: 'Thứ 2 – Chủ nhật: 07:00 – 22:00' },
  { icon: '✉️', label: 'Email',         value: 'hello@bacgarden.vn'              },
  { icon: '🏮', label: 'Sức chứa',      value: 'Trong nhà (80) · Sân vườn (40) · VIP (3 phòng)' },
]

export default function Booking() {
  const [form, setForm]   = useState({ name:'', phone:'', date:'', time:'', guests:'', seat:'', note:'' })
  const [status, setStatus] = useState('idle')
  const [toast, setToast]   = useState('')

  useEffect(() => {
    const today = new Date()
    const min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`
    setForm(f => ({ ...f, _minDate: min }))
  }, [])

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 5000)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      showToast('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc.')
      return
    }
    setStatus('loading')
    try {
      await sendBookingToTelegram({
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        guests: form.guests,
        seat: form.seat,
        note: form.note,
      })
    } catch (err) {
      console.error('[Booking] Zalo notify failed:', err)
    }
    setStatus('done')
    showToast(`🏮 Cảm ơn ${form.name}! Chúng tôi sẽ gọi xác nhận sớm nhất.`)
    setTimeout(() => {
      setForm(f => ({ ...f, name:'', phone:'', date:'', time:'', guests:'', seat:'', note:'' }))
      setStatus('idle')
    }, 3000)
  }

  const inputCls = 'w-full bg-white/4 border border-gold/20 rounded-sm px-4 py-3 text-cream placeholder-cream-dark/70 text-base italic transition-all duration-250 focus:outline-none focus:border-gold focus:bg-gold/6'
  const labelCls = 'block text-[11px] tracking-[2px] text-gold uppercase mb-2'

  return (
    <section
      id="booking"
      className="py-16 sm:py-[120px] relative"
      style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(61,31,10,0.45) 0%, transparent 55%), #100804' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(212,168,83,1) 0,rgba(212,168,83,1) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(212,168,83,1) 0,rgba(212,168,83,1) 1px,transparent 1px,transparent 60px)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <Reveal>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] italic text-gold tracking-[4px] uppercase mb-4 text-center">
            Đặt bàn trực tuyến
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-[clamp(32px,4vw,52px)] font-bold text-cream text-center leading-[1.15] mb-4">
            Giữ chỗ cho <span className="text-gold">buổi hội ngộ</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-[16px] sm:text-[18px] italic text-cream-dim text-center mb-10 sm:mb-16 max-w-xl mx-auto">
            Đặt bàn trước để đảm bảo chỗ ngồi ưng ý. Chúng tôi xác nhận trong vòng 30 phút.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-start">
          <Reveal>
            <ul className="flex flex-col gap-5">
              {CONTACT.map(c => (
                <li key={c.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gold/10 border border-gold/30 rounded-sm text-base">
                    {c.icon}
                  </div>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-display)' }} className="block text-[15px] text-cream font-semibold mb-1">
                      {c.label}
                    </strong>
                    <span style={{ fontFamily: 'var(--font-body)' }} className="text-[15px] text-cream-dim">
                      {c.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div
              className="relative bg-white/[0.02] border border-gold/20 p-5 sm:p-10 md:p-12 rounded-sm"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bg-deep text-gold text-[18px] px-4">◆</div>

              <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[26px] font-bold text-cream text-center mb-2">
                Đặt bàn ngay
              </h3>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-[14px] italic text-cream-dim text-center mb-8">
                Điền thông tin, chúng tôi liên hệ xác nhận sớm nhất
              </p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-4" style={{ fontFamily: 'var(--font-body)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={labelCls}>Họ và tên</label>
                    <input className={inputCls} type="text" placeholder="Nguyễn Văn A"
                      value={form.name} onChange={e => set('name', e.target.value)} style={{ fontFamily: 'var(--font-body)' }} />
                  </div>
                  <div>
                    <label className={labelCls}>Số điện thoại</label>
                    <input className={inputCls} type="tel" placeholder="0912 345 678"
                      value={form.phone} onChange={e => set('phone', e.target.value)} style={{ fontFamily: 'var(--font-body)' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={labelCls}>Ngày đến</label>
                    <input className={inputCls} type="date" min={form._minDate}
                      value={form.date} onChange={e => set('date', e.target.value)} style={{ fontFamily: 'var(--font-body)', colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label className={labelCls}>Giờ đến</label>
                    <select className={inputCls} value={form.time} onChange={e => set('time', e.target.value)} style={{ fontFamily: 'var(--font-body)' }}>
                      <option value="" disabled>Chọn giờ</option>
                      {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={labelCls}>Số khách</label>
                    <select className={inputCls} value={form.guests} onChange={e => set('guests', e.target.value)} style={{ fontFamily: 'var(--font-body)' }}>
                      <option value="" disabled>Số người</option>
                      {['1','2','3','4','5','6','7–10','11–20','Trên 20'].map(n => (
                        <option key={n}>{n} {parseInt(n) > 1 || n === 'Trên 20' || n.includes('–') ? 'người' : 'người'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Khu vực ngồi</label>
                    <select className={inputCls} value={form.seat} onChange={e => set('seat', e.target.value)} style={{ fontFamily: 'var(--font-body)' }}>
                      <option value="">Không yêu cầu</option>
                      <option>Trong nhà</option>
                      <option>Sân vườn</option>
                      <option>Phòng VIP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Ghi chú thêm</label>
                  <textarea
                    className={`${inputCls} resize-none h-24`}
                    placeholder="Sinh nhật, dị ứng thực phẩm, yêu cầu đặc biệt..."
                    value={form.note}
                    onChange={e => set('note', e.target.value)}
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  style={{ fontFamily: 'var(--font-display)', background: status === 'done' ? '#2d6a4f' : undefined }}
                  className={[
                    'mt-2 w-full py-4 bg-gold text-bg-deep text-[15px] font-bold tracking-widest uppercase rounded-sm transition-colors duration-250',
                    'disabled:opacity-75',
                    status === 'idle' ? 'btn-cta hover:bg-gold-lt hover:-translate-y-0.5' : '',
                  ].join(' ')}
                >
                  {status === 'loading' ? '⏳ Đang gửi...'
                   : status === 'done'  ? '✅ Đã đặt bàn thành công!'
                   : '🏮 Xác nhận đặt bàn'}
                </button>

                <p style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] italic text-cream-dark text-center">
                  Chúng tôi liên hệ xác nhận trong 30 phút · Miễn phí đặt chỗ
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {toast && (
        <div
          style={{ fontFamily: 'var(--font-body)' }}
          className="fixed bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto bg-bg-warm border border-gold px-6 sm:px-8 py-4 text-cream text-[15px] sm:text-[16px] z-[5000] shadow-xl text-center animate-[fadeInUp_0.3s_ease]"
        >
          {toast}
        </div>
      )}
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translate(-50%,12px) } to { opacity:1; transform:translate(-50%,0) } }`}</style>
    </section>
  )
}
