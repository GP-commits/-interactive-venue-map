import React from 'react';

const Rain = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
            {/* We use a repeating gradient that is rotated slightly to look like rain falling from sky */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-blue-400 opacity-60 rounded-full"
                    style={{
                        width: '2px',
                        height: `${Math.random() * 20 + 10}px`, // Varying length
                        left: `${Math.random() * 100}%`,
                        top: `-20px`,
                        animation: `fall ${Math.random() * 0.5 + 0.5}s linear infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}
            {/* Heavy layer for density without too many DOM elements */}
            <div className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: `linear-gradient(170deg, transparent 0%, transparent 50%, #a5d8ff 50%, #a5d8ff 51%, transparent 51%)`,
                    backgroundSize: '30px 30px',
                    animation: 'rain-sheet 0.4s linear infinite'
                }}
            />

            <style jsx>{`
        @keyframes fall {
            to { transform: translateY(110vh); }
        }
        @keyframes rain-sheet {
            0% { background-position: 0 0; }
            100% { background-position: 10px 100px; }
        }
      `}</style>
        </div>
    );
};

export default Rain;
