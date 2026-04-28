import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Story        from './components/Story'
import FeaturedDish from './components/FeaturedDish'
import MenuSection  from './components/MenuSection'
import GalleryStrip from './components/GalleryStrip'
import Testimonials from './components/Testimonials'
import Booking      from './components/Booking'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Story />
      <FeaturedDish />
      <MenuSection />
      <GalleryStrip />
      <Testimonials />
      <Booking />
      <Footer />
    </>
  )
}
