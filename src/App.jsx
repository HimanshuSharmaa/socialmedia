import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header-footer/Header'
import Footer from './components/header-footer/Footer'

function App() {
 

  return (

    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>


      )
}

export default App