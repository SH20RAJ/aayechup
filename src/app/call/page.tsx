'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Video, Mic, Share2, Volume2, PhoneOff } from 'lucide-react';

export default function CallPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex flex-col items-center justify-between p-4">
      {/* Header */}
      <div className="w-full flex items-center justify-between text-white py-4">
        <button className="p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button className="p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400">
          <Image
            src="/default-avatar.jpg"
            alt="Caller"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold text-white">Julian Smith</h1>
        <p className="text-gray-300">Calling...</p>
      </div>

      {/* Call Controls */}
      <div className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-full p-4 mb-8">
        <div className="flex items-center justify-between px-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            <Video className={cn("h-6 w-6", isVideoOn && "text-emerald-400")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            <Mic className={cn("h-6 w-6", isMuted && "text-emerald-400")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Share2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Volume2 className="h-6 w-6" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full hover:bg-red-600"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}