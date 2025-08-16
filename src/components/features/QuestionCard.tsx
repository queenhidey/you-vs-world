/**
 * Question Card Component
 * 
 * Advanced interactive quiz component for the chase game that handles both player
 * and chaser answer selections with sophisticated visual feedback systems.
 */

'use client';

import { useState, useEffect } from 'react';
import { QuestionCardProps } from '../../types/game';
import { Card } from '../ui';

/**
 * Interactive question card with dual selection capability
 * 
 * Core Features:
 * - Player answer selection with immediate feedback
 * - Chaser (AI) answer selection visualization
 * - Complex state management for multiple selection phases
 * - Visual distinction between player and chaser choices
 * - Correct answer revelation with priority highlighting
 * 
 * Selection Flow:
 * 1. Player selects answer (blue highlighting)
 * 2. Chaser selects answer (orange border)
 * 3. Correct answer revealed (green highlighting)
 * 4. Special handling when both select same answer
 * 
 * Visual Coding System:
 * - Blue: Player's selection
 * - Orange border: Chaser's selection  
 * - Green: Correct answer
 * - Blue with orange border: Both player and chaser selected same option
 */
export default function QuestionCard({ 
  question, 
  onAnswer, 
  onChaserPick, 
  disabled, 
  showCorrectAnswer = false, 
  playerDidntAnswer = false 
}: QuestionCardProps) {
  
  // Track player's selected answer index
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  // Track chaser's selected answer index (secondary selection)
  const [secondAnswer, setSecondAnswer] = useState<number | null>(null);

  /**
   * Reset selection state when question changes
   * Ensures clean state for each new question
   */
  useEffect(() => {
    setSelectedAnswer(null);
    setSecondAnswer(null);
  }, [question.id]);

  /**
   * Handle option selection with context-aware logic
   * 
   * Determines whether selection is from player or chaser based on current state:
   * - If player hasn't answered or already answered: this is chaser's pick
   * - Otherwise: this is player's initial selection
   * 
   * @param optionIndex - Zero-based index of selected option
   */
  const handleOptionClick = (optionIndex: number) => {
    // Prevent selection if component is disabled
    if (disabled) return;
    
    if (playerDidntAnswer || selectedAnswer !== null) {
      // CHASER SELECTION PHASE
      // Player didn't answer in time OR player already answered - this is chaser's selection
      if (secondAnswer === null) {
        setSecondAnswer(optionIndex);
        if (onChaserPick) {
          onChaserPick(optionIndex);
        }
      }
    } else {
      // PLAYER SELECTION PHASE
      // Normal player selection
      setSelectedAnswer(optionIndex);
      onAnswer(optionIndex === question.correctAnswer, optionIndex);
    }
  };

  /**
   * Generate dynamic CSS classes for option buttons based on selection state
   * 
   * Handles complex visual states including:
   * - Hover effects for interactive options
   * - Disabled states with appropriate opacity
   * - Color coding for player vs chaser selections
   * - Correct answer highlighting that overrides other states
   * - Special handling for matching selections
   * 
   * @param optionIndex - Zero-based index of the option
   * @returns Complete CSS class string for the option button
   */
  const getOptionClass = (optionIndex: number) => {
    let baseClass = "w-full p-4 lg:p-8 text-left text-lg lg:text-3xl rounded-lg border-2 transition-all duration-300 transform ";
    
    // DISABLED STATE LOGIC
    // Disable all cards after chaser's pick (secondAnswer) is made, or if explicitly disabled
    // BUT don't reduce opacity for correct answer when it's being shown
    if (disabled || (secondAnswer !== null && !(showCorrectAnswer && optionIndex === question.correctAnswer))) {
      baseClass += "cursor-not-allowed opacity-75 ";
    } else {
      // INTERACTIVE STATE - add hover effects
      baseClass += "cursor-pointer hover:bg-blue-100 hover:border-blue-400 hover:scale-105 hover:shadow-lg ";
    }

    // ANSWER REVELATION STATE (highest priority)
    if (showCorrectAnswer) {
      if (optionIndex === question.correctAnswer) {
        // Correct answer gets solid green (overrides everything)
        baseClass += "bg-green-600 border-green-600 text-white scale-105 ";
      } else if (selectedAnswer === optionIndex && secondAnswer === optionIndex) {
        // Same card selected by both player and chaser - blue background with orange border
        baseClass += "bg-blue-600 border-orange-500 border-4 text-white scale-105 ";
      } else if (selectedAnswer === optionIndex) {
        // Player's pick only - blue
        baseClass += "bg-blue-600 border-blue-600 text-white scale-105 ";
      } else if (secondAnswer === optionIndex) {
        // Chaser's pick only - orange border
        baseClass += "bg-white border-orange-500 border-4 text-gray-800 scale-105 ";
      } else {
        // Unselected options when answer is revealed
        baseClass += "bg-gray-100 border-gray-300 text-gray-600 ";
      }
    } 
    // SELECTION STATE (before answer revelation)
    else if (selectedAnswer === optionIndex && secondAnswer === optionIndex) {
      // Both player and chaser selected same option - blue background with orange border
      baseClass += "bg-blue-600 border-orange-500 border-4 text-white scale-105 ";
    } else if (selectedAnswer === optionIndex) {
      // Player's pick only - solid blue
      baseClass += "bg-blue-600 border-blue-600 text-white scale-105 ";
    } else if (secondAnswer === optionIndex) {
      // Chaser's pick only - orange border highlights
      baseClass += "bg-white border-orange-500 border-4 text-gray-800 scale-105 ";
    } else {
      // Default unselected state
      baseClass += "bg-white border-gray-300 text-gray-800 ";
    }

    return baseClass;
  };

  return (
    <div className="w-full">
      <Card variant="glass" className="!p-4 lg:!p-6">
        {/* Question text */}
        <h2 className="text-2xl lg:text-5xl font-bold text-white mb-6 lg:mb-8">{question.question}</h2>
        
        {/* Answer options grid */}
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={disabled || secondAnswer !== null}
              className={getOptionClass(index)}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
            >
              {/* Option label (A, B, C, D) */}
              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {/* Option text */}
              {option}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
