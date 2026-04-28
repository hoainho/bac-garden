import OptimizedImage from './OptimizedImage'

const photos = [
  '/images/BG 66503s.jpg',
  '/images/BG 66479s.jpg',
  '/images/BG 66456s.jpg',
  '/images/BG 66343s.jpg',
  '/images/BG 66308s.jpg',
  '/images/BG 66278s.jpg',
]

export default function GalleryStrip() {
  return (
    <div id="gallery" className="grid grid-cols-3 md:grid-cols-6 h-[220px] md:h-[280px] overflow-hidden">
      {photos.map((src, i) => (
        <div key={i} className="overflow-hidden relative group">
          <OptimizedImage
            imgPath={src}
            size="thumb"
            alt={`Không gian Bắc Garden ${i + 1}`}
            className="absolute inset-0 w-full h-full brightness-[0.65] saturate-75 transition-all duration-500 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.08]"
          />
        </div>
      ))}
    </div>
  )
}
