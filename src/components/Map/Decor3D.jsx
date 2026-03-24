import React from 'react';

export const Tree3D = ({ x, y }) => {
    // Cruciform tree (2 vertical planes intersecting) + shadow
    return (
        <div
            className="absolute pointer-events-none"
            style={{ left: x, top: y, width: '20px', height: '40px', transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}
        >
            {/* Shadow */}
            <div className="absolute w-6 h-2 bg-black/30 rounded-full blur-[2px] top-full left-1/2 -translate-x-1/2" />

            {/* Trunk */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-10 bg-[#5D4037]"
                style={{ transform: 'rotateX(-90deg) translateZ(5px)', transformOrigin: 'bottom' }}
            />

            {/* Foliage Plane 1 */}
            <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#4CAF50] border-2 border-[#388E3C] shadow-inner"
                style={{ transform: 'rotateX(-90deg) translateZ(15px) rotateY(45deg)', transformOrigin: 'bottom' }}
            />
            {/* Foliage Plane 2 */}
            <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#4CAF50] border-2 border-[#388E3C] shadow-sm"
                style={{ transform: 'rotateX(-90deg) translateZ(15px) rotateY(-45deg)', transformOrigin: 'bottom' }}
            />
        </div>
    );
};

export const Car3D = ({ x, y, color = '#facc15', rotate = 0 }) => {
    // Simple 3D box car
    const w = 24;
    const h = 12;
    const d = 10;

    return (
        <div
            className="absolute z-10"
            style={{
                left: x, top: y, width: `${w}px`, height: `${h}px`,
                transformStyle: 'preserve-3d',
                transform: `rotate(${rotate}deg) translateZ(5px)` // Hover slightly off ground
            }}
        >
            {/* Shadow */}
            <div className="absolute inset-0 bg-black/40 blur-[4px] translate-z-[-5px]" />

            {/* Top (Roof) */}
            <div className="absolute inset-0 border border-black/10" style={{ backgroundColor: color, transform: `translateZ(${d}px)` }} />

            {/* Sides */}
            <div className="absolute bottom-0 left-0 h-[10px] w-full origin-bottom brightness-75" style={{ backgroundColor: color, transform: 'rotateX(-90deg)' }} />
            <div className="absolute top-0 right-0 h-full w-[10px] origin-right brightness-90" style={{ backgroundColor: color, transform: 'rotateY(90deg)' }} />
            <div className="absolute top-0 left-0 h-full w-[10px] origin-left brightness-90" style={{ backgroundColor: color, transform: 'rotateY(-90deg)' }} />
            <div className="absolute top-0 left-0 h-[10px] w-full origin-top brightness-75" style={{ backgroundColor: color, transform: 'rotateX(90deg)' }} />

            {/* Windshield */}
            <div className="absolute top-1 right-2 w-[4px] h-[8px] bg-blue-300 transform translate-z-12" style={{ transform: `translateZ(${d + 1}px)` }} />
        </div>
    );
};
