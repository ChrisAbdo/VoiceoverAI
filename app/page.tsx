"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VoiceSelector } from "@/components/voice-selector";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [audio, setAudio] = useState<string | undefined>(undefined);

  async function createTTS() {
    const processedText = text
      .replace(/\n/g, ". ")
      .replace(/\?/g, '? <break time="1s"/>');

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: processedText, voice: voice }),
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
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-foreground">
            Generate AI Voiceover
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            You can choose from several voices and languages. You will have the
            option to directly lay the audio over your video or download the
            audio file and edit it to your liking.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTTS();
          }}
          className="bg-background border shadow-sm sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="voice"
                  className="block text-sm font-medium leading-6 text-foreground"
                >
                  Choose a Voice
                </label>
                <div className="mt-2">
                  <VoiceSelector onVoiceSelect={setVoice} />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="script"
                  className="block text-sm font-medium leading-6 text-foreground"
                >
                  Video Script
                </label>
                <div className="mt-2">
                  <Textarea
                    id="script"
                    name="script"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    placeholder="Enter text for voiceover"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  This is what the AI will read.
                </p>
              </div>

              {/* <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-foreground">
                  Optional Settings
                </label>
                <div className="mt-4">
                  <div className="items-top flex space-x-2 mt-1">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Layer audio over video
                      </label>
                      <p className="text-sm text-muted-foreground">
                        This will not be great. Try it out and see if it works!
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-span-full">
                <Collapsible>
                  <CollapsibleTrigger className="block text-sm font-medium leading-6 text-foreground">
                    Optional Settings{" "}
                    <span className="text-muted-foreground">&darr;</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="items-top flex space-x-2 mt-1">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Layer audio over video
                        </label>
                        <p className="text-sm text-muted-foreground">
                          This will not be great. Try it out and see if it
                          works!
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t px-4 py-4 sm:px-8">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </div>

      {audio ? (
        <audio controls src={audio}></audio>
      ) : (
        "Your audio will appear here"
      )}
    </div>
  );
}
