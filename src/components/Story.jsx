import { useScrollReveal } from '../hooks/useScrollReveal'
import OptimizedImage from './OptimizedImage'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Story() {
  return (
    <section
      id="story"
      className="py-[120px] relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #100804, #1C0F07)' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gold" />

      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          <Reveal className="relative h-[520px] lg:h-[560px]">
            <OptimizedImage
              imgPath="/images/BG 65794s.jpg"
              size="card"
              alt="Mâm cơm Bắc Garden"
              className="absolute top-0 left-0 w-3/4 h-[80%] rounded-sm brightness-90"
            />
            <OptimizedImage
              imgPath="/images/BG 66427s.jpg"
              size="card"
              alt="Lợn cắp nách"
              className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-sm brightness-85 border-4 border-bg-dark"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-dark border border-gold px-7 py-5 text-center z-10"
            >
              <span
                style={{ fontFamily: 'var(--font-display)' }}
                className="block text-[48px] font-black text-gold leading-none"
              >
                10+
              </span>
              <span
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[11px] text-cream-dim tracking-[3px] uppercase"
              >
                Năm kinh nghiệm
              </span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-0">
            <Reveal delay={0}>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[13px] italic text-gold tracking-[4px] uppercase mb-4"
              >
                Câu chuyện của chúng tôi
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[clamp(32px,3.5vw,48px)] font-bold text-cream leading-[1.15] mb-6"
              >
                Hà Nội xưa<br />
                <span className="text-gold">trong từng món ăn</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[18px] text-cream-dim leading-[1.85] mb-6"
              >
                Bắc Garden ra đời từ nỗi nhớ về những mâm cơm gia đình Hà Nội xưa — nơi mỗi bát phở, mỗi đĩa chả cá, mỗi miếng bún chả đều mang theo hơi ấm của thế hệ trước.
              </p>
              <div className="border-l-2 border-gold pl-6 mb-6">
                <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[22px] italic text-cream leading-[1.6]">
                  "Chúng tôi không chỉ nấu ăn — chúng tôi kể chuyện bằng hương vị, gìn giữ linh hồn ẩm thực Bắc Bộ cho những thế hệ mai sau."
                </p>
              </div>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[18px] text-cream-dim leading-[1.85]"
              >
                Từng công thức được truyền lại qua nhiều thế hệ, từng nguyên liệu được chọn lựa kỹ càng từ những vùng quê miền Bắc.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gold/20">
                {[
                  { n: '50+',  l: 'Món truyền thống' },
                  { n: '10K+', l: 'Thực khách hài lòng' },
                  { n: '100%', l: 'Nguyên liệu tươi' },
                ].map(s => (
                  <div key={s.n} className="text-center">
                    <span
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="block text-[44px] font-black text-gold leading-none mb-1.5"
                    >
                      {s.n}
                    </span>
                    <span
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-[13px] text-cream-dim tracking-[2px] uppercase"
                    >
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
