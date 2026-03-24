import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EVENTS = [
    { id: 1, time: '14:00', title: 'Opening Ceremony', location: 'City Hall', status: 'completed', zoneId: 'main-hall' },
    { id: 2, time: '15:30', title: 'Tech Talk: Future Cities', location: 'Tech Hub', status: 'live', zoneId: 'tech-hub' },
    { id: 3, time: '17:00', title: 'Happy Hour', location: 'The Diner', status: 'upcoming', zoneId: 'diner' },
    { id: 4, time: '19:00', title: 'Live Concert', location: 'Main Stage', status: 'upcoming', zoneId: 'main-hall' },
    { id: 5, time: '21:00', title: 'Night Market', location: 'SuperMart', status: 'upcoming', zoneId: 'supermarket' }
];

const RightSidebar = ({ onEventClick }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const liveEvent = EVENTS.find(e => e.status === 'live');

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl border-l border-black/5 shadow-2xl flex flex-col pointer-events-auto z-40 mt-16"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-black/5 bg-gradient-to-r from-blue-50 to-white">
                            <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                                <span className="text-blue-500">EVENT</span> GUIDE
                            </h2>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 font-mono">
                                <Clock size={14} />
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        {/* Current Happening */}
                        {liveEvent && (
                            <div className="p-4 m-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <Activity size={48} />
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold animate-pulse">LIVE NOW</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-1">{liveEvent.title}</h3>
                                <div className="flex items-center gap-1 text-blue-100 text-sm">
                                    <MapPin size={12} />
                                    {liveEvent.location}
                                </div>
                            </div>
                        )}

                        {/* Schedule List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Schedule</h3>

                            {EVENTS.map((event) => (
                                <button
                                    key={event.id}
                                    onClick={() => onEventClick && onEventClick(event.zoneId)}
                                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all border text-left ${event.status === 'live' ? 'bg-blue-50 border-blue-100' :
                                            event.status === 'completed' ? 'opacity-50 grayscale' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm hover:scale-[1.02]'
                                        }`}
                                >
                                    <div className="flex flex-col items-center min-w-[3rem]">
                                        <span className="text-sm font-bold text-gray-800">{event.time}</span>
                                        <div className={`h-full w-0.5 rounded-full mt-1 ${event.status === 'completed' ? 'bg-gray-300' : 'bg-blue-200'}`} />
                                    </div>

                                    <div className="flex-1 pb-2">
                                        <h4 className="font-bold text-gray-800 text-sm">{event.title}</h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <MapPin size={10} /> {event.location}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute right-0 top-24 z-50 bg-white p-2 rounded-l-xl shadow-lg border-y border-l border-gray-200 text-gray-600 hover:text-blue-600 transition-transform active:scale-95"
                style={{ right: isOpen ? '320px' : '0' }}
            >
                {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

        </>
    );
};

export default RightSidebar;
