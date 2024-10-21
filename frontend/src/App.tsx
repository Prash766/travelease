import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAppContext } from "./contexts/AppContext";
import AddHotels from "./pages/AddHotel";
import MyHotel from "./pages/MyHotels";

import EditHotel from "./pages/EditHotel";

function App() {
  const {isVerified} = useAppContext()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout bgTransparent={true}>
                <p>Home</p>
              </Layout>
            }
          />
          <Route
            path="/myBookings"
            element={
              <Layout bgTransparent={false}>
                <h1 className="mt=80">BOOKING THE SITE</h1>
              </Layout>
            }
          />
         
          {isVerified && <>
          <Route path="/add-hotel" element={
            <Layout bgTransparent={false}>  
            <AddHotels/>
            </Layout>
            }/>
              <Route
            path="/myHotels"
            element={
              <Layout bgTransparent={false}>
                <MyHotel/>
              </Layout>
            }
          />
            <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout bgTransparent={false}>
                <EditHotel/>
              </Layout>
            }
          />
          </>}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
