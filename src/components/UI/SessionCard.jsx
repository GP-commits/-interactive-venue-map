import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User } from 'lucide-react';

const SessionCard = ({ isOpen, onClose, zoneId, title, color }) => {
    // Mock data based on zoneId
    const getSessionData = (id) => {
        switch (id) {
            case 'diner':
                return {
                    title: "The Brick Diner",
                    speaker: "Best Burgers in Town",
                    time: "07:00 AM - 11:00 PM",
                    desc: "A classic retro diner serving all-day breakfast, milkshakes, and our famous brick-oven pizza.",
                    image: "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
            case 'supermarket':
                return {
                    title: "SuperMart Fresh",
                    speaker: "Groceries & More",
                    time: "24/7 Open",
                    desc: "Your one-stop shop for fresh produce, snacks, and daily essentials. Located in the shopping district.",
                    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
            case 'main-hall':
                return {
                    title: "City Hall & Events",
                    speaker: "Public Administration",
                    time: "09:00 AM - 05:00 PM",
                    desc: "The heart of the city. Visit for town hall meetings, community events, and historical tours.",
                    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
            case 'library':
                return {
                    title: "Public Library",
                    speaker: "Knowledge Center",
                    time: "08:00 AM - 08:00 PM",
                    desc: "A quiet space for reading, studying, and free Wi-Fi access. Don't forget to check out our history section.",
                    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
            case 'tech-hub':
                return {
                    title: "Innovation Tech Hub",
                    speaker: "Co-working Space",
                    time: "24/7 Access",
                    desc: "State-of-the-art office spaces for startups and tech enthusiasts. Hosting daily workshops.",
                    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
            default:
                return {
                    title: title || "Unknown Place",
                    speaker: "Information",
                    time: "--:--",
                    desc: "Explore the city map to find more locations.",
                    image: "https://images.unsplash.com/photo-1449824913929-223aa2cd3d90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                };
        }
    };

    if (!isOpen) return null;

    const data = getSessionData(zoneId);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4"
                    >
                        <motion.div
                            className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative pointer-events-auto"
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Header Image */}
                            <div className="h-56 relative group">
                                <img src={data.image} alt="Header" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all backdrop-blur-md"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 relative">
                                {/* Floating Tag */}
                                <div
                                    className="absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md text-white"
                                    style={{ backgroundColor: color || '#333' }}
                                >
                                    {title}
                                </div>

                                <h2 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">{data.title}</h2>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{data.desc}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <User size={18} className="text-gray-400" />
                                        <span className="truncate">{data.speaker}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <Clock size={18} className="text-gray-400" />
                                        <span>{data.time}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full py-4 rounded-xl font-bold text-white uppercase tracking-wider transition-transform active:scale-95 shadow-lg"
                                    style={{ backgroundColor: color || '#3b82f6' }}
                                >
                                    Visit Location
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SessionCard;
