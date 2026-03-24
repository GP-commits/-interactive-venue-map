import React, { useState } from 'react';
import { Sun, Moon, Map, CloudRain } from 'lucide-react';
import useGameStore from '../../store/gameStore';
import SearchBar from './SearchBar';

const Header = ({ zones, isRainy, onToggleRain }) => {
    const theme = useGameStore((state) => state.theme);
    const toggleTheme = useGameStore((state) => state.toggleTheme);

    return (
        <div className="fixed top-0 left-0 w-full h-16 z-[60] px-6 flex items-center justify-between
                    bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm transition-colors duration-300 pointer-events-auto">

            {/* Brand */}
            <div className="flex items-center gap-3 w-1/4">
                <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                    <Map className="text-white" size={20} />
                </div>
                <div className="hidden md:block">
                    <h1 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Event Map
                    </h1>
                </div>
            </div>

            {/* Search Bar - Centered */}
            <div className="flex-1 max-w-md mx-4">
                <SearchBar zones={zones} />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-1/4 justify-end">

                {/* Rain Toggle */}
                <button
                    onClick={onToggleRain}
                    className={`p-2.5 rounded-full transition-all duration-300 
                ${isRainy ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'bg-white/50 text-gray-500 hover:bg-blue-100 hover:text-blue-600'}`}
                    title="Toggle Rain"
                >
                    <CloudRain size={20} />
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2.5 rounded-full transition-all duration-300 
                ${theme === 'dark'
                            ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700 hover:scale-110 shadow-inner'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 shadow-sm'}`}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

        </div>
    );
};

export default Header;
