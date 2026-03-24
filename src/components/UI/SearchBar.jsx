import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import useGameStore from '../../store/gameStore';

const SearchBar = ({ zones = [] }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const setFocusedZone = useGameStore((state) => state.setFocusedZone);
    const theme = useGameStore((state) => state.theme);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const filtered = zones.filter(z =>
            z.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query, zones]);

    const handleSelect = (id) => {
        setFocusedZone(id);
        setQuery('');
        setResults([]);
    };

    return (
        <div className="relative w-full max-w-md pointer-events-auto">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full shadow-sm border transition-all duration-300 focus-within:ring-2 focus-within:scale-[1.02]
         ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white focus-within:ring-blue-500/50' : 'bg-white border-gray-200 text-gray-800 focus-within:ring-blue-200'}`}>

                <Search size={18} className="opacity-50" />
                <input
                    type="text"
                    placeholder="Find a location..."
                    className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder-gray-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {results.length > 0 && (
                <div className={`absolute top-full left-0 w-full mt-2 rounded-xl shadow-xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200
             ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-100'}`}>
                    {results.map(zone => (
                        <button
                            key={zone.id}
                            onClick={() => handleSelect(zone.id)}
                            className={`w-full px-4 py-3 flex items-center justify-between text-sm font-bold transition-colors
                  ${theme === 'dark' ? 'hover:bg-neutral-700 text-gray-200 border-b border-neutral-700 last:border-0' : 'hover:bg-blue-50 text-gray-700 border-b border-gray-100 last:border-0'}`}
                        >
                            <span>{zone.name}</span>
                            <MapPin size={14} className="opacity-50" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
