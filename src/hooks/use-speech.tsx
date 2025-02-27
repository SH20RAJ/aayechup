// // @ts-nocheck
// 'use client';

// import { useState, useEffect, useCallback } from 'react';

// interface SpeechRecognitionEvent extends Event {
//   resultIndex: number;
//   results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   error: string;
// }

// interface SpeechRecognition extends EventTarget {
//   continuous: boolean;
//   interimResults: boolean;
//   lang: string;
//   onresult: (event: SpeechRecognitionEvent) => void;
//   onerror: (event: SpeechRecognitionErrorEvent) => void;
//   onend: () => void;
//   start: () => void;
//   stop: () => void;
// }

// interface Window {
//   SpeechRecognition?: new () => SpeechRecognition;
//   webkitSpeechRecognition?: new () => SpeechRecognition;
// }

// type SpeechHookReturn = {
//   transcript: string;
//   isListening: boolean;
//   startListening: () => void;
//   stopListening: () => void;
//   error: string | null;
// };

// export function useSpeech(): SpeechHookReturn {
//   const [transcript, setTranscript] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Check if browser supports speech recognition
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onresult = (event) => {
//           const current = event.resultIndex;
//           const transcript = event.results[current][0].transcript;
//           setTranscript(transcript);
//         };

//         recognition.onerror = (event) => {
//           setError(event.error);
//           setIsListening(false);
//         };

//         recognition.onend = () => {
//           setIsListening(false);
//         };

//         setRecognition(recognition);
//       } else {
//         setError('Speech recognition is not supported in this browser');
//       }
//     }
//   }, []);

//   const startListening = useCallback(() => {
//     if (recognition) {
//       try {
//         recognition.start();
//         setIsListening(true);
//         setError(null);
//       } catch (err) {
//         setError('Error starting speech recognition');
//       }
//     }
//   }, [recognition]);

//   const stopListening = useCallback(() => {
//     if (recognition) {
//       recognition.stop();
//       setIsListening(false);
//     }
//   }, [recognition]);

//   return {
//     transcript,
//     isListening,
//     startListening,
//     stopListening,
//     error
//   };
// }