function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

import OptimizedImage from './OptimizedImage'

export default function FeaturedDish() {
  return (
    <section className="relative min-h-[420px] sm:h-[580px] overflow-hidden">
      <OptimizedImage
        imgPath="/images/BG 66627s.jpg"
        size="hero"
        alt="Chả cá Lã Vọng"
        className="absolute inset-0 w-full h-full brightness-[0.4]"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(16,8,4,0.7) 0%, rgba(16,8,4,0.85) 100%)' }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{ background: 'linear-gradient(to right, rgba(16,8,4,0.9) 0%, rgba(16,8,4,0.2) 65%, rgba(16,8,4,0.05) 100%)' }}
      />
      <div className="relative z-10 min-h-[420px] sm:h-full max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center py-12 sm:py-0">
        <div className="w-full sm:max-w-[560px] text-center sm:text-left">
          <span
            style={{ fontFamily: 'var(--font-body)' }}
            className="inline-block bg-red-vn text-white text-[11px] tracking-[3px] uppercase px-4 py-1.5 mb-4 sm:mb-6"
          >
            Đặc sản nổi bật
          </span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[clamp(36px,7vw,68px)] font-black text-white leading-[1.1] mb-2 sm:mb-3"
          >
            Chả Cá<br />Lã Vọng
          </h2>
          <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[18px] sm:text-[22px] italic text-gold mb-3 sm:mb-5">
            Tinh hoa ẩm thực Hà Nội
          </p>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-[15px] sm:text-[17px] text-cream-dim leading-[1.8] mb-4 sm:mb-7">
            Cá tẩm nghệ thơm lừng, sốt chấm mắm tôm đặc trưng, ăn kèm bún, thì là và lạc rang — hương vị không nơi nào có được.
          </p>
          <p style={{ fontFamily: 'var(--font-display)' }} className="text-[clamp(24px,5vw,36px)] font-black text-gold mb-6 sm:mb-8">
            120.000đ <small style={{ fontFamily: 'var(--font-body)', fontSize: 16 }} className="text-cream-dim font-normal">/ phần</small>
          </p>
          <button
            onClick={() => scrollTo('#booking')}
            style={{ fontFamily: 'var(--font-display)' }}
            className="btn-cta inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-gold text-bg-deep text-[13px] sm:text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-lt transition-colors duration-250 hover:-translate-y-0.5"
          >
            Đặt bàn để thưởng thức
          </button>
        </div>
      </div>
    </section>
  )
}
