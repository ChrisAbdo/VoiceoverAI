"use client";

import { VoiceSelector } from "@/components/voice-selector";
import React, { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(""); // State for the selected voice
  const [audio, setAudio] = useState<string | undefined>(undefined);

  async function createTTS() {
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, voice: voice }), // Include the voice in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const audioBlob = await response.blob();
      setAudio(URL.createObjectURL(audioBlob));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>TTS Demo</h1>
      <VoiceSelector onVoiceSelect={setVoice} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for TTS"
        className="border"
      />
      <button className="border" onClick={createTTS}>
        Create TTS
      </button>
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
}
