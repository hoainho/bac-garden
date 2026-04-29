import { useState, useEffect } from 'react'

const links = [
  { label: 'Câu chuyện', href: '#story'   },
  { label: 'Thực đơn',   href: '#menu'    },
  { label: 'Không gian', href: '#gallery' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 sm:px-8 h-[72px] transition-all duration-400',
          scrolled || open
            ? 'bg-bg-deep/96 backdrop-blur-md border-b border-gold/15'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <a
          href="#"
          className="flex items-center gap-3"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img
            src="/images/BAC-Gardent-logo.jpg"
            alt="Bắc Garden"
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-sm"
          />
          <span
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-gold text-lg sm:text-xl font-bold tracking-widest"
          >
            Bắc Garden
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="font-body text-[15px] text-cream-dim hover:text-gold transition-colors duration-250 relative group"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#booking')}
              style={{ fontFamily: 'var(--font-display)' }}
              className="btn-cta px-6 py-2.5 bg-gold text-bg-deep text-[13px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-lt transition-colors duration-250"
            >
              Đặt bàn ngay
            </button>
          </li>
        </ul>

        <button
          className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-sm border border-gold/25 bg-gold/8 transition-colors duration-250 active:bg-gold/15"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-gold transition-all duration-300 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-0.5 bg-gold transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 bg-gold transition-all duration-300 origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      <div
        className={[
          'fixed inset-x-0 top-[72px] z-[999] md:hidden',
          'transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none',
        ].join(' ')}
      >
        <div
          className="mx-3 rounded-xl border border-gold/20 shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden"
          style={{ background: 'rgba(20,10,4,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-2 py-3">
            {links.map((l, i) => (
              <button
                key={l.href}
                onClick={() => { scrollTo(l.href); close() }}
                style={{ fontFamily: 'var(--font-display)' }}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-lg text-left text-cream hover:bg-gold/8 active:bg-gold/12 transition-colors duration-150 group"
              >
                <span
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="w-6 text-[11px] text-gold/50 tracking-widest font-normal tabular-nums"
                >
                  0{i + 1}
                </span>
                <span className="flex-1 text-[17px] font-bold tracking-wide group-hover:text-gold transition-colors duration-150">
                  {l.label}
                </span>
                <span className="text-gold/30 text-lg group-hover:text-gold/60 group-hover:translate-x-0.5 transition-all duration-150">→</span>
              </button>
            ))}
          </div>

          <div className="mx-5 h-px bg-gold/15" />

          <div className="p-4">
            <button
              onClick={() => { scrollTo('#booking'); close() }}
              style={{ fontFamily: 'var(--font-display)' }}
              className="btn-cta w-full py-4 bg-gold text-bg-deep text-[14px] font-bold tracking-widest uppercase rounded-lg hover:bg-gold-lt active:scale-[0.98] transition-colors duration-150"
            >
              🏮 Đặt bàn ngay
            </button>
          </div>
        </div>

        <div
          className="fixed inset-0 -z-10"
          style={{ top: '72px' }}
          onClick={close}
          aria-hidden="true"
        />
      </div>
    </>
  )
}
