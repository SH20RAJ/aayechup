// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Mic, Copy, Trash2 } from 'lucide-react';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

// interface Window {
//   SpeechRecognition?: new () => SpeechRecognition;
//   webkitSpeechRecognition?: new () => SpeechRecognition;
// }

export default function STTPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [language, setLanguage] = useState('en-US');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcriptText = result[0].transcript;
          const confidence = result[0].confidence;

          setTranscript(transcriptText);
          setAccuracy(Math.round(confidence * 100));
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setAccuracy(0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex flex-col items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white text-center">Speech to Text</h1>
          <p className="text-emerald-400 text-center">Convert your speech into text with real-time accuracy</p>
        </div>

        <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-emerald-400 border border-emerald-400/30 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>

          {accuracy > 0 && (
            <div className="text-emerald-400">
              <span className="font-semibold">{accuracy}%</span> accuracy
            </div>
          )}
        </div>

        <Textarea
          value={transcript}
          readOnly
          placeholder="Your speech will appear here..."
          className="min-h-[200px] bg-black/20 backdrop-blur-sm border-emerald-400/30 text-white placeholder:text-gray-400"
        />

        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleListening}
            className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white transition-colors duration-300`}
          >
            <Mic className="w-4 h-4 mr-2" />
            {isListening ? 'Stop' : 'Start'} Recording
          </Button>

          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10"
            disabled={!transcript}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>

          <Button
            onClick={clearTranscript}
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10"
            disabled={!transcript}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
