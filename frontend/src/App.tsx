import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAppContext } from "./contexts/AppContext";
import AddHotels from "./pages/AddHotel";
import MyHotel from "./pages/MyHotels";

import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelPage from "./pages/HotelPage";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isVerified } = useAppContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout showSearchBar={true} bgTransparent={true}>
                <p>Home</p>
              </Layout>
            }
          />
      
          <Route
            path="/hotels/:hotelId"
            element={
              <Layout showSearchBar={false} bgTransparent={false}>
                <HotelPage />
              </Layout>
            }
          />

          {
            isVerified && (
              <>
                <Route
                  path="/add-hotel"
                  element={
                    <Layout showSearchBar={false} bgTransparent={false}>
                      <AddHotels />
                    </Layout>
                  }
                />
                <Route
                  path="/hotels/:hotelId/booking"
                  element={
                    <Layout showSearchBar={false} bgTransparent={false}>
                      <BookingPage/>
                    </Layout>
                  }
                />
                    <Route
            path="/myBookings"
            element={
              <Layout showSearchBar={true} bgTransparent={false}>
                <MyBookings/>
              </Layout>
            }
          />
          
                <Route
                  path="/myHotels"
                  element={
                    <Layout showSearchBar={false} bgTransparent={false}>
                      <MyHotel />
                    </Layout>
                  }
                />

                <Route
                  path="/edit-hotel/:hotelId"
                  element={
                    <Layout showSearchBar={false} bgTransparent={false}>
                      <EditHotel />
                    </Layout>
                  }
                />
              </>
            )
            // <Route path="" element={<Navigate to='/login' replace/>} />)
          }
          <Route
            path="/search"
            element={
              <Layout showSearchBar={false} bgTransparent={false}>
                <Search />
              </Layout>
            }
          />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
