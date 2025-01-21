import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import "regenerator-runtime/runtime";
import VoiceCommands from "../components/voicecommand";


const Home = () => {
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
        />
      <Hero
        title={
          "Welcome to Rohith Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;


// function hero() {
//   const [isHighContrast, setIsHighContrast] = useState(false);

//   // Toggle High Contrast Mode
//   const toggleContrast = () => {
//     setIsHighContrast((prev) => !prev);
//   };

//   // Text-to-Speech
//   const speakText = () => {
//     const text = document.getElementById("textContent").innerText;
//     if (text) {
//       const speech = new SpeechSynthesisUtterance(text);
//       speech.lang = "en-US";
//       speech.rate = 1; // Default rate
//       speech.pitch = 1; // Default pitch
//       window.speechSynthesis.speak(speech);
//     }
//   };

//   // Voice Commands
//   useEffect(() => {
//     // Feature detection for Speech Recognition API
//     if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
//       const recognition =
//         new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       recognition.lang = "en-US";
//       recognition.interimResults = false; // Don't show results until fully recognized

//       recognition.onresult = (event) => {
//         const command = event.results[0][0].transcript.toLowerCase();
//         console.log("Voice Command:", command); // For debugging
//         if (command.includes("read")) {
//           speakText();
//         } else if (command.includes("contrast")) {
//           toggleContrast();
//         }
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//       };

//       recognition.start();
//     } else {
//       console.warn("Speech recognition is not supported in this browser.");
//     }
//   }, []);

//   return (
//     <div className="hero container">
//       <div className={isHighContrast ? "high-contrast" : ""}>
//         <header>
//           <h1 id="pageTitle">Welcome to Medify Accessibility</h1>
//           <button onClick={toggleContrast}>Toggle High Contrast</button>
//         </header>
//         <main>
//           <section>
//             <p id="textContent">
//        </p>
//             <button onClick={speakText}>Read Aloud</button>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }




