import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import useGameStore from '../../store/gameStore';

const BadgeOverlay = () => {
    const badges = useGameStore((state) => state.badges);
    const [visibleBadge, setVisibleBadge] = useState(null);

    useEffect(() => {
        // When badges array changes, show the last earned badge
        if (badges.length > 0) {
            const lastBadge = badges[badges.length - 1];
            setVisibleBadge(lastBadge);

            const timer = setTimeout(() => {
                setVisibleBadge(null);
            }, 3000); // Show for 3 seconds

            return () => clearTimeout(timer);
        }
    }, [badges]);

    // Map badge IDs to friendly names and descriptions
    const getBadgeInfo = (id) => {
        const info = {
            'explorer': { title: 'Venue Explorer', desc: 'You visited every zone!' },
            'caffeine-addict': { title: 'Caffeine Boost', desc: 'You found the hidden coffee!' },
        };
        return info[id] || { title: 'Badge Unlocked', desc: '' };
    };

    return (
        <AnimatePresence>
            {visibleBadge && (
                <motion.div
                    className="fixed top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 p-[2px] rounded-xl shadow-2xl">
                        <div className="bg-zinc-900 rounded-xl px-6 py-4 flex items-center gap-4 min-w-[300px]">
                            <div className="bg-yellow-500/20 p-3 rounded-full">
                                <Award size={32} className="text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-yellow-400 font-bold text-lg leading-none">
                                    {getBadgeInfo(visibleBadge).title}
                                </h3>
                                <p className="text-zinc-400 text-sm mt-1">
                                    {getBadgeInfo(visibleBadge).desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BadgeOverlay;
