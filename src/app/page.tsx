'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type AIContact = {
  id: string;
  name: string;
  avatar: string;
  lastCall: string;
  status?: string;
  location?: string;
};

const aiContacts: AIContact[] = [
  {
    id: '1',
    name: 'Alex',
    avatar: '/avatars/alex.jpg',
    lastCall: '2 hours ago',
    status: 'Missed call'
  },
  {
    id: '2',
    name: 'Dr. Sarah',
    avatar: '/avatars/sarah.jpg',
    lastCall: 'Yesterday',
    location: 'Mobile'
  },
  {
    id: '3',
    name: 'Max',
    avatar: '/avatars/max.jpg',
    lastCall: '2 days ago',
    status: 'Voicemail'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex flex-col">
      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pt-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-full border border-emerald-400/30 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-black/20 backdrop-blur-sm rounded-full p-1">
          {['Favorites', 'Recents', 'Contacts'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium rounded-full ${tab === 'Recents' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contacts List */}
        <div className="flex-1 space-y-2">
          {aiContacts.map((contact) => (
            <Link
              key={contact.id}
              href={`/call?personality=${contact.id}`}
              className="block"
            >
              <div className="flex items-center gap-4 p-3 hover:bg-black/20 rounded-xl transition-colors">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-400/30">
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium">{contact.name}</h3>
                  <div className="flex items-center gap-2">
                    {contact.status && (
                      <span className="text-emerald-400 text-sm">{contact.status}</span>
                    )}
                    <span className="text-gray-400 text-sm">{contact.lastCall}</span>
                    {contact.location && (
                      <span className="text-gray-400 text-sm">• {contact.location}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
          >
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
          </Button>
        </div>
      </main>
    </div>
  );
}
