import "./App.css";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
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
import Streamer_Dashboard from "./pages/streamer/Streamer_Dashboard";
import Edit_Profile from "./pages/Edit_Profile";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);

  const noFooterRoutes = ["/streamerdashboard", "/editprofile/:id"];

  // Function to check if the current route is in the noFooterRoutes list
  const isNoFooterRoute = noFooterRoutes.some((route) => {
    return matchPath({ path: route, exact: true }, location.pathname);
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/streamerdashboard" element={<Streamer_Dashboard />} />
        <Route path="/editprofile/:id" element={<Edit_Profile />} />
      </Routes>
      {/* Only show Footer if the current route is NOT in the noFooterRoutes */}
      {!isNoFooterRoute && <Footer />}
    </>
  );
}

export default App;
