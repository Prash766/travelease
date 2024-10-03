import Header from "../components/Header"
import Hero from "../components/Hero"
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header bgTransparent={true}/>
      <Hero/>
        

    </div>
  )
}

export default Layout

