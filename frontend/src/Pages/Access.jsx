import React, { useState, useEffect } from "react";
import "../components/access.css";
import VoiceCommands from "../components/voicecommand";
function Access() {

  // Toggle High Contrast Mode
  const toggleContrast = () => {
    setIsHighContrast((prev) => !prev);
  };

  // Text-to-Speech
  const speakText = () => {
    const text = document.getElementById("textContent").innerText;
    if (text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1; // Default rate
      speech.pitch = 1; // Default pitch
      window.speechSynthesis.speak(speech);
    }
  };

  // Voice Commands
  useEffect(() => {
    // Feature detection for Speech Recognition API
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognition =
        new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = false; // Don't show results until fully recognized

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", command); // For debugging
        if (command.includes("read")) {
          speakText();
        } else if (command.includes("contrast")) {
          toggleContrast();
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, []);

  return (
    <div className="hero container">
        <VoiceCommands
          toggleContrast={() => document.body.classList.toggle("high-contrast")}
          speakText={() => {
            const content = document.querySelector("body").innerText;
            const speech = new SpeechSynthesisUtterance(content);
            speech.lang = "en-US";
            window.speechSynthesis.speak(speech);
          }}
        />
      <div>
        <header>
          <h1 id="pageTitle">Welcome to Medify Accessibility</h1>
        </header>
        <main>
          <section>
            <p id="textContent">
                <ul>
                    In Our Page You Can Access The Following Features<br></br>
                    First One is Our Home Page<br></br>
                    Second One is Our Appointment Page<br></br>
                    Third One is  About Us Page<br></br>
                    Fourth One is Accessibility Page <br></br>
                    Fifth One is Setting Page <br></br>
                    And the Sixth One At Right Side Of The Page You Can See The Login
                    <br />
                    <br />
                    <ul>
                        <h5>In the Login Page you want to Enter the your Register Mail Id And Password and Confirm Password</h5>
                        <h5>If you don't have register Email Id in Login Page There is option for the New Registeration Page where you can Register For New user</h5>
                    </ul>
                    <br />
                    <ul>
                        And the Fifth One is the Access Page
                        Here You Can Access The Following Features
                        <ul>
                            <h5>First One is Read Aloud</h5>
                        </ul>
                    </ul>
                </ul>
            </p>
            <button onClick={speakText}>Read Aloud</button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Access;



