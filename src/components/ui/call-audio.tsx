'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CallAudioProps {
  isMuted: boolean;
  onSpeechResult?: (text: string) => void;
  onAIResponse?: (text: string) => void;
  className?: string;
}

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

interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

export function CallAudio({
  isMuted,
  onSpeechResult,
  onAIResponse,
  className
}: CallAudioProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcriptText = result[0].transcript;
          
          if (result.isFinal && onSpeechResult) {
            onSpeechResult(transcriptText);
          }
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

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onSpeechResult]);

  useEffect(() => {
    if (recognition) {
      if (isMuted && isListening) {
        recognition.stop();
      } else if (!isMuted && !isListening) {
        try {
          recognition.start();
          setIsListening(true);
        } catch (error) {
          console.error('Failed to start recognition:', error);
        }
      }
    }
  }, [isMuted, recognition, isListening]);

  const speakAIResponse = (text: string) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      speechSynthesisRef.current = null;
      if (!isMuted && recognition) {
        try {
          recognition.start();
          setIsListening(true);
        } catch (error) {
          console.error('Failed to restart recognition:', error);
        }
      }
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    if (isListening && recognition) {
      recognition.stop();
    }
  };

  useEffect(() => {
    if (onAIResponse) {
      speakAIResponse(onAIResponse);
    }
  }, [onAIResponse]);

  return null; // This component handles audio interactions without visual elements
}