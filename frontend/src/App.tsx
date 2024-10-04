import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout bgTransparent={true}>
        <p>Home</p>
      </Layout>}/>
      <Route path='/booking' element={<Layout bgTransparent={false}><h1>
        BOOKING THE SITE
        </h1></Layout>}/>
      <Route/>



    </Routes>

    
    
    </BrowserRouter>
    </>
  )
}

export default App
