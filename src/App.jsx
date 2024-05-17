import './styles/basics.scss'
import { Route, Routes } from "react-router-dom"
import { routes } from './utils/routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/js/theme'
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Category from './pages/category/Category'
import FormAgregarProducto from './components/atoms/admin/FormAgregarProducto'
import Admin from './pages/admin/Admin'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <main>
          <Routes>
            <Route path={routes.home} element={<Home/>}/>
            <Route path={routes.detail} element={<Product/>}/>
            <Route path="/categoria/:category" element={<Category/>} />
            <Route path="/admin/:admin" element={<Admin/>}/>
            <Route path="/admin/form" element={<FormAgregarProducto/>} />
          </Routes>
        </main>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App