import FormSearch from '../../components/organisms/forms/FormSearch'
import SectionHome from '../../components/organisms/sections/SectionHome'
import HomeBenefits from '../../components/molecules/home/HomeBenefits'
import HomeRecommended from '../../components/molecules/home/HomeRecommended'
import HomeCategories from '../../components/molecules/home/HomeCategories'

const Home = () => {
  return (
    <main>
      <SectionHome title='¡Hola! ¿Qué estás buscando hoy?' ContainerComponent={FormSearch} containerClass='grid place-items-center' />
      <SectionHome title='Beneficios' ContainerComponent={HomeBenefits} background='bg-white' containerClass='grid' />
      <SectionHome title='Productos recomendados' ContainerComponent={HomeRecommended} containerClass='grid' />
      <SectionHome ContainerComponent={HomeCategories} background='bg-white' containerClass='flex cont-category' />
    </main>
  )
}

export default Home