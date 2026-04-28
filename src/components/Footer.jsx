const navLinks = [
  { label: 'Câu chuyện', href: '#story'   },
  { label: 'Thực đơn',   href: '#menu'    },
  { label: 'Không gian', href: '#gallery' },
  { label: 'Đặt bàn',   href: '#booking' },
]

const contactLinks = [
  { label: '0912 345 678',        href: 'tel:0912345678'           },
  { label: 'hello@bacgarden.vn',  href: 'mailto:hello@bacgarden.vn'},
  { label: '123 Phố Cổ, Hoàn Kiếm', href: '#'                    },
  { label: 'Hà Nội, Việt Nam',   href: '#'                        },
]

const hours = [
  { day: 'Thứ 2 – Thứ 6', time: '07:00 – 22:00' },
  { day: 'Thứ 7',          time: '06:30 – 22:30' },
  { day: 'Chủ nhật',       time: '06:30 – 22:00' },
  { day: 'Lễ, Tết',        time: 'Mở cửa bình thường' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 pt-20 pb-10" style={{ background: '#100804' }}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-gold/10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3.5 mb-5">
              <img src="/images/BAC-Gardent-logo.jpg" alt="Bắc Garden" className="h-12 w-12 object-contain rounded-sm" />
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-[22px] font-bold text-gold">
                Bắc Garden
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-[15px] italic text-cream-dim leading-[1.7] mb-7">
              Nơi hương vị Hà Nội xưa được gìn giữ và trân trọng. Mỗi món ăn là một câu chuyện.
            </p>
            <div className="flex gap-3">
              {['f','ig','z','tt'].map(s => (
                <a key={s} href="#"
                  className="w-9 h-9 flex items-center justify-center border border-gold/30 text-cream-dim text-[13px] hover:border-gold hover:text-gold hover:bg-gold/8 transition-all duration-250 rounded-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-[16px] font-bold text-cream mb-6">Khám phá</div>
            <ul className="flex flex-col gap-3">
              {navLinks.map(l => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-[15px] text-cream-dim hover:text-gold transition-colors duration-250 flex items-center gap-2"
                  >
                    <span className="text-gold opacity-60">–</span> {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-[16px] font-bold text-cream mb-6">Liên hệ</div>
            <ul className="flex flex-col gap-3">
              {contactLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontFamily: 'var(--font-body)' }}
                    className="text-[15px] text-cream-dim hover:text-gold transition-colors duration-250 flex items-center gap-2">
                    <span className="text-gold opacity-60">–</span> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-[16px] font-bold text-cream mb-6">Giờ mở cửa</div>
            <ul className="flex flex-col gap-2.5">
              {hours.map(h => (
                <li key={h.day} style={{ fontFamily: 'var(--font-body)' }} className="flex justify-between gap-4 text-[14px]">
                  <span className="text-cream">{h.day}</span>
                  <span className="text-cream-dim">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-[13px] text-cream-dark">
            © 2026 <span className="text-gold">Bắc Garden</span>. Hương vị Bắc Bộ truyền thống.
          </p>
          <div className="flex gap-6">
            {['Chính sách bảo mật', 'Điều khoản sử dụng'].map(t => (
              <a key={t} href="#" style={{ fontFamily: 'var(--font-body)' }}
                className="text-[13px] text-cream-dark hover:text-gold transition-colors duration-250">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
