function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

import OptimizedImage from './OptimizedImage'

export default function FeaturedDish() {
  return (
    <section className="relative h-[580px] overflow-hidden">
      <OptimizedImage
        imgPath="/images/BG 66627s.jpg"
        size="hero"
        alt="Chả cá Lã Vọng"
        className="absolute inset-0 w-full h-full brightness-[0.4]"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(16,8,4,0.9) 0%, rgba(16,8,4,0.3) 60%, rgba(16,8,4,0.1) 100%)' }}
      />
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-8 flex items-center">
        <div className="max-w-[560px]">
          <span
            style={{ fontFamily: 'var(--font-body)' }}
            className="inline-block bg-red-vn text-white text-[11px] tracking-[3px] uppercase px-4 py-1.5 mb-6"
          >
            Đặc sản nổi bật
          </span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[clamp(40px,5.5vw,68px)] font-black text-white leading-[1.1] mb-3"
          >
            Chả Cá<br />Lã Vọng
          </h2>
          <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[22px] italic text-gold mb-5">
            Tinh hoa ẩm thực Hà Nội
          </p>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-[17px] text-cream-dim leading-[1.8] mb-7">
            Cá tẩm nghệ thơm lừng, sốt chấm mắm tôm đặc trưng, ăn kèm bún, thì là và lạc rang — hương vị không nơi nào có được.
          </p>
          <p style={{ fontFamily: 'var(--font-display)' }} className="text-[36px] font-black text-gold mb-8">
            120.000đ <small style={{ fontFamily: 'var(--font-body)', fontSize: 18 }} className="text-cream-dim font-normal">/ phần</small>
          </p>
          <button
            onClick={() => scrollTo('#booking')}
            style={{ fontFamily: 'var(--font-display)' }}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-gold text-bg-deep text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-lt transition-all duration-250 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(212,168,83,0.3)]"
          >
            Đặt bàn để thưởng thức
          </button>
        </div>
      </div>
    </section>
  )
}
