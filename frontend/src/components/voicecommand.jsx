import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceCommands = ({ toggleContrast, speakText }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return;
    }

    const command = transcript.toLowerCase();
    console.log("Transcript received:", command);

    if (command.includes("read")) {
      console.log("Executing command: read");
      speakText();
    } else if (command.includes("stop")) {
      console.log("Executing command: stop");
      if (listening) {
        SpeechRecognition.abortListening(); // Stop recognition
        console.log("Speech recognition stopped.");
      }
      window.speechSynthesis.cancel(); // Stop ongoing speech synthesis
      resetTranscript(); // Clear transcript
    } else if (command.includes("down")) {
      console.log("Executing command: scroll down");
      window.scrollBy(0, 200);
    } else if (command.includes("up")) {
      console.log("Executing command: scroll up");
      window.scrollBy(0, -200);
    } else {
      console.log("No matching command found.");
    }

    const resetDelay = setTimeout(() => resetTranscript(), 300);
    return () => clearTimeout(resetDelay);
  }, [transcript, toggleContrast, speakText, listening, resetTranscript]);

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg">
    <button
      onClick={() =>
        listening
          ? SpeechRecognition.abortListening() // Stop recognition
          : SpeechRecognition.startListening({ continuous: true })
      }
      className={`px-6 py-3 text-white font-semibold rounded-lg ${
        listening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
      aria-label="Start or stop voice commands"
    >
      {listening ? "Stop Voice Commands" : "Enable Voice Commands"}
    </button>
  </div>
  
  );
};

export default VoiceCommands;
