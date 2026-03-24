import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import Zone from './Zone';
import useGameStore from '../../store/gameStore';
import { Utensils, ShoppingBag, Building2, Car, RotateCw, Book, Monitor, Moon, Sun, Plus, Minus, MapPin as MapPinIcon, User } from 'lucide-react';
import SessionCard from '../UI/SessionCard';
import BadgeOverlay from '../Gamification/BadgeOverlay';
import CoffeeMug from '../EasterEggs/CoffeeMug';
import Cat from '../EasterEggs/Cat';
import Fountain from '../EasterEggs/Fountain';
import RightSidebar from '../UI/RightSidebar';
import Header from '../UI/Header';
import Rain from '../Effects/Rain';
import { Tree3D, Car3D } from './Decor3D';
import useSound from '../../hooks/useSound';
import MapPin from './MapPin';
import NavigationPath from './NavigationPath';

// --- Environment Components ---
const Mountain = ({ x, y, size = 100 }) => (
    <div
        className="absolute w-0 h-0 border-l-transparent border-r-transparent border-b-gray-400 pointer-events-none"
        style={{
            left: x, top: y,
            borderLeftWidth: `${size}px`, borderRightWidth: `${size}px`, borderBottomWidth: `${size}px`,
            transform: 'translateZ(-20px) rotateX(-30deg)',
            filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.3))'
        }}
    />
);

const PerimeterWall = ({ side }) => {
    const style = {
        bottom: side === 'bottom' ? '0px' : 'auto',
        top: side === 'top' ? '0px' : 'auto',
        left: side === 'left' ? '0px' : 'auto',
        right: side === 'right' ? '0px' : 'auto',
        width: (side === 'top' || side === 'bottom') ? '100%' : '20px',
        height: (side === 'left' || side === 'right') ? '100%' : '20px',
    };
    return (
        <div className="absolute bg-gray-300 border border-gray-400 shadow-sm transition-colors duration-500"
            style={{ ...style, transformStyle: 'preserve-3d', transform: `translateZ(0px)` }}>
            <div className="absolute inset-0 bg-gray-400" style={{ transform: 'translateZ(20px)' }} />
        </div>
    );
};

// --- Controls Component ---
const MapControls = ({ rotation, setRotation }) => {
    const { zoomIn, zoomOut } = useControls();
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 pointer-events-auto">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-full p-1 shadow-lg border border-gray-200">
                <button onClick={() => zoomOut()} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"><Minus size={20} /></button>
                <div className="w-px h-4 bg-gray-300"></div>
                <button onClick={() => zoomIn()} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"><Plus size={20} /></button>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-3 w-64">
                <RotateCw size={16} className="text-gray-500" />
                <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-full accent-blue-500 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
        </div>
    );
};

// --- Main Map ---
const VenueMap = () => {
    const visitZone = useGameStore((state) => state.visitZone);
    const visitedZones = useGameStore((state) => state.visitedZones);
    const theme = useGameStore((state) => state.theme);
    const focusedZoneId = useGameStore((state) => state.focusedZoneId);
    const setFocusedZone = useGameStore((state) => state.setFocusedZone);

    const [selectedZone, setSelectedZone] = useState(null);
    const [navigationTargetId, setNavigationTargetId] = useState(null); // Separate state for path
    const [rotation, setRotation] = useState(0);
    const [isRainy, setIsRainy] = useState(false);

    const { playHover, playClick } = useSound();
    const transformRef = useRef(null);

    const zones = [
        { id: 'diner', name: 'The Diner', icon: Utensils, color: '#ef4444', variant: 'brick', position: { top: '35%', left: '15%' }, size: { width: '20%', height: '20%' }, height: 60 },
        { id: 'supermarket', name: 'SuperMart', icon: ShoppingBag, color: '#3b82f6', variant: 'white', position: { top: '55%', left: '45%' }, size: { width: '25%', height: '15%' }, height: 40 },
        { id: 'main-hall', name: 'City Hall', icon: Building2, color: '#8b5cf6', variant: 'white', position: { top: '15%', right: '15%' }, size: { width: '30%', height: '25%' }, height: 80 },
        { id: 'library', name: 'Public Library', icon: Book, color: '#10b981', variant: 'brick', position: { top: '10%', left: '10%' }, size: { width: '15%', height: '15%' }, height: 50 },
        { id: 'tech-hub', name: 'Tech Hub', icon: Monitor, color: '#0ea5e9', variant: 'white', position: { top: '60%', right: '10%' }, size: { width: '15%', height: '20%' }, height: 100 }
    ];

    const handleZoneClick = (id) => {
        visitZone(id);
        playClick();
        const zone = zones.find(z => z.id === id);
        setSelectedZone(zone);
        setNavigationTargetId(id); // Set navigation target

        // Smart Zoom Logic
        if (transformRef.current && zone) {
            const { zoomToElement } = transformRef.current;
            // Simple zoom effect
        }
    };

    const handleBackgroundClick = () => {
        // Optional: Clear navigation if clicking background?
        // User didn't request this, but it might be nice.
        // leaving it persistent for now as requested "showing after ... closing".
    };

    useEffect(() => {
        if (focusedZoneId) {
            const zone = zones.find(z => z.id === focusedZoneId);
            if (zone) {
                handleZoneClick(focusedZoneId);
                if (transformRef.current) {
                    transformRef.current.zoomToElement(focusedZoneId, 2, 1000, 'easeOut');
                }
            }
        }
    }, [focusedZoneId]);

    const trees = useMemo(() => {
        const safeZones = [
            { x: 30, y: 5, w: 40, h: 30 }, { x: 5, y: 50, w: 30, h: 40 },
            { x: 75, y: 60, w: 20, h: 30 }, { x: 80, y: 5, w: 15, h: 30 },
        ];
        const generated = [];
        for (let i = 0; i < 20; i++) {
            const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
            generated.push({ id: i, x: `${zone.x + Math.random() * zone.w}%`, y: `${zone.y + Math.random() * zone.h}%` });
        }
        return generated;
    }, []);

    const navTargetZone = zones.find(z => z.id === navigationTargetId);

    return (
        <div className={`w-full h-full relative overflow-hidden font-sans flex text-gray-800 transition-colors duration-500
        ${theme === 'dark' ? 'bg-[#0b101b]' : 'bg-[#e0f2fe]'}`}>

            <Header zones={zones} isRainy={isRainy} onToggleRain={() => setIsRainy(!isRainy)} />

            <div className="flex-1 relative overflow-hidden mt-16">
                {isRainy && <Rain />}
                <div className="absolute top-10 right-20 z-0 transition-opacity duration-1000" style={{ opacity: theme === 'dark' ? 1 : 0 }}>
                    <div className="w-24 h-24 rounded-full bg-yellow-100 shadow-[0_0_60px_rgba(255,255,200,0.4)] relative">
                        <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-yellow-200/50" />
                        <div className="absolute bottom-6 right-8 w-6 h-6 rounded-full bg-yellow-200/50" />
                    </div>
                </div>
                <div className="absolute top-4 left-4 z-50 pointer-events-none">
                    <div className="bg-white/80 px-3 py-1 rounded-lg backdrop-blur-md shadow-sm border border-black/5 text-xs font-bold font-mono text-gray-500">
                        SCORE: {useGameStore(state => state.score)}
                    </div>
                </div>

                <TransformWrapper initialScale={0.8} minScale={0.5} maxScale={4} centerOnInit={true} limitToBounds={false} ref={transformRef}>
                    <MapControls rotation={rotation} setRotation={setRotation} />
                    <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing" contentClass="!w-full !h-full flex items-center justify-center">

                        <div
                            className="relative w-[1200px] h-[1200px] transition-transform duration-700 ease-linear"
                            style={{ transform: `rotateX(60deg) rotateZ(${-45 + rotation}deg)`, transformStyle: 'preserve-3d' }}
                            onClick={handleBackgroundClick}
                        >

                            <div className={`absolute -inset-[400px] transition-colors duration-500 ${theme === 'dark' ? 'bg-[#064e3b]' : 'bg-[#10b981]'}`} style={{ transform: 'translateZ(-2px)' }} />
                            <div className={`absolute inset-0 shadow-[0_0_50px_rgba(0,0,0,0.1)] rounded-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-[#065f46]' : 'bg-[#86efac]'}`} style={{ transformStyle: 'preserve-3d' }}>

                                <PerimeterWall side="top" /><PerimeterWall side="bottom" /><PerimeterWall side="left" /><PerimeterWall side="right" />

                                <div className="absolute -bottom-10 left-[10%] w-[120px] h-[60px] bg-[#374151] flex items-center justify-center text-white font-bold tracking-widest text-xs border-x-4 border-gray-400" style={{ transform: 'translateZ(1px)' }}>ENTRY</div>
                                <div className="absolute bottom-0 left-[10%] w-[120px] h-full bg-[#374151] border-l-4 border-r-4 border-white/50" />
                                <div className="absolute top-[40%] left-0 w-full h-[100px] bg-[#374151] border-t-4 border-b-4 border-white/50" />
                                <div className="absolute top-[50%] left-[25%] w-[300px] h-[200px] bg-[#4b5563] rounded-lg opacity-90 border-2 border-white/20">
                                    {[...Array(6)].map((_, i) => (<div key={i} className="absolute w-[2px] h-[40%] bg-white/50 top-0" style={{ left: `${(i + 1) * 15}%` }} />))}
                                </div>
                                <div className="absolute top-[15%] left-[50%]"><Fountain /></div>

                                {/* --- NAVIGATION PATH (Persistent) --- */}
                                {navTargetZone && (
                                    <NavigationPath
                                        startX={15} startY={90}
                                        endX={parseFloat(navTargetZone.position.left)}
                                        endY={parseFloat(navTargetZone.position.top)}
                                    />
                                )}

                                {zones.map((zone) => (
                                    <Zone key={zone.id} {...zone} mapRotation={rotation} onClick={handleZoneClick} onHover={playHover} isVisited={visitedZones.includes(zone.id)}>
                                        {zone.id === 'diner' && <CoffeeMug />}
                                        {zone.id === 'library' && <div className="absolute top-0 right-0 -translate-y-8 translate-x-4"><Cat /></div>}
                                    </Zone>
                                ))}

                                <div className="absolute bottom-6 left-[15%]" style={{ width: '0px', height: '0px', transformStyle: 'preserve-3d' }}>
                                    <MapPin icon={User} color="#EAB308" mapRotation={rotation} label="YOU ARE HERE" isUser={true} />
                                </div>

                                {trees.map((tree) => (<Tree3D key={tree.id} x={tree.x} y={tree.y} />))}
                                <Car3D x="15%" y="82%" rotate={90} /><Car3D x="50%" y="42%" color="#ef4444" rotate={0} /><Car3D x="80%" y="44%" color="#3b82f6" rotate={180} />
                            </div>
                            <Mountain x="-30%" y="-30%" size={400} /><Mountain x="110%" y="-10%" size={300} /><Mountain x="60%" y="-40%" size={500} /><Mountain x="-20%" y="80%" size={250} />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
                <BadgeOverlay />
                <SessionCard isOpen={!!selectedZone} onClose={() => setSelectedZone(null)} zoneId={selectedZone?.id} title={selectedZone?.name} color={selectedZone?.color} />
            </div>
            <RightSidebar onEventClick={setFocusedZone} />
        </div>
    );
};

export default VenueMap;
