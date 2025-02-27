'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Phone, PhoneCall, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { personalities, Personality } from '@/constants/personalities';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedRecents = localStorage.getItem('recents');
    if (storedRecents) {
      setRecents(JSON.parse(storedRecents));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addToRecents = (id: string) => {
    const newRecents = [id, ...recents.filter(rec => rec !== id)].slice(0, 10);
    setRecents(newRecents);
    localStorage.setItem('recents', JSON.stringify(newRecents));
  };

  const router = useRouter();

  const handleStartCall = (personality: Personality) => {
    addToRecents(personality.id);
    router.push(`/call?personality=${personality.id}`);
  };

  const filteredPersonalities = personalities.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPersonalities = selectedTab === 'favorites'
    ? filteredPersonalities.filter(p => favorites.includes(p.id))
    : selectedTab === 'recents'
      ? filteredPersonalities.filter(p => recents.includes(p.id))
      : filteredPersonalities;

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-full border border-emerald-400/30 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-black/20 backdrop-blur-sm rounded-full p-1">
          <button
            onClick={() => setSelectedTab('favorites')}
            className={`flex-1 py-2 text-sm font-medium rounded-full ${selectedTab === 'favorites' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'}`}
          >
            <Star className="h-4 w-4 inline-block mr-2" />
            Favorites
          </button>
          <button
            onClick={() => setSelectedTab('recents')}
            className={`flex-1 py-2 text-sm font-medium rounded-full ${selectedTab === 'recents' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'}`}
          >
            <Clock className="h-4 w-4 inline-block mr-2" />
            Recents
          </button>
          <button
            onClick={() => setSelectedTab('contacts')}
            className={`flex-1 py-2 text-sm font-medium rounded-full ${selectedTab === 'contacts' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'}`}
          >
            <Phone className="h-4 w-4 inline-block mr-2" />
            Contacts
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 space-y-2">
          {displayedPersonalities.map((personality) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={personality.id}
              className="flex items-center gap-4 p-3 hover:bg-black/20 rounded-xl transition-colors"
            >
              <div
                onClick={() => handleStartCall(personality)}

                className=" cursor-pointer relative w-12 h-12 rounded-full overflow-hidden border border-emerald-400/30">
                <img
                  src={personality.avatar}
                  alt={personality.name}
                  className="object-cover bg-white"
                />
              </div>
              <div className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleStartCall(personality)}
              >
                <h3 className="text-white font-medium">{personality.name}</h3>
                <p className="text-gray-400 text-sm">{personality.role}</p>
                <p className="text-gray-400 text-sm">{personality.phone}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(personality.id)}
                  className={`p-2 rounded-full ${favorites.includes(personality.id) ? 'text-emerald-400' : 'text-gray-400'} hover:bg-black/20`}
                >
                  <Star className="h-5 w-5" />
                </button>
                <Button
                  onClick={() => handleStartCall(personality)}
                  className="p-2 h-8 w-8 rounded-full bg-emerald-500"
                >
                  <PhoneCall size={16} />
                </Button>

                <Button
                  disabled
                  className="p-2 h-8 w-8 rounded-full"
                >
                  <Video size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
