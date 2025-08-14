'use client';

import { useState, useEffect } from 'react';
import { QuestionCardProps } from '../../types/game';
import { Card } from '../ui';

export default function QuestionCard({ 
  question, 
  onAnswer, 
  onChaserPick, 
  disabled, 
  showCorrectAnswer = false, 
  playerDidntAnswer = false 
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [secondAnswer, setSecondAnswer] = useState<number | null>(null);

  // Reset selected answers when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setSecondAnswer(null);
  }, [question.id]);

  const handleOptionClick = (optionIndex: number) => {
    if (disabled) return;
    
    if (playerDidntAnswer || selectedAnswer !== null) {
      // Player didn't answer OR player already answered - this is chaser's selection
      if (secondAnswer === null) {
        setSecondAnswer(optionIndex);
        if (onChaserPick) {
          onChaserPick(optionIndex);
        }
      }
    } else {
      // Normal player selection
      setSelectedAnswer(optionIndex);
      const isCorrect = optionIndex === question.correctAnswer;
      onAnswer(isCorrect, optionIndex);
    }
  };

  const getOptionClass = (optionIndex: number) => {
    let baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 transform ";
    
    // Disable all cards after chaser's pick (secondAnswer) is made, or if explicitly disabled
    // BUT don't reduce opacity for correct answer when it's being shown
    if (disabled || (secondAnswer !== null && !(showCorrectAnswer && optionIndex === question.correctAnswer))) {
      baseClass += "cursor-not-allowed opacity-75 ";
    } else {
      baseClass += "cursor-pointer hover:bg-blue-100 hover:border-blue-400 hover:scale-105 hover:shadow-lg ";
    }

    if (showCorrectAnswer) {
      // Show Answer overrides everything - correct answer in solid green
      if (optionIndex === question.correctAnswer) {
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
        baseClass += "bg-gray-100 border-gray-300 text-gray-600 ";
      }
    } else if (selectedAnswer === optionIndex && secondAnswer === optionIndex) {
      // Same card selected by both player and chaser - blue background with orange border
      baseClass += "bg-blue-600 border-orange-500 border-4 text-white scale-105 ";
    } else if (selectedAnswer === optionIndex) {
      // Player's pick only - solid blue
      baseClass += "bg-blue-600 border-blue-600 text-white scale-105 ";
    } else if (secondAnswer === optionIndex) {
      // Chaser's pick only - orange border
      baseClass += "bg-white border-orange-500 border-4 text-gray-800 scale-105 ";
    } else {
      baseClass += "bg-white border-gray-300 text-gray-800 ";
    }

    return baseClass;
  };

  return (
    <div className="w-full">
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={disabled || secondAnswer !== null}
              className={getOptionClass(index)}
            >
              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
