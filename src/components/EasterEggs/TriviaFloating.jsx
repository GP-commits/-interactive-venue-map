import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X } from 'lucide-react';
import useGameStore from '../../store/gameStore';

const TriviaFloating = () => {
    const addScore = useGameStore((state) => state.addScore);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [answered, setAnswered] = useState(false);

    // Randomly appear
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000 + Math.random() * 10000); // Appear after 5-15 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleAnswer = (correct) => {
        if (correct) {
            addScore(25);
            // Show success anim
        }
        setAnswered(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsVisible(false); // Hide after answering
        }, 1500);
    };

    const question = {
        text: "Which CSS property is used for 3D transforms?",
        options: [
            { text: "transform-style", correct: true },
            { text: "display", correct: false },
            { text: "position", correct: false }
        ]
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && !isOpen && (
                    <motion.button
                        className="absolute top-1/3 left-1/3 bg-brand-purple text-white p-3 rounded-full shadow-lg z-30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ y: { repeat: Infinity, duration: 2 } }}
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                    >
                        <HelpCircle size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <motion.div
                            className="bg-white text-black p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 pointer-events-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <HelpCircle size={24} className="text-brand-purple" />
                                Quick Trivia!
                            </h3>

                            {!answered ? (
                                <>
                                    <p className="mb-6 font-medium text-gray-700">{question.text}</p>
                                    <div className="space-y-2">
                                        {question.options.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(opt.correct)}
                                                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-brand-purple hover:text-white transition-colors"
                                            >
                                                {opt.text}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                                        <Check size={32} className="text-green-600" />
                                    </div>
                                    <p className="font-bold text-green-700">Answer Recorded!</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TriviaFloating;
