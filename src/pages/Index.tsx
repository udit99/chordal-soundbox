
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChordButton from "@/components/ChordButton";

const Index = () => {
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const chords = {
    CMaj: ["C4", "E4", "G4"],
    Amin: ["A3", "C4", "E4"],
    FMaj: ["F3", "A3", "C4"],
    GMaj: ["G3", "B3", "D4"],
  };

  useEffect(() => {
    const initializeSampler = async () => {
      const newSampler = new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          A2: "A2.mp3",
        },
        baseUrl: "/samples/",
        onload: () => {
          setIsLoading(false);
        },
      }).toDestination();

      setSampler(newSampler);
    };

    initializeSampler();
  }, []);

  const playChord = async (chordName: keyof typeof chords) => {
    if (!sampler) return;
    
    if (Tone.context.state === "suspended") {
      await Tone.start();
    }
    
    sampler.triggerAttackRelease(chords[chordName], "2n");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 rounded-full">
              Piano Chords
            </span>
            <h1 className="text-3xl font-light tracking-tight">
              Chord Player
            </h1>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-neutral-400">Loading sounds...</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {Object.keys(chords).map((chordName) => (
                <ChordButton
                  key={chordName}
                  chord={chordName}
                  onClick={() => playChord(chordName as keyof typeof chords)}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Index;
