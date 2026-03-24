import { useRef, useEffect } from 'react';

const useSound = () => {
    const audioContext = useRef(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction usually, 
        // but here we just prepare it.
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioContext.current = new AudioContext();
        }
    }, []);

    const playTone = (freq, type, duration, vol = 0.1) => {
        if (!audioContext.current) return;

        // Resume context if suspended (browser autoplay policy)
        if (audioContext.current.state === 'suspended') {
            audioContext.current.resume();
        }

        const osc = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioContext.current.currentTime);

        gainNode.gain.setValueAtTime(vol, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioContext.current.destination);

        osc.start();
        osc.stop(audioContext.current.currentTime + duration);
    };

    const playHover = () => {
        // High pitch short blip
        playTone(800, 'sine', 0.05, 0.05);
    };

    const playClick = () => {
        // Confirm sound
        playTone(600, 'triangle', 0.1, 0.1);
        setTimeout(() => playTone(1200, 'sine', 0.2, 0.1), 50);
    };

    const playRain = () => {
        // White noise for rain is complex to synthesize pleasantly in a simple hook
        // We will skip Audio Rain for now and focus on visual, unless requested strictly.
        // User asked for "sound on hover" mainly.
    };

    return { playHover, playClick };
};

export default useSound;
