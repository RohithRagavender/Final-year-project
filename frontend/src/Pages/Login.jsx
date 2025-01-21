// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { Context } from "../main";
// import { Link, useNavigate, Navigate } from "react-router-dom";
// import VoiceCommands from "../components/voicecommand";
// const Login = () => {
//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const navigateTo = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post(
//           "http://localhost:4000/api/v1/user/login",
//           { email, password, confirmPassword, role: "Patient" },
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "application/json" },
//           }
//         )
//         .then((res) => {
//           toast.success(res.data.message);
//           setIsAuthenticated(true);
//           navigateTo("/");
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if (isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <>
//       <VoiceCommands
//           toggleContrast={() => document.body.classList.toggle("high-contrast")}
//           speakText={() => {
//             const content = document.querySelector("body").innerText;
//             const speech = new SpeechSynthesisUtterance(content);
//             speech.lang = "en-US";
//             window.speechSynthesis.speak(speech);
//           }}
//         />
//       <div className="container form-component login-form">
//         <h2>Sign In</h2>
//         <p>Please Login To Continue</p>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <div
//             style={{
//               gap: "10px",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
//             <p style={{ marginBottom: 0 }}>Not Registered?</p>
//             <Link
//               to={"/register"}
//               style={{ textDecoration: "none", color: "#271776ca" }}
//             >
//               Register Now
//             </Link>
//           </div>
//           <div style={{ justifyContent: "center", alignItems: "center" }}>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;





// Voice Authenticated implementation
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import VoiceCommands from "../components/voicecommand";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/"); // Redirect if the user is already authenticated
    }
  }, [isAuthenticated, navigateTo]);

  // Function to update the state for the fields
  const setFieldValue = (fieldName, value) => {
    if (fieldName === "email") {
      setEmail(value);
    } else if (fieldName === "password") {
      setPassword(value);
    } else if (fieldName === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const triggerLogin = () => {
    document.querySelector("button[type='submit']").click(); // Trigger the login button click
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <VoiceCommands
        toggleContrast={() => document.body.classList.toggle("high-contrast")}
        speakText={() => {
          const content = document.querySelector("body").innerText;
          const speech = new SpeechSynthesisUtterance(content);
          speech.lang = "en-US";
          window.speechSynthesis.speak(speech);
        }}
        setFieldValue={setFieldValue}
        triggerLogin={triggerLogin}
      />
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
 


