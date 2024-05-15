import { Box } from '@mui/material'
import HomeBodyRecomendados from "../../components/organisms/HomeBodyRecomendados"
import MainBodyBeneficios from '../../components/organisms/MainBodyBeneficios'
import CategoriasTabs from '../../components/organisms/header/CategoriasTabs'
const Main = () => {
  return (
    <Box>
      <CategoriasTabs/>

      <Box>
        <MainBodyBeneficios/>
      </Box>

      <Box marginTop={'20px'}>
        <HomeBodyRecomendados/>
      </Box>

    </Box>
  )
}

export default Main