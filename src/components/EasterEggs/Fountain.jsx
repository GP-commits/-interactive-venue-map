import React from 'react';

const Fountain = () => {
    return (
        <div className="absolute w-12 h-12 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {/* Base */}
            <div className="absolute w-10 h-10 rounded-full bg-stone-300 border-4 border-stone-400 shadow-inner" style={{ transform: 'translateZ(0)' }} />
            <div className="absolute w-8 h-8 rounded-full bg-blue-300 opacity-60 animate-pulse" style={{ transform: 'translateZ(1px)' }} />

            {/* Center Pillar */}
            <div className="absolute w-2 h-6 bg-stone-500" style={{ transform: 'translateZ(0) rotateX(-90deg)', top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-4px' }} />

            {/* Water Particles */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-200 rounded-full"
                    style={{
                        left: '50%', top: '50%',
                        transform: 'translateZ(10px)',
                        animation: `spray 1s infinite linear`,
                        animationDelay: `${i * 0.1}s`
                    }}
                />
            ))}

            <style jsx>{`
            @keyframes spray {
                0% { transform: translateZ(10px) translateY(0) scale(1); opacity: 1; }
                50% { transform: translateZ(25px) translateY(-5px) scale(1.2); opacity: 0.8; }
                100% { transform: translateZ(0) translateY(10px) scale(0.5); opacity: 0; }
            }
        `}</style>
        </div>
    );
};

export default Fountain;
