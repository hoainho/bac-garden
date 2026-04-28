import OptimizedImage from './OptimizedImage'

export default function DishCard({ dish, onOpen, size = 'normal' }) {
  const sizeClasses = {
    featured: 'aspect-[3/4]',
    small:    'aspect-[4/3]',
    grid:     'aspect-[4/3]',
    hero_sq:  'aspect-[3/4]',
    normal:   'aspect-[4/3]',
  }

  const nameSizes = {
    featured: 'text-[26px]',
    hero_sq:  'text-[24px]',
    normal:   'text-[18px]',
    small:    'text-[17px]',
    grid:     'text-[16px]',
  }

  const priceSizes = {
    featured: 'text-[24px]',
    hero_sq:  'text-[22px]',
    normal:   'text-[18px]',
    small:    'text-[16px]',
    grid:     'text-[15px]',
  }

  const imgSize = (size === 'featured' || size === 'hero_sq') ? 'card' : 'thumb'

  return (
    <div
      className={`relative overflow-hidden bg-bg-mid rounded-sm cursor-pointer group ${sizeClasses[size] ?? sizeClasses.normal}`}
      onClick={() => onOpen(dish)}
    >
      <OptimizedImage
        imgPath={dish.img}
        size={imgSize}
        alt={dish.name}
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
      />

      {dish.tag && (
        <div className="absolute top-3.5 left-3.5 bg-red-vn text-white text-[10px] tracking-[2px] uppercase px-2.5 py-1 z-10"
          style={{ fontFamily: 'var(--font-body)' }}>
          {dish.tag}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/50 to-bg-deep/5 group-hover:from-bg-deep/[0.98] group-hover:via-bg-deep/65 transition-all duration-350" />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-1">
        <h4
          style={{ fontFamily: 'var(--font-display)' }}
          className={`font-bold text-cream leading-[1.2] transition-colors duration-250 group-hover:text-gold-lt ${nameSizes[size] ?? nameSizes.normal}`}
        >
          {dish.name}
        </h4>
        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-[13px] italic text-cream-dim leading-[1.5] max-h-0 overflow-hidden opacity-0 group-hover:max-h-[60px] group-hover:opacity-100 transition-all duration-400"
        >
          {dish.desc}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span
            style={{ fontFamily: 'var(--font-display)' }}
            className={`font-bold text-gold ${priceSizes[size] ?? priceSizes.normal}`}
          >
            {dish.price}
          </span>
          <span
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-[11px] tracking-[2px] text-cream-dim uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            Xem thêm →
          </span>
        </div>
      </div>
    </div>
  )
}
