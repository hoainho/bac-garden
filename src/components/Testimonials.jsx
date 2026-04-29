import { useScrollReveal } from '../hooks/useScrollReveal'

const reviews = [
  {
    text: '"Đây là lần đầu tiên tôi ăn Chả cá Lã Vọng chuẩn vị đến thế kể từ khi rời Hà Nội. Không khí ấm áp, phục vụ chu đáo — sẽ quay lại nhiều lần nữa."',
    name: 'Minh Anh', initial: 'M',
  },
  {
    text: '"Mâm cơm Bắc Garden gợi nhớ những bữa cơm gia đình ngày nhỏ. Cơm trắng dẻo, canh chua ngọt thanh, thịt kho đậm đà. Tuyệt vời!"',
    name: 'Thanh Hương', initial: 'T',
  },
  {
    text: '"Đặt bàn online rất tiện. Lợn cắp nách ngon không tưởng, da giòn mà thịt mềm. Nhất định giới thiệu bạn bè!"',
    name: 'Quốc Dũng', initial: 'Q',
  },
]

function Card({ review, delay }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`relative bg-white/[0.02] border border-gold/15 p-6 sm:p-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        style={{ fontFamily: 'var(--font-display)' }}
        className="absolute -top-4 left-5 sm:left-7 text-[60px] sm:text-[80px] text-gold opacity-35 leading-none select-none"
      >
        "
      </span>
      <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[15px] sm:text-[17px] italic text-cream leading-[1.75] mb-5 sm:mb-7">
        {review.text}
      </p>
      <div className="flex items-center gap-3.5">
        <div
          style={{ fontFamily: 'var(--font-display)' }}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-bg-warm border border-gold/30 text-gold text-[16px] font-bold flex-shrink-0"
        >
          {review.initial}
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-display)' }} className="block text-[16px] font-semibold text-cream mb-0.5">
            {review.name}
          </span>
          <span className="text-gold text-[12px] tracking-widest">★★★★★</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-[120px]" style={{ background: '#1C0F07' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <p style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] italic text-gold tracking-[4px] uppercase mb-4 text-center">
          Cảm nhận thực khách
        </p>
        <h2
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-[clamp(28px,4vw,52px)] font-bold text-cream text-center leading-[1.15] mb-10 sm:mb-16"
        >
          Khách hàng <span className="text-gold">nói gì về chúng tôi</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
          {reviews.map((r, i) => <Card key={i} review={r} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
