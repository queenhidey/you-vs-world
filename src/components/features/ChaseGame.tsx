/**
 * Chase Game Component
 * 
 * Main game orchestrator that manages the complete chase game lifecycle including
 * setup, gameplay, timing, position tracking, and result handling.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question, ChaseGameProps } from '../../types/game';
import { getQuestionsByPlayer, getPlayer, validateAllPlayers } from '../../app/data/contestantControls';
import { AudioService } from '../../utils/audioService';
import { PlayingState, GameResultState } from '../game-states';

/**
 * Main chase game orchestrator component
 * 
 * Coordinates the entire game experience from setup through completion:
 * 
 * Setup Phase:
 * - Player selects starting position after filling custom step labels
 * - Validates that all required setup is complete
 * 
 * Game Phase:
 * - Manages question presentation and timing
 * - Tracks player and chaser positions on board
 * - Handles both player and chaser answer selections
 * - Provides audio feedback for timing and actions
 * 
 * Result Phase:
 * - Determines win/loss conditions
 * - Presents final game state with appropriate messaging
 * 
 * State Management:
 * - Position tracking for both player and chaser
 * - Question rotation with uniqueness tracking
 * - Timer management with audio cues
 * - Multi-phase answer handling (player → chaser → reveal)
 */
export default function ChaseGame({ onGameEnd, selectedPlayer, onBackToPlayerSelect }: ChaseGameProps) {
  // POSITION STATE
  /** Current player position on the board (-1 = not set, 0-9 = positions) */
  const [playerPosition, setPlayerPosition] = useState(-1);
  /** Current chaser position on the board (starts at 0) */
  const [chaserPosition, setChaserPosition] = useState(0);
  
  // GAME STATE
  /** Overall game status determining which screen to show */
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'caught'>('playing');
  /** Whether to show the final result screen */
  const [showResult, setShowResult] = useState(false);
  /** Whether the actual game has started (vs setup phase) */
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  // TIMING STATE
  /** Seconds remaining for current question */
  const [timeLeft, setTimeLeft] = useState(30);
  /** Whether the countdown timer is currently active */
  const [timerActive, setTimerActive] = useState(false);
  
  // QUESTION STATE
  /** Whether to reveal the correct answer */
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  /** Whether the chaser has made their selection */
  const [chaserHasPicked, setChaserHasPicked] = useState(false);
  /** Player's selected answer index */
  const [playerAnswer, setPlayerAnswer] = useState<number | null>(null);
  /** Chaser's selected answer index */
  const [chaserAnswer, setChaserAnswer] = useState<number | null>(null);
  /** Currently displayed question */
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  /** Current question number for display */
  const [questionNumber, setQuestionNumber] = useState(1);
  /** Set of question IDs already used to prevent repeats */
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  
  // SETUP STATE
  /** Custom labels for board positions (position → label mapping) */
  const [stepLabels, setStepLabels] = useState<{ [key: number]: string }>({});
  /** Player's chosen name/label from selected starting position */
  const [playerName, setPlayerName] = useState<string>("5 sips");
  /** Whether player has selected their starting position */
  const [hasSelectedStartPosition, setHasSelectedStartPosition] = useState(false);

  // GAME CONSTANTS
  const totalSteps = 9;
  const playerQuestions = getQuestionsByPlayer(selectedPlayer);
  const playerData = getPlayer(selectedPlayer);
  const audioService = AudioService.getInstance();

  /**
   * Get a random unused question from the player's question pool
   * 
   * Maintains question uniqueness by tracking used question IDs.
   * If all questions have been used, resets the pool to allow reuse.
   * 
   * @returns A random question that hasn't been used recently
   */
  const getRandomQuestion = useCallback(() => {
    const availableQuestions = playerQuestions.filter(q => !usedQuestionIds.has(q.id));
    
    // If no unused questions remain, reset the pool
    if (availableQuestions.length === 0) {
      setUsedQuestionIds(new Set());
      return playerQuestions[Math.floor(Math.random() * playerQuestions.length)];
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }, [playerQuestions, usedQuestionIds]);

  // Initialize first question when component mounts
  useEffect(() => {
    if (playerQuestions.length > 0 && !currentQuestion) {
      const firstQuestion = getRandomQuestion();
      setCurrentQuestion(firstQuestion);
      setUsedQuestionIds(prev => new Set([...prev, firstQuestion.id]));
    }
  }, [playerQuestions, currentQuestion, getRandomQuestion]);

  // Validate question data integrity on mount
  useEffect(() => {
    validateAllPlayers();
  }, []);

  const handleAnswer = useCallback((_isCorrect: boolean, answerIndex: number) => {
    setTimerActive(false);
    setShowResult(true);
    setPlayerAnswer(answerIndex);
  }, []);

  const handleChaserPick = useCallback((answerIndex: number) => {
    setChaserHasPicked(true);
    setChaserAnswer(answerIndex);
  }, []);

  const handlePlayerStartPositionChange = useCallback((position: number, name?: string) => {
    setPlayerPosition(position);
    setHasSelectedStartPosition(true);
    if (name) {
      setPlayerName(name);
    }
  }, []);

  const handleStepLabelChange = useCallback((step: number, label: string) => {
    setStepLabels(prev => ({ ...prev, [step]: label }));
  }, []);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    setTimerActive(true);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameStarted && timerActive && timeLeft > 0 && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            // Only play alarm sound if game is still in playing state
            if (gameStatus === 'playing') {
              audioService.playAlarmSound();
            }
            return 0;
          } else if (prev <= 3) {
            audioService.playWarningBeep();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameStarted, timerActive, timeLeft, gameStatus, audioService]);

  const handleNextQuestion = () => {
    const nextQuestion = getRandomQuestion();
    setCurrentQuestion(nextQuestion);
    setUsedQuestionIds(prev => new Set([...prev, nextQuestion.id]));
    setQuestionNumber(prev => prev + 1);
    setShowResult(false);
    setTimeLeft(30);
    setTimerActive(true);
    setShowCorrectAnswer(false);
    setChaserHasPicked(false);
    setPlayerAnswer(null);
    setChaserAnswer(null);
  };

  const handleShowAnswer = () => {
    if (!currentQuestion) return;
    
    setShowCorrectAnswer(true);
    
    // Check if player got it right and advance
    if (playerAnswer !== -1 && playerAnswer === currentQuestion.correctAnswer) {
      setPlayerPosition(prev => {
        const newPos = prev + 1;
        if (newPos >= totalSteps) {
          setGameStatus('won');
          return newPos;
        }
        return newPos;
      });
    }
    
    // Check if chaser got it right and advance
    if (chaserAnswer !== -1 && chaserAnswer === currentQuestion.correctAnswer) {
      setChaserPosition(prev => {
        const newPos = prev + 1;
        const playerNewPos = playerAnswer !== -1 && playerAnswer === currentQuestion.correctAnswer ? playerPosition + 1 : playerPosition;
        if (newPos >= playerNewPos) {
          setGameStatus('caught');
          return newPos;
        }
        return newPos;
      });
    }
  };

  const handleAdvancePlayer = () => {
    setPlayerPosition(prev => {
      const newPos = prev + 1;
      if (newPos >= totalSteps) {
        setGameStatus('won');
        return newPos;
      }
      return newPos;
    });
  };

  const handleAdvanceChaser = () => {
    setChaserPosition(prev => {
      const newPos = prev + 1;
      if (newPos >= playerPosition) {
        setGameStatus('caught');
        return newPos;
      }
      return newPos;
    });
  };

  const handleUnadvancePlayer = () => {
    setPlayerPosition(prev => Math.max(0, prev - 1));
  };

  const handleUnadvanceChaser = () => {
    setChaserPosition(prev => Math.max(0, prev - 1));
  };

  const handlePlayerNoAnswer = () => {
    setPlayerAnswer(-1);
    setShowResult(true);
    setTimerActive(false);
  };

  const handleChaserNoAnswer = () => {
    setChaserAnswer(-1);
    setChaserHasPicked(true);
  };

  // Render result states
  if (gameStatus === 'won' || gameStatus === 'caught') {
    return (
      <GameResultState
        result={gameStatus}
        playerName={playerName}
        onGameEnd={onGameEnd}
      />
    );
  }

  // Render playing state
  return (
    <PlayingState
      playerPosition={playerPosition}
      chaserPosition={chaserPosition}
      totalSteps={totalSteps}
      isGameStarted={isGameStarted}
      showResult={showResult}
      timeLeft={timeLeft}
      showCorrectAnswer={showCorrectAnswer}
      chaserHasPicked={chaserHasPicked}
      playerAnswer={playerAnswer}
      stepLabels={stepLabels}
      playerName={playerName}
      hasSelectedStartPosition={hasSelectedStartPosition}
      currentQuestion={currentQuestion}
      questionNumber={questionNumber}
      playerData={playerData}
      onAnswer={handleAnswer}
      onChaserPick={handleChaserPick}
      onPlayerStartPositionChange={handlePlayerStartPositionChange}
      onStepLabelChange={handleStepLabelChange}
      onStartGame={handleStartGame}
      onNextQuestion={handleNextQuestion}
      onShowAnswer={handleShowAnswer}
      onAdvancePlayer={handleAdvancePlayer}
      onAdvanceChaser={handleAdvanceChaser}
      onUnadvancePlayer={handleUnadvancePlayer}
      onUnadvanceChaser={handleUnadvanceChaser}
      onPlayerNoAnswer={handlePlayerNoAnswer}
      onChaserNoAnswer={handleChaserNoAnswer}
      onBackToPlayerSelect={onBackToPlayerSelect}
    />
  );
}
