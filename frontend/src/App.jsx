import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "@babel/polyfill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "./Store/useThemeStore";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
// import Chatbot from "./components/chatbot";
import SettingsPage from "./Pages/setting";
import VoiceCommands from "./components/voicecommand";
import "regenerator-runtime/runtime"; // Add this line at the top of your entry point
import "@babel/polyfill"; // Add this line at the top of your entry point
import BedAvailability from "./components/Bedavailable";




const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);
    const { theme } = useThemeStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);


  return (
    <>
      <div data-theme={theme}>
      <Router>
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/access" element={<BedAvailability />} />
          <Route path="/voice" element={<VoiceCommands />} />
          <Route path="/setting" element={<SettingsPage />} />
        </Routes>
        <Footer />
        {/* <Chatbot/> */}
       
        <ToastContainer position="top-center" />
      </Router>
        </div>
    </>
  );
};

export default App;
