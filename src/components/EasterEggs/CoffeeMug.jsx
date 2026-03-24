import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import useGameStore from '../../store/gameStore';

const CoffeeMug = () => {
    const foundCoffee = useGameStore((state) => state.foundCoffee);
    const isFound = useGameStore((state) => state.coffeeFound); // Check specific flag

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent zone click
        foundCoffee();
    };

    if (isFound) return null; // Hide after finding? Or maybe stay as a trophy? Let's hide it to clean up.

    return (
        <motion.div
            className="absolute bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20 shadow-lg cursor-pointer hover:bg-white/20"
            // Isometric positioning adjustment for being inside a transformed zone
            style={{
                bottom: '20%',
                right: '20%',
                transform: 'rotateX(-60deg) rotateZ(45deg)', // Counter-rotate to face camera roughly or just stand up
            }}
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={handleClick}
        >
            <div className="relative">
                <Coffee size={20} className="text-amber-500" />
                {/* Steam animation */}
                <motion.div
                    className="absolute -top-3 left-1 w-1 h-3 bg-white/50 rounded-full blur-[1px]"
                    animate={{ opacity: [0, 1, 0], y: -10 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute -top-2 left-3 w-1 h-2 bg-white/50 rounded-full blur-[1px]"
                    animate={{ opacity: [0, 1, 0], y: -8 }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

export default CoffeeMug;
