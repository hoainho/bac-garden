import { useState, useEffect } from 'react'

const links = [
  { label: 'Câu chuyện', href: '#story' },
  { label: 'Thực đơn',   href: '#menu'  },
  { label: 'Không gian', href: '#gallery'},
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

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 h-[72px] transition-all duration-400',
          scrolled
            ? 'bg-bg-deep/92 backdrop-blur-md border-b border-gold/15'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <a
          href="#"
          className="flex items-center gap-3.5"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img
            src="/images/BAC-Gardent-logo.jpg"
            alt="Bắc Garden"
            className="h-11 w-11 object-contain rounded-sm"
          />
          <span
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-gold text-xl font-bold tracking-widest"
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
              className="px-6 py-2.5 bg-gold text-bg-deep text-[13px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-lt transition-colors duration-250 shadow-[0_4px_20px_rgba(212,168,83,0.3)]"
            >
              Đặt bàn ngay
            </button>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <div
        className={[
          'fixed top-[72px] inset-x-0 bottom-0 z-[999] flex flex-col items-center justify-center gap-10',
          'bg-bg-deep/97 backdrop-blur-xl transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {[...links, { label: 'Đặt bàn', href: '#booking' }].map(l => (
          <button
            key={l.href}
            onClick={() => { scrollTo(l.href); close() }}
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-3xl font-bold text-cream hover:text-gold transition-colors duration-250"
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  )
}
