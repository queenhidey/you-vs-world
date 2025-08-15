'use client';

import { useState } from 'react';
import { GameBoardProps } from '../../types/game';
import { Card } from '../ui';



export default function GameBoard({ 
  playerPosition, 
  chaserPosition, 
  totalSteps, 
  isGameStarted = true,
  playerData,
  onPlayerStartPositionChange, 
  stepLabels = {}, 
  onStepLabelChange
}: GameBoardProps) {
  const [editingSteps, setEditingSteps] = useState<{ [key: number]: string }>({});

  const handleStepLabelChange = (stepIndex: number, value: string) => {
    setEditingSteps(prev => ({ ...prev, [stepIndex]: value }));
  };

  const handleStepLabelSubmit = (stepIndex: number) => {
    const label = editingSteps[stepIndex] || '';
    if (onStepLabelChange) {
      onStepLabelChange(stepIndex, label);
    }
    setEditingSteps(prev => {
      const newState = { ...prev };
      delete newState[stepIndex];
      return newState;
    });
  };

  const renderStep = (stepIndex: number) => {
    const isPlayerHere = playerPosition === stepIndex;
    const isChaserHere = chaserPosition === stepIndex;
    const isFinishLine = stepIndex === totalSteps;
    const isPassed = playerPosition > stepIndex;
    const isChaserPassed = chaserPosition > stepIndex;
    const isBelowChaser = stepIndex < chaserPosition;
    const isStepAroundPlayer = !isGameStarted && (stepIndex === 3 || stepIndex === 5);
    const hasCustomLabel = stepLabels[stepIndex];
    
    let stepClass = "w-32 h-14 rounded-lg border-2 flex items-center justify-center text-white font-bold text-lg relative transition-all duration-500 ";
    
    // Special coloring for setup phase
    if (isStepAroundPlayer && !isGameStarted) {
      if (isPlayerHere) {
        stepClass += "bg-blue-400 border-blue-300 ";
      } else {
        stepClass += "bg-blue-800 border-blue-600 ";
      }
    } else if (isFinishLine) {
      stepClass += "bg-yellow-500 border-yellow-300 ";
    } else if (isPlayerHere && isChaserHere) {
      stepClass += "bg-red-600 border-red-400 animate-bounce ";
    } else if (isPlayerHere) {
      stepClass += "bg-blue-600 border-blue-400 scale-105 ";
    } else if (isChaserHere) {
      stepClass += "bg-red-600 border-red-400 scale-105 ";
    } else if (isBelowChaser) {
      stepClass += "bg-red-500 border-red-300 ";
    } else if (!isGameStarted) {
      stepClass += "bg-blue-800 border-blue-600 ";
    } else if (isPassed) {
      stepClass += "bg-blue-400 border-blue-300 ";
    } else if (isChaserPassed) {
      stepClass += "bg-red-400 border-red-200 ";
    } else {
      stepClass += "bg-blue-800 border-blue-600 ";
    }

    // Render text input for steps around player during setup
    if (isStepAroundPlayer && !hasCustomLabel) {
      return (
        <div key={stepIndex} className="flex items-center justify-center">
          <div className={stepClass}>
            <input
              type="text"
              placeholder="Drink number"
              className="w-24 h-8 text-xs text-black text-center rounded border-none bg-white/90"
              value={editingSteps[stepIndex] || ''}
              onChange={(e) => handleStepLabelChange(stepIndex, e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStepLabelSubmit(stepIndex)}
              onBlur={() => handleStepLabelSubmit(stepIndex)}
            />
          </div>
        </div>
      );
    }

    // Render button for steps with custom labels during setup
    if (isStepAroundPlayer && hasCustomLabel) {
      return (
        <div key={stepIndex} className="flex items-center justify-center">
          <button
            onClick={() => onPlayerStartPositionChange && onPlayerStartPositionChange(stepIndex, stepLabels[stepIndex])}
            className={`${stepClass} cursor-pointer hover:scale-110 hover:brightness-110`}
          >
            <span className="text-sm font-bold">{stepLabels[stepIndex]}</span>
          </button>
        </div>
      );
    }

    if (stepIndex === 4 && !hasCustomLabel) {
      return (
        <div key={stepIndex} className="flex items-center justify-center">
          <div className={stepClass}>
            <button
            onClick={() => onPlayerStartPositionChange && onPlayerStartPositionChange(stepIndex, stepLabels[stepIndex])}
            className={`${stepClass} cursor-pointer hover:scale-110 hover:brightness-110`}
          >
            <span className="text-sm font-bold">5 sips</span>
          </button>
          </div>
        </div>
      );
    }



    return (
      <div key={stepIndex} className="flex items-center justify-center">
        <div className={stepClass}>
          <span className="text-2xl">
            {isFinishLine ? (
              "🏁"
            ) : isPlayerHere && isChaserHere ? (
              "💥"
            ) : isPlayerHere ? (
              playerData.emoji
            ) : isChaserHere ? (
              "👹"
            ) : isBelowChaser ? (
              "👹"
            ) : isPassed ? (
              "✅"
            ) : isChaserPassed ? (
              "❌"
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    );
  };

  // Create steps array including the finish line, but reverse order for top-to-bottom
  const steps = [];
  for (let i = totalSteps; i >= 0; i--) {
    steps.push(renderStep(i));
  }

  const distanceFromChaser = playerPosition - chaserPosition;

  return (
    <div className="w-64">
      <Card>
        <h3 className="text-xl font-bold text-white mb-4 text-center">The Chase Board</h3>
        
        {/* Progress indicators */}
        <div className="flex justify-between text-white mb-6 text-sm">
          <div className="text-center">
            <div className="font-bold flex items-center justify-center gap-1">
              {playerData.emoji} <span>{playerData.name}</span>
            </div>
            <div>Pos: {playerPosition}/{totalSteps}</div>
            <div className="text-xs opacity-75">
              {totalSteps - playerPosition} to go!
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold flex items-center justify-center gap-1">
              👹 <span>Chasers</span>
            </div>
            <div>Pos: {chaserPosition}/{totalSteps}</div>
            <div className="text-xs opacity-75">
              {playerPosition - chaserPosition} behind you.. 
            </div>
          </div>
        </div>

        {/* Game board - Compressed Vertical Stack */}
        <div className="flex flex-col items-center space-y-0">
          {steps}
        </div>

        {/* Distance indicator */}
        <div className="text-center text-white mt-4">
          <div className="text-sm">
            Distance: {distanceFromChaser} steps
            {distanceFromChaser <= 1 && playerPosition > 0 && (
              <span className="text-red-400 font-bold ml-2 animate-pulse">⚠️ DANGER!</span>
            )}
            {distanceFromChaser <= 0 && playerPosition > 0 && (
              <span className="text-red-600 font-bold ml-2 animate-bounce">💀 CAUGHT!</span>
            )}
          </div>
          {distanceFromChaser > 5 && (
            <div className="text-green-400 text-xs mt-1">You&apos;re doing great!</div>
          )}
          {distanceFromChaser <= 3 && distanceFromChaser > 1 && isGameStarted &&(
            <div className="text-yellow-400 text-xs mt-1">Chaser is getting closer...</div>
          )}
        </div>
      </Card>
    </div>
  );
}
