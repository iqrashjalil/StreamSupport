import "./App.css";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useDispatch } from "react-redux";
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
import Withdraw_Requests from "./pages/Admin/Withdraw_Requests";
import User_Profile from "./pages/Admin/User_Profile";
import All_Superchats from "./pages/Admin/All_Superchats";
import Give_Donation from "./pages/Give_Donation";
import Show_Superchat from "./pages/Show_Superchat";
import FAQs from "./pages/FAQs";
import Privacy_Policy from "./pages/Privacy_Policy";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);

  const noFooterRoutes = [
    "/streamerdashboard",
    "/editprofile/:id",
    "/wallet",
    "/alertsettings",
    "/audioalertsettings",
    "/admindashboard",
    "/allusers",
    "/allwithdraws",
    "/userprofile/:id",
    "/recentsuperchats/:id",
    "/overlay/:id",
  ];
  const isNoFooterRoute = noFooterRoutes.some((route) => {
    return matchPath({ path: route, exact: true }, location.pathname);
  });

  // Check if the current route is the overlay route
  const isOverlayRoute = matchPath(
    { path: "/overlay/:id", exact: true },
    location.pathname
  );

  useEffect(() => {
    // Check if the current route starts with '/overlay'
    if (location.pathname.startsWith("/overlay")) {
      document.body.classList.add("transparent-bg");
    } else {
      document.body.classList.remove("transparent-bg");
    }
  }, [location]);
  return (
    <>
      {/* Conditionally render the Navbar */}
      {!isOverlayRoute && <Navbar />}
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
        <Route
          path="/allwithdraws"
          element={
            <Protected_Route roleRequired="admin">
              <Withdraw_Requests />
            </Protected_Route>
          }
        />
        <Route
          path="/userprofile/:id"
          element={
            <Protected_Route roleRequired="admin">
              <User_Profile />
            </Protected_Route>
          }
        />
        <Route
          path="/recentsuperchats/:id"
          element={
            <Protected_Route roleRequired="admin">
              <All_Superchats />
            </Protected_Route>
          }
        />
        <Route path="/superchat/:id" element={<Give_Donation />} />
        <Route path="/overlay/:id" element={<Show_Superchat />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/privacypolicy" element={<Privacy_Policy />} />
      </Routes>
      {!isNoFooterRoute && <Footer />}
    </>
  );
}

export default App;
