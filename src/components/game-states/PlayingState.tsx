'use client';

import { Question, PlayerData } from '../../types/game';
import { QuestionCard, GameBoard, ManualControls } from '../features';
import { GameSetupState } from '../game-states';
import { Timer, Button } from '../ui';

interface PlayingStateProps {
  // Game state
  playerPosition: number;
  chaserPosition: number;
  totalSteps: number;
  isGameStarted: boolean;
  showResult: boolean;
  timeLeft: number;
  showCorrectAnswer: boolean;
  chaserHasPicked: boolean;
  playerAnswer: number | null;
  stepLabels: { [key: number]: string };
  playerName: string;
  hasSelectedStartPosition: boolean;
  currentQuestion: Question | null;
  questionNumber: number;
  
  // Player data
  playerData: PlayerData;
  
  // Handlers
  onAnswer: (isCorrect: boolean, answerIndex: number) => void;
  onChaserPick: (answerIndex: number) => void;
  onPlayerStartPositionChange: (position: number, name?: string) => void;
  onStepLabelChange: (step: number, label: string) => void;
  onStartGame: () => void;
  onNextQuestion: () => void;
  onShowAnswer: () => void;
  onAdvancePlayer: () => void;
  onAdvanceChaser: () => void;
  onUnadvancePlayer: () => void;
  onUnadvanceChaser: () => void;
  onPlayerNoAnswer: () => void;
  onChaserNoAnswer: () => void;
  onBackToPlayerSelect?: () => void;
}

export default function PlayingState({
  playerPosition,
  chaserPosition,
  totalSteps,
  isGameStarted,
  showResult,
  timeLeft,
  showCorrectAnswer,
  chaserHasPicked,
  playerAnswer,
  stepLabels,
  playerName,
  hasSelectedStartPosition,
  currentQuestion,
  questionNumber,
  playerData,
  onAnswer,
  onChaserPick,
  onPlayerStartPositionChange,
  onStepLabelChange,
  onStartGame,
  onNextQuestion,
  onShowAnswer,
  onAdvancePlayer,
  onAdvanceChaser,
  onUnadvancePlayer,
  onUnadvanceChaser,
  onPlayerNoAnswer,
  onChaserNoAnswer,
  onBackToPlayerSelect
}: PlayingStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">THE CHASE</h1>
          <div className="flex justify-center items-center gap-8 text-white flex-wrap">
            <div className="text-lg">
              Playing against: <span className="font-bold">
                {playerData.emoji} {playerData.name} (Chaser)
              </span>
            </div>
            <div className="text-lg">Question {questionNumber}</div>
          </div>
        </div>

        {/* Main Game Layout - Side by Side */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Manual Controls - Left Side */}
          <div className="flex-shrink-0 lg:w-auto w-full">
            <ManualControls
              onAdvancePlayer={onAdvancePlayer}
              onUnadvancePlayer={onUnadvancePlayer}
              onAdvanceChaser={onAdvanceChaser}
              onUnadvanceChaser={onUnadvanceChaser}
              onPlayerNoAnswer={onPlayerNoAnswer}
              onChaserNoAnswer={onChaserNoAnswer}
              playerAnswered={playerAnswer !== null}
              chaserHasPicked={chaserHasPicked}
              onBackToPlayerSelect={onBackToPlayerSelect}
            />
          </div>

          {/* Game Board - Center */}
          <div className="flex-shrink-0 lg:w-auto w-full flex justify-center">
            <GameBoard 
              playerPosition={playerPosition}
              playerData={playerData}
              chaserPosition={chaserPosition}
              totalSteps={totalSteps}
              isGameStarted={isGameStarted}
              onPlayerStartPositionChange={onPlayerStartPositionChange}
              stepLabels={stepLabels}
              onStepLabelChange={onStepLabelChange}
              playerName={playerName}
            />
          </div>

          {/* Question Card - Right Side on desktop, bottom on mobile */}
          <div className="flex-1 w-full">
            {!isGameStarted ? (
              /* Setup Phase */
              <GameSetupState
                stepLabels={stepLabels}
                hasSelectedStartPosition={hasSelectedStartPosition}
                onStartGame={onStartGame}
              />
            ) : (
              /* Game Phase */
              <div>
                {currentQuestion && (
                  <QuestionCard
                    question={currentQuestion}
                    onAnswer={onAnswer}
                    onChaserPick={onChaserPick}
                    disabled={false}
                    showCorrectAnswer={showCorrectAnswer}
                    playerDidntAnswer={playerAnswer === -1}
                  />
                )}
                
                {/* Timer, Times Up, or Next Question Button */}
                <div className="mt-6 flex flex-col items-center gap-4">
                  {/* Show Next Question button only after both picks are made AND answer has been shown */}
                  {showResult && chaserHasPicked && showCorrectAnswer ? (
                    <Button variant="success" size="lg" onClick={onNextQuestion}>
                      Next Question →
                    </Button>
                  ) : !chaserHasPicked && !showResult ? (
                    /* Timer Display when chaser hasn't picked yet AND player hasn't answered */
                    <Timer
                      timeLeft={timeLeft}
                      size="lg"
                      showLabel={true}
                    />
                  ) : null}
                  
                  {/* Show Answer Button - only available after chaser has picked */}
                  {chaserHasPicked && !showCorrectAnswer && (
                    <Button variant="info" onClick={onShowAnswer}>
                      Show Answer
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
