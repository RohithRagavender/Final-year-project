// import React, { useEffect } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// const VoiceCommands = ({ toggleContrast, speakText }) => {
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();

//   useEffect(() => {
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       alert("Your browser does not support speech recognition.");
//     }
//   }, []);

//   useEffect(() => {
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       return;
//     }

//     const command = transcript.toLowerCase();
//     console.log("Transcript received:", command);

//     if (command.includes("read")) {
//       console.log("Executing command: read");
//       speakText();
//     } else if (command.includes("stop")) {
//       console.log("Executing command: stop");
//       if (listening) {
//         SpeechRecognition.abortListening(); // Stop recognition
//         console.log("Speech recognition stopped.");
//       }
//       window.speechSynthesis.cancel(); // Stop ongoing speech synthesis
//       resetTranscript(); // Clear transcript
//     } else if (command.includes("down")) {
//       console.log("Executing command: scroll down");
//       window.scrollBy(0, 200);
//     } else if (command.includes("up")) {
//       console.log("Executing command: scroll up");
//       window.scrollBy(0, -200);
//     } else {
//       console.log("No matching command found.");
//     }

//     const resetDelay = setTimeout(() => resetTranscript(), 300);
//     return () => clearTimeout(resetDelay);
//   }, [transcript, toggleContrast, speakText, listening, resetTranscript]);

//   return (
//     <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg">
//     <button
//       onClick={() =>
//         listening
//           ? SpeechRecognition.abortListening() // Stop recognition
//           : SpeechRecognition.startListening({ continuous: true })
//       }
//       className={`px-6 py-3 text-white font-semibold rounded-lg ${
//         listening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
//       }`}
//       aria-label="Start or stop voice commands"
//     >
//       {listening ? "Stop Voice Commands" : "Enable Voice Commands"}
//     </button>
//   </div>

//   );
// };

// export default VoiceCommands;



//Login with Voice Command 

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceCommands = ({ toggleContrast, speakText, setFieldValue }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [activeField, setActiveField] = useState(null); // Track which field is active
  const navigate = useNavigate(); // React Router hook for navigation
  const [spokenText, setSpokenText] = useState("");

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    // Automatically start listening when the component mounts
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return;
    }

    const command = transcript.toLowerCase();
    //console.log("Transcript received:", command);


    // Command to select a field (email, password, confirm password)
    if (command.includes("enter email")) {
      setActiveField("email");
      resetTranscript();
    } else if (command.includes("enter password")) {
      setActiveField("password");
      resetTranscript();
    } else if (command.includes("enter confirm password")) {
      setActiveField("confirmPassword");
      resetTranscript();
    }


    // If the active field is selected, accumulate the spoken text
    if (activeField && command) {
      setSpokenText(transcript); // Set spoken text to the current transcript
    }
    // Fill the active field with the spoken text
    // After a short delay, fill the field with the accumulated text
    const resetDelay = setTimeout(() => {
      if (spokenText.trim()) {
        console.log(`Filling ${activeField} with: ${spokenText}`);
        const sanitizedValue = command.replace(/[^a-zA-Z0-9@.-_ ]/g, ""); // Modify regex as needed to preserve more symbols
        setFieldValue(activeField, sanitizedValue, spokenText.trim()); // Fill the field with the last sentence
        setSpokenText(""); // Clear accumulated text after filling the field
        setActiveField(null); // Reset active field
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${activeField} filled successfully.`)); // Announce when the field is filled
        // Announce the value entered in the field
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${activeField} filled with value: ${spokenText.trim()}`)); // Announce the value

      }
    }, 1500);  // Wait for 1 second to detect when the user stops speaking


    // Handle "login" command to simulate the login button click
    if (command.includes("login")) {
      const loginButton = document.querySelector("button[type='submit']");
      if (loginButton) {
        loginButton.click(); // Trigger click event on login button
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Login button clicked.")); // Announce the action
      }
      resetTranscript();
    }

    // Clear field commands (optional)
    if (command.includes("clear email")) {
      setFieldValue("email", "");
      resetTranscript();
    } else if (command.includes("clear password")) {
      setFieldValue("password", "");
      resetTranscript();
    } else if (command.includes("clear confirm password")) {
      setFieldValue("confirmPassword", "");
      resetTranscript();
    }


    if (command.includes("read")) {
      //console.log("Executing command: read");
      speakText();
    } else if (command.includes("stop")) {
      //console.log("Executing command: stop");
      if (listening) {
        SpeechRecognition.abortListening(); // Stop recognition
        //console.log("Speech recognition stopped.");
      }
      window.speechSynthesis.cancel(); // Stop ongoing speech synthesis
      resetTranscript(); // Clear transcript

      // Restart speech recognition after a short delay
      setTimeout(() => {
        //console.log("Restarting speech recognition...");
        SpeechRecognition.startListening({ continuous: true });
      }, 500); // Restart after 500ms
    } else if (command.includes("down")) {
      //console.log("Executing command: scroll down");
      window.scrollBy(0, 200);
    } else if (command.includes("up")) {
      //console.log("Executing command: scroll up");
      window.scrollBy(0, -200);
    }


      // Navigation commands
      if (command.includes("home")) {
        navigate("/"); // Navigate to Home
      } else if (command.includes("appointment")) {
        navigate("/appointment"); // Navigate to Appointment
      } else if (command.includes("about us")) {
        navigate("/about"); // Navigate to About Us
      } else if (command.includes("accessibility")) {
        navigate("/access"); // Navigate to Accessibility
      } else if (command.includes("settings")) {
        navigate("/setting"); // Navigate to Settings
      } else if (command.includes("register")) {
        navigate("/register"); // Navigate to Register
      }else if(command.includes("login")){
        navigate("/login");
      }else if(command.includes("register")){
        navigate("/register");
      }

    return () => clearTimeout(resetDelay);
  }, [transcript, toggleContrast, speakText, listening, resetTranscript, navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg">
      <p className="text-gray-600">
        {listening ? "Listening for voice commands..." : "Voice commands are inactive."}
      </p>
    </div>
  );
};

export default VoiceCommands;
