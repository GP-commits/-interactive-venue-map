import { create } from 'zustand';

const useGameStore = create((set) => ({
    visitedZones: [],
    badges: [],
    score: 0,
    coffeeFound: false,

    // Custom State
    theme: 'light', // 'light' or 'dark'
    focusedZoneId: null,

    // Actions
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setFocusedZone: (zoneId) => set({ focusedZoneId: zoneId }),

    visitZone: (zoneId) => set((state) => {
        if (state.visitedZones.includes(zoneId)) return state;

        const newVisited = [...state.visitedZones, zoneId];
        // We can define 'allZones' roughly or update dynamically, 
        // but for the badge logic we iterate known IDs:
        const allKnown = ['diner', 'supermarket', 'main-hall', 'library', 'tech-hub'];
        // Flexible check: if newVisited has >= 5 items? Or specific subset.
        // Let's stick to score mainly.

        return {
            visitedZones: newVisited,
            score: state.score + 50
        };
    }),

    unlockBadge: (badgeId) => set((state) => {
        if (state.badges.includes(badgeId)) return state;
        return {
            badges: [...state.badges, badgeId],
            score: state.score + 100
        };
    }),

    foundCoffee: () => set((state) => {
        if (state.coffeeFound) return state;
        return {
            coffeeFound: true,
            badges: [...state.badges, 'caffeine-addict'],
            score: state.score + 75
        };
    }),

    addScore: (points) => set((state) => ({ score: state.score + points })),
}));

export default useGameStore;
