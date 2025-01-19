import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import VoiceCommands from "../components/voicecommand";
const Appointment = () => {
  return (
    <>
    
      <Hero
        title={"Schedule Your Appointment | Rohith Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm/>
      <VoiceCommands
          toggleContrast={() => document.body.classList.toggle("high-contrast")}
          speakText={() => {
            const content = document.querySelector("body").innerText;
            const speech = new SpeechSynthesisUtterance(content);
            speech.lang = "en-US";
            window.speechSynthesis.speak(speech);
          }}
        />
    </>
  );
};

export default Appointment;
