import React from 'react';
import { motion } from 'framer-motion';
import MapPin from './MapPin';

const Zone = ({
    id,
    name,
    icon,
    color,
    position,
    size,
    height = 40,
    variant = 'white', // 'white' | 'brick'
    mapRotation = 0,
    onClick,
    onHover,
    isVisited,
    children
}) => {

    // Building Textures/Styles
    const getStyles = () => {
        if (variant === 'brick') {
            return {
                wallColor: '#8B4513', // Saddle Brown
                roofColor: '#2F2F2F', // Dark Grey Roof
                windowColor: '#87CEEB', // Sky Blue
                // Simplified brick pattern for CSS
                wallClass: 'bg-amber-900',
                roofClass: 'bg-neutral-800'
            };
        }
        return { // Warehouse / Standard
            wallColor: '#E5E5E5', // Light Grey
            roofColor: '#FFFFFF', // White Roof
            windowColor: '#A0CED9',
            wallClass: 'bg-gray-200',
            roofClass: 'bg-white'
        };
    };

    const style = getStyles();

    // Common face styles
    const faceStyle = "absolute flex items-end justify-center overflow-hidden border border-black/10 transition-colors duration-300";

    return (
        <div
            className="absolute group z-20 hover:z-50 transition-all duration-300"
            style={{
                ...position,
                ...size,
                transformStyle: 'preserve-3d',
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(id);
            }}
            onMouseEnter={onHover}
        >
            {/* 3D Block Container */}
            <motion.div
                className="relative w-full h-full cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ z: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* TOP FACE (Roof) */}
                <div
                    className={`absolute inset-0 shadow-sm ${style.roofClass}`}
                    style={{
                        transform: `translateZ(${height}px)`,
                    }}
                >
                    {/* Map Place Pin floats ABOVE the roof */}
                    <MapPin icon={icon} color={color} mapRotation={mapRotation} />
                </div>

                {/* FRONT FACE */}
                <div
                    className={`${faceStyle} ${style.wallClass}`}
                    style={{
                        width: '100%',
                        height: `${height}px`,
                        bottom: 0,
                        left: 0,
                        transformOrigin: 'bottom',
                        transform: 'rotateX(-90deg)',
                    }}
                >
                    <div className="w-[80%] h-[40%] bg-blue-300/30 border border-white/40 mb-2" />
                </div>

                {/* BACK FACE */}
                <div
                    className={`${faceStyle} ${style.wallClass}`}
                    style={{
                        width: '100%',
                        height: `${height}px`,
                        top: 0,
                        left: 0,
                        transformOrigin: 'top',
                        transform: 'rotateX(-90deg) rotateY(180deg) translateY(-100%)', // Fold back and up?
                        top: 0, // It hangs from the top edge
                        transform: `rotateX(90deg)`, // Flips up-and-away
                    }}
                >
                    {/* No windows on back usually, maybe a door */}
                    <div className="w-[30%] h-[60%] bg-neutral-900/20 mb-0" />
                </div>


                {/* RIGHT FACE */}
                <div
                    className={`${faceStyle} ${style.wallClass}`}
                    style={{
                        width: `${height}px`,
                        height: '100%',
                        top: 0,
                        right: 0,
                        transformOrigin: 'right',
                        transform: 'rotateY(90deg)',
                        filter: 'brightness(90%)'
                    }}
                />

                {/* LEFT FACE */}
                <div
                    className={`${faceStyle} ${style.wallClass}`}
                    style={{
                        width: `${height}px`,
                        height: '100%',
                        top: 0,
                        left: 0,
                        transformOrigin: 'left',
                        transform: 'rotateY(-90deg)',
                        filter: 'brightness(95%)'
                    }}
                />

                {/* Children (Easter Eggs) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ transform: `translateZ(${height}px)` }}
                >
                    <div className="pointer-events-auto w-full h-full relative">
                        {children}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Zone;
