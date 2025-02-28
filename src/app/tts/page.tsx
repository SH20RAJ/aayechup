'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function TTSPage() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleSpeak = () => {
    if (!text) return;
  
    window.speechSynthesis.cancel(); // Stop any previous speech
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
  
    utterance.onstart = () => {
      console.log("Speech started");
      setIsPlaying(true);
    };
    utterance.onend = () => {
      console.log("Speech ended");
      setIsPlaying(false);
      speechRef.current = null; // Clear reference
    };
    utterance.onerror = (e) => {
      console.error("Speech error:", e);
      setIsPlaying(false);
      speechRef.current = null;
    };
  
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };
  

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex flex-col items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white text-center">Text to Speech</h1>
          <p className="text-emerald-400 text-center">Convert your text into natural-sounding speech</p>
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[200px] bg-black/20 backdrop-blur-sm border-emerald-400/30 text-white placeholder:text-gray-400"
        />

        <div className="space-y-4 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30">
          <div className="space-y-2">
            <label className="text-sm text-emerald-400">Speech Rate</label>
            <Slider
              value={[rate]}
              onValueChange={(value) => setRate(value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-emerald-400">Pitch</label>
            <Slider
              value={[pitch]}
              onValueChange={(value) => setPitch(value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {isPlaying ? (
            <Button
              onClick={handlePause}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          ) : (
            <Button
              onClick={text ? (speechRef.current ? handleResume : handleSpeak) : undefined}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={!text}
            >
              <Play className="w-4 h-4 mr-2" />
              {speechRef.current ? 'Resume' : 'Speak'}
            </Button>
          )}

          <Button
            onClick={handleStop}
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10"
            disabled={!isPlaying && !speechRef.current}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
