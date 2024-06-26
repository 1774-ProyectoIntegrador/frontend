import SectionHome from '../../components/organisms/sections/SectionHome'
import HomeBenefits from '../../components/molecules/home/HomeBenefits'
import HomeRecommended from '../../components/molecules/home/HomeRecommended'
import HomeCategories from '../../components/molecules/home/HomeCategories'
import SectionHero from '../../components/organisms/sections/SectionHero.jsx'
import WhatsAppButton from '../../components/molecules/home/WhatsAppButton.jsx'

const Home = () => {
  return (
    <main>
      <SectionHero />
      <SectionHome title='Beneficios' ContainerComponent={HomeBenefits} background='bg-white' containerClass='grid' />
      <SectionHome title='Productos recomendados' ContainerComponent={HomeRecommended} containerClass='grid' />
      <SectionHome ContainerComponent={HomeCategories} background='bg-white' containerClass='flex cont-category' />
      <WhatsAppButton/>
    </main>
  )
}

export default Home