import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
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
            path="/booking"
            element={
              <Layout bgTransparent={false}>
                <h1>BOOKING THE SITE</h1>
              </Layout>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
