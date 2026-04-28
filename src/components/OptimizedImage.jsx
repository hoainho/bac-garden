import { useState, useRef, useEffect } from 'react'

/**
 * imgPath: "/images/BG 66529s.jpg"  (original public path)
 * size:    "thumb" | "card" | "hero"  (which WebP variant to load)
 * eager:   true = no lazy load (above-the-fold only)
 *
 * The component renders:
 *   <div ref className={className}>          ← caller controls position/size
 *     <div skeleton />                        ← absolute inset-0, shimmer
 *     <picture>
 *       <source webp />
 *       <img absolute inset-0 />             ← fills picture exactly
 *     </picture>
 *   </div>
 */
export default function OptimizedImage({
  imgPath,
  size = 'card',
  alt = '',
  className = '',
  eager = false,
  style = {},
}) {
  const [loaded, setLoaded]         = useState(false)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const containerRef                = useRef(null)

  useEffect(() => {
    if (eager || shouldLoad) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [eager, shouldLoad])

  const stem    = imgPath.replace(/^\/images\//, '').replace(/\.(jpg|jpeg|png)$/i, '')
  const webpSrc = `/images/optimized/${size}/${stem}.webp`

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: '#2A1608', ...style }}
    >
      <div
        className={`absolute inset-0 skeleton-shimmer transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {shouldLoad && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={imgPath}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </picture>
      )}
    </div>
  )
}
