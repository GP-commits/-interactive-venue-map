import React from 'react';
import { MapPin as MapPinIcon, User } from 'lucide-react';

const MapPin = ({ icon: Icon, color = '#2563eb', mapRotation = 0, label = null, isUser = false }) => {
    // FLAT MODE:
    // The pin strictly lies on the surface (Roof or Ground).
    // No complex rotations to face camera. 
    // We just center it.

    return (
        <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
                left: '50%', top: '50%',
                transform: `translate(-50%, -50%)`, // Center on the parent (Roof center)
                transformStyle: 'preserve-3d',
                zIndex: 10
            }}
        >
            {/* Flat Decal/Badge */}
            <div className={`relative ${isUser ? 'animate-pulse' : ''}`}>
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-inner border-4 border-white/30"
                    style={{
                        backgroundColor: color,
                        transform: 'translateZ(2px)', // Slight lift to avoid z-fighting with roof
                    }}
                >
                    <Icon size={24} className="text-white opacity-90" style={{ transform: `rotate(${-mapRotation}deg)` }} />
                    {/* We might still want the ICON to rotate so it's readable? 
                    User said "flaten out on top", but usually icons are oriented to viewer.
                    I'll rotate the ICON inside the flat badge so the symbol is upright relative to screen 
                    if possible, or just let it rotate with map.
                    Let's rotate the icon so it's always "up" relative to the screen, 
                    but the badge itself is flat on the roof.
                */}
                </div>

                {/* Text Label - Flat on roof too? Or floating?
                 User said "location tag ... flaten out".
                 I'll make the label a flat text block below the icon.
             */}
                {label && (
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-black/40 text-white text-[10px] font-bold tracking-wider rounded-sm backdrop-blur-sm whitespace-nowrap"
                        style={{ transform: 'translateZ(2px)' }}
                    >
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapPin;
