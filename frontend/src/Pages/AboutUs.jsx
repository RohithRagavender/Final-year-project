import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import VoiceCommands from "../components/voicecommand";
const AboutUs = () => {
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
        title={"Learn More About Us | Rohith Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
