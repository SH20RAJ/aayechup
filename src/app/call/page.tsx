'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Video, Mic, Share2, Volume2, PhoneOff, ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalities } from '@/constants/personalities';
import { useSearchParams } from 'next/navigation';

export default function CallPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const personality = personalities.find(p => p.id === id);

  if (!personality) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex items-center justify-center">
        <h1 className="text-2xl text-white">Personality not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex flex-col items-center justify-between p-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between text-white py-4 px-2 sm:px-6"
      >
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <ChevronDown className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center gap-6"
      >
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg shadow-emerald-900/20">
          <Image
            src={personality.avatar}
            alt={personality.name}
            fill
            className="object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{personality.name}</h1>
          <p className="text-emerald-300 text-lg font-medium mb-2">{personality.role}</p>
          <p className="text-emerald-200/80 text-sm">{personality.description}</p>
        </motion.div>
      </motion.div>

      {/* Call Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-full p-4 mb-8 shadow-lg"
      >
        <div className="flex items-center justify-between px-8">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full transition-all duration-300",
              isVideoOn 
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            <Video className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full transition-all duration-300",
              isMuted 
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
            onClick={() => setIsMuted(!isMuted)}
          >
            <Mic className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          >
            <Share2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          >
            <Volume2 className="h-6 w-6" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full hover:bg-red-600/90 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}