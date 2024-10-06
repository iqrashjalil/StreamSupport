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
import Protected_Route from "./Protected_Route";
import Wallet from "./pages/streamer/Wallet";
import Alert_Settings from "./pages/streamer/Alert_Settings";
import AudioAlert_Settings from "./pages/streamer/AudioAlert_Settings";
import Admin_Dashboard from "./pages/Admin/Admin_Dashboard";
import All_Users from "./pages/Admin/All_Users";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);

  const noFooterRoutes = [
    "/streamerdashboard",
    "/editprofile/:id",
    "/wallet",
    "/alertsettings",
    "/audioalertsettings",
    "/audioalertsettings",
    "/admindashboard",
    "/allusers",
  ];

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
        <Route
          path="/streamerdashboard"
          element={
            <Protected_Route roleRequired="streamer">
              <Streamer_Dashboard />
            </Protected_Route>
          }
        />
        <Route
          path="/editprofile/:id"
          element={
            <Protected_Route>
              <Edit_Profile />
            </Protected_Route>
          }
        />

        <Route
          path="/wallet"
          element={
            <Protected_Route roleRequired="streamer">
              <Wallet />
            </Protected_Route>
          }
        />
        <Route
          path="/alertsettings"
          element={
            <Protected_Route roleRequired="streamer">
              <Alert_Settings />
            </Protected_Route>
          }
        />
        <Route
          path="/audioalertsettings"
          element={
            <Protected_Route roleRequired="streamer">
              <AudioAlert_Settings />
            </Protected_Route>
          }
        />

        <Route
          path="/admindashboard"
          element={
            <Protected_Route roleRequired="admin">
              <Admin_Dashboard />
            </Protected_Route>
          }
        />
        <Route
          path="/allusers"
          element={
            <Protected_Route roleRequired="admin">
              <All_Users />
            </Protected_Route>
          }
        />
      </Routes>
      {!isNoFooterRoute && <Footer />}
    </>
  );
}

export default App;
