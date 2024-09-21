import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/Users_Slice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.users);
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
