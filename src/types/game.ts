export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface PlayerData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: Question[];
}

export type Player = string;

export type GameStatus = 'playing' | 'won' | 'caught';

export interface GameState {
  playerPosition: number;
  chaserPosition: number;
  gameStatus: GameStatus;
  showResult: boolean;
  showQuestion: boolean;
  timeLeft: number;
  timerActive: boolean;
  showCorrectAnswer: boolean;
  chaserHasPicked: boolean;
  playerAnswer: number | null;
  chaserAnswer: number | null;
  isGameStarted: boolean;
  stepLabels: { [key: number]: string };
  playerName: string;
  usedQuestionIds: Set<number>;
  hasSelectedStartPosition: boolean;
  currentQuestion: Question | null;
  questionNumber: number;
}

export interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, answerIndex: number) => void;
  onChaserPick?: (answerIndex: number) => void;
  showResult: boolean;
  disabled: boolean;
  showCorrectAnswer?: boolean;
  playerDidntAnswer?: boolean;
}

export interface GameBoardProps {
  playerPosition: number;
  chaserPosition: number;
  totalSteps: number;
  isGameStarted?: boolean;
  onPlayerStartPositionChange?: (position: number, playerName?: string) => void;
  stepLabels?: { [key: number]: string };
  onStepLabelChange?: (step: number, label: string) => void;
  playerName?: string;
}

export interface ChaseGameProps {
  onGameEnd: () => void;
  selectedPlayer: Player;
}

export interface AudioConfig {
  volume: number;
  enabled: boolean;
}
