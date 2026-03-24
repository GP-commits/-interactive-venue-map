import React from 'react';

const NavigationPath = ({ startX = 15, startY = 90, endX, endY }) => {
    // Logic: L-Shape Path algorithm
    // Vertical road is roughly at X=15.
    // Horizontal road is roughly at Y=40.

    // Start is (15, 90).
    // Target is (endX, endY).

    // Turn points:
    const p1 = `${startX} ${startY}`;
    let pathData = '';

    // Simple routing logic:
    // If target in upper section (Y < 40), move Up to 40, then turn?
    // Or if target X != 15, move vertically to target Y then horiz?
    // Let's do: Move Vertical to Target Y, then Horizontal to Target X.
    // L-Shape: (startX, startY) -> (startX, endY) -> (endX, endY).
    const p2 = `${startX} ${endY}`;
    const p3 = `${endX} ${endY}`;

    pathData = `M ${p1} L ${p2} L ${p3}`;

    return (
        <div className="absolute inset-0 pointer-events-none z-10"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}> {/* LIFTED Z */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">

                {/* Glow */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'blur(4px)' }}
                />

                {/* Core Path - Bright Blue */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="3 3"
                    className="animate-dash-fast"
                />

                {/* Start Dot */}
                <circle cx={startX} cy={startY} r="1.5" fill="#EAB308" />
                {/* End Dot */}
                <circle cx={endX} cy={endY} r="1.5" fill="#3b82f6" className="animate-pulse" />

            </svg>
            <style jsx>{`
        .animate-dash-fast {
            animation: dash 0.5s linear infinite;
        }
        @keyframes dash {
            from { stroke-dashoffset: 6; }
            to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    );
};

export default NavigationPath;
