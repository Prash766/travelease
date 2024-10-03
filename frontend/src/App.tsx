import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout></Layout>}/>
      <Route/>
      <Route/>



    </Routes>

    
    
    </BrowserRouter>
    </>
  )
}

export default App
