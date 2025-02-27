'use client';

import { useState } from 'react';
import Image from 'next/image';
 import { Button } from '@/components/ui/button';

type Personality = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  traits: string[];
};

const personalities: Personality[] = [
  {
    id: '1',
    name: 'Alex',
    description: 'A friendly and empathetic companion who&nbsp;s great at active listening.',
    avatar: '/avatars/alex.jpg',
    traits: ['Empathetic', 'Patient', 'Supportive']
  },
  {
    id: '2',
    name: 'Dr. Sarah',
    description: 'An analytical mind who helps you explore thoughts and ideas deeply.',
    avatar: '/avatars/sarah.jpg',
    traits: ['Analytical', 'Insightful', 'Professional']
  },
  {
    id: '3',
    name: 'Max',
    description: 'Your go-to friend for creative brainstorming and motivation.',
    avatar: '/avatars/max.jpg',
    traits: ['Creative', 'Energetic', 'Inspiring']
  }
];

export default function PersonalitiesPage() {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);

  const handleStartCall = () => {
    if (selectedPersonality) {
      // TODO: Implement call initiation logic
      window.location.href = `/call?personality=${selectedPersonality}`;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Choose Your Companion</h1>
        <p className="text-gray-300 mb-8">Select an AI personality to start your conversation</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalities.map((personality) => (
            <div
              key={personality.id}
              className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all ${selectedPersonality === personality.id ? 'ring-2 ring-emerald-400' : 'hover:bg-black/30'}`}
              onClick={() => setSelectedPersonality(personality.id)}
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-400">
                <Image
                  src={personality.avatar}
                  alt={personality.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">
                {personality.name}
              </h3>
              <p className="text-gray-300 text-center mb-4">
                {personality.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {personality.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleStartCall}
            disabled={!selectedPersonality}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 text-lg"
          >
            Start Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}