import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import NewsletterSubscribe from "../components/NewsletterSubscribe"
import SearchBar from "../components/SearchBar"

interface PropTypes{
  children:React.ReactNode,
  bgTransparent:boolean,
  showSearchBar:boolean
}



const Layout = ({children , bgTransparent , showSearchBar}:PropTypes) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header bgTransparent={bgTransparent}/>
     {bgTransparent? <Hero/>: null} 
     {
      showSearchBar?<SearchBar bgTransparent={bgTransparent}/>: null

     }
      <div className="contaie mx-auto py-10 flex-1">
        {children}
      </div>
      {bgTransparent ? <NewsletterSubscribe/> : null}
      <Footer/>
        

    </div>
  )
}

export default Layout

