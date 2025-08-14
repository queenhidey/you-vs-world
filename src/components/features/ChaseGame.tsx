'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question, ChaseGameProps } from '../../types/game';
import { getQuestionsByPlayer, getPlayer, validateAllPlayers } from '../../app/data/questions';
import { AudioService } from '../../utils/audioService';
import { PlayingState, GameResultState } from '../game-states';

export default function ChaseGame({ onGameEnd, selectedPlayer }: ChaseGameProps) {
  const [playerPosition, setPlayerPosition] = useState(-1);
  const [chaserPosition, setChaserPosition] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'caught'>('playing');
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [chaserHasPicked, setChaserHasPicked] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState<number | null>(null);
  const [chaserAnswer, setChaserAnswer] = useState<number | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [stepLabels, setStepLabels] = useState<{ [key: number]: string }>({});
  const [playerName, setPlayerName] = useState<string>("5");
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  const [hasSelectedStartPosition, setHasSelectedStartPosition] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);

  const totalSteps = 9;
  const playerQuestions = getQuestionsByPlayer(selectedPlayer);
  const playerData = getPlayer(selectedPlayer);
  const audioService = AudioService.getInstance();

  // Function to get a random unused question
  const getRandomQuestion = useCallback(() => {
    const availableQuestions = playerQuestions.filter(q => !usedQuestionIds.has(q.id));
    
    if (availableQuestions.length === 0) {
      setUsedQuestionIds(new Set());
      return playerQuestions[Math.floor(Math.random() * playerQuestions.length)];
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }, [playerQuestions, usedQuestionIds]);

  // Initialize first question
  useEffect(() => {
    if (playerQuestions.length > 0 && !currentQuestion) {
      const firstQuestion = getRandomQuestion();
      setCurrentQuestion(firstQuestion);
      setUsedQuestionIds(prev => new Set([...prev, firstQuestion.id]));
    }
  }, [playerQuestions, currentQuestion, getRandomQuestion]);

  // Validate question uniqueness on component mount
  useEffect(() => {
    validateAllPlayers();
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean, answerIndex: number) => {
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
    
    if (isGameStarted && timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            audioService.playAlarmSound();
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
  }, [isGameStarted, timerActive, timeLeft, audioService]);

  const handleNextQuestion = () => {
    const nextQuestion = getRandomQuestion();
    setCurrentQuestion(nextQuestion);
    setUsedQuestionIds(prev => new Set([...prev, nextQuestion.id]));
    setQuestionNumber(prev => prev + 1);
    setShowResult(false);
    setTimeLeft(10);
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
    />
  );
}
