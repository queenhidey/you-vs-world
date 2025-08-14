'use client';

import { useState, useCallback } from 'react';

export type GameState = 'menu' | 'playing' | 'won' | 'caught';

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  bestStreak: number;
  totalScore: number;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerPosition, setPlayerPosition] = useState(0);
  const [chaserPosition, setChaserPosition] = useState(-3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalScore: 0
  });

  const resetGame = useCallback(() => {
    setPlayerPosition(0);
    setChaserPosition(-3);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(20);
    setShowResult(false);
    setGameState('playing');
  }, []);

  const updateStats = useCallback((isCorrect: boolean, points: number) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
        currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
        totalScore: prev.totalScore + points
      };
      
      if (newStats.currentStreak > newStats.bestStreak) {
        newStats.bestStreak = newStats.currentStreak;
      }
      
      return newStats;
    });
  }, []);

  return {
    gameState,
    setGameState,
    playerPosition,
    setPlayerPosition,
    chaserPosition,
    setChaserPosition,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    showResult,
    setShowResult,
    stats,
    resetGame,
    updateStats
  };
};
