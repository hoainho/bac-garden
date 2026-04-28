import { useState, useEffect, useRef } from 'react'
import { MENU_GROUPS } from '../data/menu'
import DishCard from './DishCard'
import DishPopup from './DishPopup'
import OptimizedImage from './OptimizedImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

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

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 justify-center my-0">
      <div className="flex-1 max-w-[160px] h-px bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-gold text-xs opacity-60">◆</span>
      <div className="flex-1 max-w-[160px] h-px bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  )
}

function GroupHeader({ label, title, desc }) {
  return (
    <Reveal className="text-center mb-12">
      <p style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] italic text-gold tracking-[4px] uppercase mb-2.5">
        {label}
      </p>
      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[clamp(26px,3vw,40px)] font-bold text-cream mb-2">
        {title}
      </h3>
      {desc && (
        <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[17px] italic text-cream-dim">
          {desc}
        </p>
      )}
      <GoldDivider />
    </Reveal>
  )
}

function BreakfastLayout({ dishes, onOpen }) {
  const [featured, ...rest] = dishes
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-4">
      <DishCard dish={featured} onOpen={onOpen} size="featured" />
      <div className="flex flex-col gap-4">
        {rest.map(d => <DishCard key={d.id} dish={d} onOpen={onOpen} size="small" />)}
      </div>
    </div>
  )
}

function Grid4Layout({ dishes, onOpen }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dishes.map((d, i) => (
        <div key={d.id} className={d.hero ? 'col-span-2 row-span-1' : ''}>
          <DishCard dish={d} onOpen={onOpen} size={d.hero ? 'small' : 'grid'} />
        </div>
      ))}
    </div>
  )
}

function Grid3Layout({ dishes, onOpen }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dishes.map(d => <DishCard key={d.id} dish={d} onOpen={onOpen} size="grid" />)}
    </div>
  )
}

function SignatureLayout({ dishes, onOpen }) {
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <span
          style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #A8832F, #D4A853)' }}
          className="inline-block text-bg-deep text-[11px] font-bold tracking-[4px] uppercase px-5 py-1.5"
        >
          ✦ Tinh hoa đặc sản ✦
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dishes.map(d => <DishCard key={d.id} dish={d} onOpen={onOpen} size="hero_sq" />)}
      </div>
    </>
  )
}

function HeroLayout({ dishes, onOpen }) {
  const d = dishes[0]
  return (
    <div
      className="relative h-[500px] md:h-[560px] overflow-hidden rounded-sm cursor-pointer group"
      onClick={() => onOpen(d)}
    >
      <OptimizedImage
        imgPath={d.img}
        size="hero"
        alt={d.name}
        className="absolute inset-0 w-full h-full transition-transform duration-[8000ms] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-bg-deep/75 via-bg-deep/30 to-bg-deep/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-10 text-center">
        <h4
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-[clamp(32px,5vw,68px)] font-black text-white leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          {d.name}
        </h4>
        <p
          style={{ fontFamily: 'var(--font-accent)' }}
          className="text-[clamp(16px,2vw,24px)] italic text-gold tracking-[2px]"
        >
          Sum vầy trọn vẹn bên mâm cơm Bắc
        </p>
        <span
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-[32px] font-black text-gold bg-bg-deep/60 px-8 py-2.5 border border-gold/40"
        >
          {d.price}
        </span>
        <button
          onClick={e => { e.stopPropagation(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
          style={{ fontFamily: 'var(--font-display)' }}
          className="mt-2 inline-block px-10 py-3.5 bg-gold text-bg-deep text-[14px] font-bold tracking-widest uppercase hover:bg-gold-lt transition-colors duration-250 rounded-sm"
        >
          Đặt bàn để thưởng thức
        </button>
      </div>
    </div>
  )
}

const LAYOUT_MAP = {
  breakfast: BreakfastLayout,
  grid4:     Grid4Layout,
  grid3:     Grid3Layout,
  signature: SignatureLayout,
  hero:      HeroLayout,
}

export default function MenuSection() {
  const [activeGroup, setActiveGroup] = useState(MENU_GROUPS[0].id)
  const [popup, setPopup] = useState(null)
  const groupRefs = useRef({})

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveGroup(e.target.dataset.group)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    MENU_GROUPS.forEach(g => {
      const el = groupRefs.current[g.id]
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  function scrollToGroup(id) {
    const el = groupRefs.current[id]
    if (!el) return
    window.scrollTo({ top: el.offsetTop - 130, behavior: 'smooth' })
  }

  return (
    <>
      <section id="menu" className="bg-bg-dark relative" style={{ background: '#1C0F07' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(61,31,10,0.35) 0%, transparent 55%)' }}
        />

        <div className="max-w-[1200px] mx-auto px-8 pt-[100px] pb-16 text-center">
          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-[12px] italic text-gold tracking-[4px] uppercase mb-4">
              Thực đơn
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[clamp(40px,5.5vw,70px)] font-black text-cream leading-[1.1] mb-3"
            >
              Thực đơn <span className="text-gold">Bắc Garden</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: 'var(--font-accent)' }} className="text-[clamp(17px,2vw,24px)] italic text-cream-dim mb-0 tracking-wider">
              Hương vị Hà Nội xưa
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="flex items-center gap-4 justify-center mt-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold tracking-[8px] text-sm opacity-70">✦ ✦ ✦</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          </Reveal>
        </div>

        <div className="sticky top-[72px] z-[500] bg-bg-dark/96 backdrop-blur-md border-b border-gold/20" style={{ background: 'rgba(28,15,7,0.96)' }}>
          <div className="max-w-[1200px] mx-auto px-4 flex overflow-x-auto scrollbar-none">
            {MENU_GROUPS.map(g => (
              <button
                key={g.id}
                onClick={() => scrollToGroup(g.id)}
                style={{ fontFamily: 'var(--font-body)' }}
                className={[
                  'flex-shrink-0 px-6 py-4 text-[13px] tracking-[2px] uppercase border-b-2 transition-all duration-250 whitespace-nowrap',
                  activeGroup === g.id
                    ? 'text-gold border-gold'
                    : 'text-cream-dim border-transparent hover:text-gold',
                ].join(' ')}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 pb-[100px]">
          {MENU_GROUPS.map((group, gi) => {
            const Layout = LAYOUT_MAP[group.layout]
            const isSignature = group.layout === 'signature'

            return (
              <div
                key={group.id}
                ref={el => groupRefs.current[group.id] = el}
                data-group={group.id}
                className={[
                  'scroll-mt-[130px]',
                  gi === 0 ? 'pt-16' : 'pt-[80px]',
                  gi < MENU_GROUPS.length - 1 ? 'pb-[80px] border-b border-gold/10' : 'pb-0',
                  isSignature ? 'relative' : '',
                ].join(' ')}
                style={isSignature ? {
                  background: 'linear-gradient(to bottom, rgba(61,31,10,0.15), transparent)',
                } : {}}
              >
                {isSignature && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  </>
                )}

                <GroupHeader label={group.label} title={group.title} desc={group.desc} />
                <Reveal delay={150}>
                  <Layout dishes={group.dishes} onOpen={setPopup} />
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      <DishPopup dish={popup} onClose={() => setPopup(null)} />
    </>
  )
}
