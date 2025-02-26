import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceCommands = ({ toggleContrast, speakText, setFieldValue }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [activeField, setActiveField] = useState(null);
  const [spokenText, setSpokenText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Memoized functions
  const handleSetFieldValue = useCallback((fieldName, value) => {
    setFieldValue(fieldName, value);
  }, [setFieldValue]);

  const handleSpeakText = useCallback(() => {
    speakText();
  }, [speakText]);

  const handleToggleContrast = useCallback(() => {
    toggleContrast();
  }, [toggleContrast]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    resetTranscript();
  }, [navigate, resetTranscript]);

  const sanitizeInput = useCallback((text) => {
    return text.replace(/\.$/, "").trim();
  }, []);

  // Function to speak in a sweet female voice
  const speakWithSweetVoice = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google UK English Female")) || speechSynthesis.getVoices()[0]; 
    utterance.pitch = 1.3; 
    utterance.rate = 1; 
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return;
    }

    const command = transcript.toLowerCase();

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

    if (activeField && command) {
      setSpokenText(transcript);
    }

    const resetDelay = setTimeout(() => {
      if (spokenText.trim()) {
        const sanitizedValue = sanitizeInput(spokenText);
        handleSetFieldValue(activeField, sanitizedValue);
        setSpokenText("");
        setActiveField(null);
        speakWithSweetVoice(`${activeField} filled with value: ${sanitizedValue}`);
      }
    }, 1500);

    if (command.includes("login") && !isLoggedIn) {
      const loginButton = document.querySelector("button[type='submit']");
      if (loginButton) {
        loginButton.click();
        setIsLoggedIn(true);
        speakWithSweetVoice("Login button clicked.");
      }
      resetTranscript();
    }

    if (command.includes("clear email")) {
      handleSetFieldValue("email", "");
      resetTranscript();
    } else if (command.includes("clear password")) {
      handleSetFieldValue("password", "");
      resetTranscript();
    } else if (command.includes("clear confirm password")) {
      handleSetFieldValue("confirmPassword", "");
      resetTranscript();
    }

    if (command.includes("read")) {
      handleSpeakText();
    } else if (command.includes("stop")) {
      if (listening) {
        SpeechRecognition.abortListening();
      }
      speechSynthesis.cancel();
      resetTranscript();

      setTimeout(() => {
        SpeechRecognition.startListening({ continuous: true });
      }, 500);
    } else if (command.includes("down")) {
      window.scrollBy(0, 200);
    } else if (command.includes("up")) {
      window.scrollBy(0, -200);
    }

    if (command.includes("home")) {
      handleNavigation("/");
    } else if (command.includes("appointment")) {
      handleNavigation("/appointment");
    } else if (command.includes("about us")) {
      handleNavigation("/about");
    } else if (command.includes("accessibility")) {
      handleNavigation("/access");
    } else if (command.includes("settings")) {
      handleNavigation("/setting");
    } else if (command.includes("register")) {
      handleNavigation("/register");
    } else if (command.includes("user")) {
      handleNavigation("/login");
    }

    // **Logout Command**
    if (command.includes("logout") && isLoggedIn) {
      const logoutButton = document.querySelector("button.logout");
      if (logoutButton) {
        logoutButton.click();
        setIsLoggedIn(false);
        speakWithSweetVoice("Logout successful.");
      }
      resetTranscript();
    }

    return () => clearTimeout(resetDelay);
  }, [
    transcript,
    activeField,
    spokenText,
    listening,
    resetTranscript,
    handleSetFieldValue,
    handleSpeakText,
    handleNavigation,
    sanitizeInput,
    isLoggedIn,
  ]);

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg">
      <p className="text-gray-600">
        {listening
          ? "Listening for voice commands..."
          : "Voice commands are inactive."}
      </p>
    </div>
  );
};

export default VoiceCommands;
