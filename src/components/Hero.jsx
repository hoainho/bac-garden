import { useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

const slides = [
  { src: '/images/BG 66529s.jpg', alt: 'Bình Minh Bắc Garden' },
  { src: '/images/BG 66627s.jpg', alt: 'Chả cá Lã Vọng' },
  { src: '/images/BG 66641s.jpg', alt: 'Sum vầy Bắc Garden' },
  { src: '/images/BG 66221s.jpg', alt: 'Lai rai Bắc Garden' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <OptimizedImage
            imgPath={s.src}
            size="hero"
            alt={s.alt}
            eager={i === 0}
            className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ${i === idx ? 'scale-100' : 'scale-[1.08]'}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep/80 z-[1]" />
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(61,31,10,0.5) 0%, transparent 70%)' }}
      />

      <div className="relative z-[2] text-center px-6 max-w-3xl">
        <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full border border-gold/35 bg-gold/10 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-gold text-[13px] italic tracking-[3px]">
            Ẩm thực Bắc Bộ truyền thống
          </span>
          <span className="w-1 h-1 rounded-full bg-gold" />
        </div>

        <h1
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-[clamp(56px,9vw,112px)] font-black text-white leading-none tracking-tight drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)] mb-2"
        >
          Bắc Garden
        </h1>
        <span
          style={{ fontFamily: 'var(--font-accent)' }}
          className="block text-[clamp(28px,4vw,52px)] font-light italic text-gold tracking-[4px] mb-7"
        >
          Hương vị Hà Nội xưa
        </span>
        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-[clamp(16px,2vw,20px)] text-cream/85 italic leading-[1.7] mb-12"
        >
          Nơi mỗi món ăn là một hành trình về ký ức,<br className="hidden sm:block" />
          nơi hương vị Bắc Bộ ngàn năm được gìn giữ trọn vẹn.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollTo('#booking')}
            style={{ fontFamily: 'var(--font-display)' }}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-gold text-bg-deep text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-lt transition-all duration-250 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(212,168,83,0.35)]"
          >
            <span>🏮</span> Đặt bàn ngay
          </button>
          <button
            onClick={() => scrollTo('#menu')}
            style={{ fontFamily: 'var(--font-display)' }}
            className="inline-flex items-center gap-2.5 px-10 py-4 text-cream text-[14px] font-semibold tracking-widest uppercase rounded-sm border border-cream/40 hover:border-gold hover:text-gold hover:bg-gold/6 transition-all duration-250"
          >
            <span>📜</span> Xem thực đơn
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <span style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] tracking-[3px] text-cream-dim uppercase">
          Khám phá
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>

      <div className="absolute bottom-6 right-8 z-[2] flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full border border-gold transition-all duration-300 ${i === idx ? 'bg-gold scale-125' : 'bg-transparent'}`}
          />
        ))}
      </div>
    </section>
  )
}
