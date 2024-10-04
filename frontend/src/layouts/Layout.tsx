import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"

interface PropTypes{
  children:React.ReactNode,
  bgTransparent:boolean
}



const Layout = ({children , bgTransparent}:PropTypes) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header bgTransparent={bgTransparent}/>
     {bgTransparent? <Hero/>: null} 
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer/>
        

    </div>
  )
}

export default Layout

