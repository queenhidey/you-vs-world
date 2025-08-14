/**
 * Game Types and Interfaces
 * 
 * This file contains all TypeScript type definitions used throughout the Chase Game.
 * These types ensure type safety and provide clear contracts between components.
 */

/**
 * Represents a single trivia question
 */
export interface Question {
  /** Unique identifier for the question */
  id: number;
  /** The question text to display */
  question: string;
  /** Array of possible answer choices */
  options: string[];
  /** Index of the correct answer in the options array (0-based) */
  correctAnswer: number;
}

/**
 * Represents a player character with their associated questions
 */
export interface PlayerData {
  /** Unique identifier for the player */
  id: string;
  /** Display name of the player */
  name: string;
  /** Emoji representing the player */
  emoji: string;
  /** Brief description of the player's expertise */
  description: string;
  /** Array of questions specific to this player */
  questions: Question[];
}

/**
 * Type alias for player identifiers
 */
export type Player = string;

/**
 * Possible game outcomes
 */
export type GameStatus = 'playing' | 'won' | 'caught';

/**
 * Complete game state interface
 * Contains all the state needed to manage a chase game session
 */
export interface GameState {
  /** Current position of the player on the board (0-based) */
  playerPosition: number;
  /** Current position of the chaser on the board (0-based) */
  chaserPosition: number;
  /** Current status of the game */
  gameStatus: GameStatus;
  /** Whether to show the answer result UI */
  showResult: boolean;
  /** Whether to show the question UI */
  showQuestion: boolean;
  /** Seconds remaining on the timer */
  timeLeft: number;
  /** Whether the countdown timer is currently active */
  timerActive: boolean;
  /** Whether to reveal the correct answer */
  showCorrectAnswer: boolean;
  /** Whether the chaser has made their selection */
  chaserHasPicked: boolean;
  /** Player's selected answer index (-1 if no answer) */
  playerAnswer: number | null;
  /** Chaser's selected answer index (-1 if no answer) */
  chaserAnswer: number | null;
  /** Whether the game has started (vs setup phase) */
  isGameStarted: boolean;
  /** Custom labels for board positions */
  stepLabels: { [key: number]: string };
  /** Display name for the current player */
  playerName: string;
  /** Set of question IDs that have already been used */
  usedQuestionIds: Set<number>;
  /** Whether the player has selected their starting position */
  hasSelectedStartPosition: boolean;
  /** The currently active question */
  currentQuestion: Question | null;
  /** Current question number for display */
  questionNumber: number;
}

/**
 * Props for the QuestionCard component
 */
export interface QuestionCardProps {
  /** The question to display */
  question: Question;
  /** Callback when player answers a question */
  onAnswer: (isCorrect: boolean, answerIndex: number) => void;
  /** Optional callback when chaser makes a selection */
  onChaserPick?: (answerIndex: number) => void;
  /** Whether the question card is disabled */
  disabled: boolean;
  /** Whether to show the correct answer highlight */
  showCorrectAnswer?: boolean;
  /** Whether the player didn't answer (skipped) */
  playerDidntAnswer?: boolean;
}

/**
 * Props for the GameBoard component
 */
export interface GameBoardProps {
  /** Current player position on the board */
  playerPosition: number;
  /** Current chaser position on the board */
  chaserPosition: number;
  /** Total number of steps on the board */
  totalSteps: number;
  /** Whether the game has started (affects board behavior) */
  isGameStarted?: boolean;
  /** Callback when player selects starting position */
  onPlayerStartPositionChange?: (position: number, playerName?: string) => void;
  /** Custom labels for specific board positions */
  stepLabels?: { [key: number]: string };
  /** Callback when step labels are changed */
  onStepLabelChange?: (step: number, label: string) => void;
  /** Display name of the current player */
  playerName?: string;
}

/**
 * Props for the main ChaseGame component
 */
export interface ChaseGameProps {
  /** Callback when the game ends (win/lose) */
  onGameEnd: () => void;
  /** The selected player character */
  selectedPlayer: Player;
}

/**
 * Audio configuration settings
 */
export interface AudioConfig {
  /** Volume level (0-1) */
  volume: number;
  /** Whether audio is enabled */
  enabled: boolean;
}
