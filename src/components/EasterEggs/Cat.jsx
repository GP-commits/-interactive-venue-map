import React from 'react';

const Cat = () => {
    return (
        <div className="absolute w-4 h-3 group cursor-pointer" style={{ transformStyle: 'preserve-3d' }} title="Meow!">
            {/* Body */}
            <div className="absolute w-4 h-2 bg-orange-400 rounded-sm" style={{ transform: 'translateZ(0)' }} />
            {/* Head */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-300 rounded-sm" style={{ transform: 'translateZ(1px)' }}>
                {/* Ears */}
                <div className="absolute -top-1 left-0 w-1 h-1 bg-orange-500 clip-triangle" />
                <div className="absolute -top-1 right-0 w-1 h-1 bg-orange-500 clip-triangle" />
            </div>
            {/* Tail (Animated) */}
            <div className="absolute top-1 -left-2 w-2 h-1 bg-orange-400 origin-right animate-wiggle" />

            <style jsx>{`
            .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
            @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-20deg); }
            }
            .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        `}</style>
        </div>
    );
};

export default Cat;
