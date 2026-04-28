import { useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function DishPopup({ dish, onClose }) {
  useEffect(() => {
    if (!dish) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [dish, onClose])

  if (!dish) return null

  return (
    <div
      className={`fixed inset-0 z-[8000] flex items-center justify-center p-6 transition-opacity duration-350 ${dish ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bg-deep/88 backdrop-blur-md" />

      <div
        className="relative z-10 bg-bg-dark border border-gold/30 max-w-[760px] w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm shadow-[0_32px_80px_rgba(0,0,0,0.7)] transition-all duration-400 scale-100"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'popupIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <OptimizedImage
          imgPath={dish.img}
          size="card"
          alt={dish.name}
          eager
          className="w-full h-[280px] md:min-h-[420px]"
        />

        <div className="p-10 md:p-12 flex flex-col justify-center gap-4">
          {dish.tag && (
            <span
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-[11px] tracking-[3px] text-gold uppercase"
            >
              {dish.tag}
            </span>
          )}
          <h3
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[30px] font-bold text-cream leading-[1.2]"
          >
            {dish.name}
          </h3>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-[16px] italic text-cream-dim leading-[1.8]"
          >
            {dish.desc}
          </p>
          <div className="w-14 h-px bg-gold" />
          <p
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[32px] font-black text-gold"
          >
            {dish.price}
          </p>
          <button
            onClick={() => { onClose(); scrollTo('#booking') }}
            style={{ fontFamily: 'var(--font-display)' }}
            className="mt-2 py-3 px-8 bg-gold text-bg-deep text-[14px] font-bold tracking-widest uppercase hover:bg-gold-lt transition-colors duration-250 text-center rounded-sm"
          >
            Đặt bàn để thưởng thức
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/7 border border-gold/30 text-cream-dim hover:bg-red-vn hover:text-white hover:border-red-vn transition-all duration-250 rounded-sm text-lg leading-none"
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  )
}
