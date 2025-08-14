/**
 * Game Board Component
 * 
 * Visual representation of the chase game board with dynamic position tracking,
 * interactive setup capabilities, and real-time game state visualization.
 */

'use client';

import { useState } from 'react';
import { GameBoardProps } from '../../types/game';
import { Card } from '../ui';

/**
 * Interactive game board with multi-phase functionality
 * 
 * Core Features:
 * - Visual position tracking for player and chaser
 * - Interactive setup phase for custom step labels
 * - Dynamic color coding based on game state
 * - Proximity warnings and status indicators
 * - Responsive emoji-based position markers
 * 
 * Board Layout:
 * - Vertical orientation (top = finish line, bottom = start)
 * - Compressed layout for better UX
 * - 7 total positions (0-6) with finish line at position 6
 * 
 * Setup Phase:
 * - Positions 3, 4, 5 become interactive input fields
 * - Players enter custom labels (typically drink counts)
 * - Clicking labeled positions sets starting position
 * 
 * Game Phase:
 * - Real-time position updates
 * - Color-coded progress visualization  
 * - Distance tracking and warnings
 * - Collision detection (player caught)
 */
export default function GameBoard({ 
  playerPosition, 
  chaserPosition, 
  totalSteps, 
  isGameStarted = true, 
  onPlayerStartPositionChange, 
  stepLabels = {}, 
  onStepLabelChange
}: GameBoardProps) {
  
  // Track text input values during setup phase
  const [editingSteps, setEditingSteps] = useState<{ [key: number]: string }>({});

  /**
   * Handle text input changes for step labels during setup
   * 
   * @param stepIndex - The position being edited
   * @param value - New text value for the label
   */
  const handleStepLabelChange = (stepIndex: number, value: string) => {
    setEditingSteps(prev => ({ ...prev, [stepIndex]: value }));
  };

  /**
   * Submit and save a step label
   * 
   * Triggers when user presses Enter or loses focus on input field.
   * Cleans up local editing state after submission.
   * 
   * @param stepIndex - The position being finalized
   */
  const handleStepLabelSubmit = (stepIndex: number) => {
    const label = editingSteps[stepIndex] || '';
    if (onStepLabelChange) {
      onStepLabelChange(stepIndex, label);
    }
    // Clear local editing state for this step
    setEditingSteps(prev => {
      const newState = { ...prev };
      delete newState[stepIndex];
      return newState;
    });
  };

  /**
   * Render individual step with context-aware styling and functionality
   * 
   * Handles multiple rendering modes:
   * - Setup inputs for positions 3, 4, 5 without labels
   * - Setup buttons for positions 3, 4, 5 with labels
   * - Game visualization with position markers and status
   * 
   * @param stepIndex - Zero-based position index (0 = start, totalSteps = finish)
   * @returns JSX element representing the step
   */
  const renderStep = (stepIndex: number) => {
    // Position analysis
    const isPlayerHere = playerPosition === stepIndex;
    const isChaserHere = chaserPosition === stepIndex;
    const isFinishLine = stepIndex === totalSteps;
    const isPassed = playerPosition > stepIndex;
    const isChaserPassed = chaserPosition > stepIndex;
    const isBelowChaser = stepIndex < chaserPosition;
    const isStepAroundPlayer = !isGameStarted && (stepIndex === 3 || stepIndex === 4 || stepIndex === 5);
    const hasCustomLabel = stepLabels[stepIndex];
    
    // Base step styling with transitions
    let stepClass = "w-32 h-14 rounded-lg border-2 flex items-center justify-center text-white font-bold text-lg relative transition-all duration-500 ";
    
    // SETUP PHASE COLORING
    if (isStepAroundPlayer && !isGameStarted) {
      if (isPlayerHere) {
        stepClass += "bg-blue-400 border-blue-300 "; // Selected starting position
      } else {
        stepClass += "bg-blue-800 border-blue-600 "; // Available setup positions
      }
    } 
    // SPECIAL POSITIONS
    else if (isFinishLine) {
      stepClass += "bg-yellow-500 border-yellow-300 "; // Finish line - gold
    } 
    // COLLISION STATE
    else if (isPlayerHere && isChaserHere) {
      stepClass += "bg-red-600 border-red-400 animate-bounce "; // Player caught - animated red
    } 
    // CURRENT POSITIONS
    else if (isPlayerHere) {
      stepClass += "bg-blue-600 border-blue-400 scale-105 "; // Player position - scaled blue
    } else if (isChaserHere) {
      stepClass += "bg-red-600 border-red-400 scale-105 "; // Chaser position - scaled red
    } 
    // CHASER TERRITORY
    else if (isBelowChaser) {
      stepClass += "bg-red-500 border-red-300 "; // Behind chaser - red territory
    } 
    // SETUP DEFAULT
    else if (!isGameStarted) {
      stepClass += "bg-blue-800 border-blue-600 "; // Setup phase default
    } 
    // PROGRESS STATES
    else if (isPassed) {
      stepClass += "bg-blue-400 border-blue-300 "; // Player completed - light blue
    } else if (isChaserPassed) {
      stepClass += "bg-red-400 border-red-200 "; // Chaser passed - light red
    } else {
      stepClass += "bg-blue-800 border-blue-600 "; // Upcoming steps - dark blue
    }

    // SETUP MODE: Text input for unlabeled positions
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
              aria-label={`Enter label for position ${stepIndex}`}
            />
          </div>
        </div>
      );
    }

    // SETUP MODE: Clickable button for labeled positions
    if (isStepAroundPlayer && hasCustomLabel) {
      return (
        <div key={stepIndex} className="flex items-center justify-center">
          <button
            onClick={() => onPlayerStartPositionChange && onPlayerStartPositionChange(stepIndex, stepLabels[stepIndex])}
            className={`${stepClass} cursor-pointer hover:scale-110 hover:brightness-110`}
            aria-label={`Select position ${stepIndex} as starting position`}
          >
            <span className="text-sm font-bold">{stepLabels[stepIndex]}</span>
          </button>
        </div>
      );
    }

    // GAME MODE: Visual position markers with emojis
    return (
      <div key={stepIndex} className="flex items-center justify-center">
        <div className={stepClass}>
          <span className="text-2xl">
            {isFinishLine ? (
              "🏁"          // Finish line flag
            ) : isPlayerHere && isChaserHere ? (
              "💥"          // Collision explosion
            ) : isPlayerHere ? (
              "🧑"          // Player emoji
            ) : isChaserHere ? (
              "👹"          // Chaser emoji
            ) : isBelowChaser ? (
              "👹"          // Chaser territory marker
            ) : isPassed ? (
              "✅"          // Completed step checkmark
            ) : isChaserPassed ? (
              "❌"          // Chaser passed marker
            ) : (
              ""            // Empty upcoming step
            )}
          </span>
        </div>
      </div>
    );
  };

  /**
   * Generate steps array in reverse order for top-to-bottom display
   * Creates visual layout where finish line is at top, start at bottom
   */
  const steps = [];
  for (let i = totalSteps; i >= 0; i--) {
    steps.push(renderStep(i));
  }

  // Calculate distance for proximity warnings
  const distanceFromChaser = playerPosition - chaserPosition;

  return (
    <div className="w-64">
      <Card>
        {/* Board title */}
        <h3 className="text-xl font-bold text-white mb-4 text-center">The Chase Board</h3>
        
        {/* Player and chaser status indicators */}
        <div className="flex justify-between text-white mb-6 text-sm">
          {/* Player status */}
          <div className="text-center">
            <div className="font-bold flex items-center justify-center gap-1">
              🧑 <span>Player</span>
            </div>
            <div>Pos: {playerPosition}/{totalSteps}</div>
            <div className="text-xs opacity-75">
              {totalSteps - playerPosition} to go!
            </div>
          </div>
          
          {/* Chaser status */}
          <div className="text-center">
            <div className="font-bold flex items-center justify-center gap-1">
              👹 <span>Chaser</span>
            </div>
            <div>Pos: {chaserPosition}/{totalSteps}</div>
            <div className="text-xs opacity-75">
              {playerPosition - chaserPosition} behind you.. 
            </div>
          </div>
        </div>

        {/* Main game board - compressed vertical layout */}
        <div className="flex flex-col items-center space-y-0">
          {steps}
        </div>

        {/* Distance indicator and warnings */}
        <div className="text-center text-white mt-4">
          <div className="text-sm">
            Distance: {distanceFromChaser} steps
            {/* Danger warning when chaser is very close */}
            {distanceFromChaser <= 1 && playerPosition > 0 && (
              <span className="text-red-400 font-bold ml-2 animate-pulse">⚠️ DANGER!</span>
            )}
            {/* Caught indicator when positions match */}
            {distanceFromChaser <= 0 && playerPosition > 0 && (
              <span className="text-red-600 font-bold ml-2 animate-bounce">💀 CAUGHT!</span>
            )}
          </div>
          
          {/* Contextual encouragement and warnings */}
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
