'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChatUI } from '@/components/ui/chat';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalities } from '@/constants/personalities';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

function ChatContent() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const personality_id = searchParams.get('personality');

    const personality = personalities.find(p => p.id === personality_id);

    const handleBack = () => {
        router.push('/');
    };

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: `${personality?.name || 'AI'} response: I received your message - "${content}"`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
    };

    if (!personality) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950 flex items-center justify-center">
                <h1 className="text-2xl text-white">Personality not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-gray-950">
            <div className="h-screen flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between p-4 text-white border-b border-white/10"
                >
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-white/10"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400">
                                <Image
                                    src={personality.avatar}
                                    alt={personality.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold">{personality.name}</h2>
                                <p className="text-sm text-emerald-300">{personality.role}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1"
                    >
                        <ChatUI
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            onStartRecording={handleStartRecording}
                            onStopRecording={handleStopRecording}
                            isRecording={isRecording}
                            className="h-full bg-transparent"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <AnimatePresence>
            <motion.div
                key="chat-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <ChatContent />
            </motion.div>
        </AnimatePresence>
    );
}

export const viewport = {
    themeColor: '#065f46'
};