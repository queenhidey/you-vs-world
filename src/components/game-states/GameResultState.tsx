/**
 * Game Result State Component
 * 
 * Displays the final outcome of a completed chase game with dramatic full-screen presentation.
 * Shows victory or defeat with appropriate visual styling, drinking game consequences, and sound effects.
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui';
import { FanfareSound, WompWompSound } from '../audio';

/**
 * Props for the GameResultState component
 */
interface GameResultStateProps {
  /** Game outcome - either 'won' (escaped) or 'caught' by chasers */
  result: 'won' | 'caught';
  /** Name of the player for personalized messaging */
  playerName: string;
  /** Callback to end current game and return to setup */
  onGameEnd: () => void;
}

/**
 * Full-screen game result component
 * 
 * Provides dramatic conclusion to chase game with:
 * - Immersive full-screen background gradients based on outcome
 * - Large emoji and text for high visual impact
 * - Drinking game consequences integrated into messaging
 * - Contextual action button (Play Again vs Try Again)
 * - Victory fanfare or defeat womp womp sound effects
 * 
 * Visual Design:
 * - Victory: Green to blue gradient with celebration emoji
 * - Defeat: Red to black gradient with caught emoji
 * - Glass morphism card effect for modern aesthetic
 */
export default function GameResultState({ result, playerName, onGameEnd }: GameResultStateProps) {
  // State for controlling sound playback
  const [playSound, setPlaySound] = useState(false);
  
  // Determine if player successfully escaped
  const isWon = result === 'won';
  
  // Trigger sound effect when component mounts
  useEffect(() => {
    setPlaySound(true);
  }, []);
  
  // Set background gradient based on game outcome
  const bgGradient = isWon 
    ? 'from-green-600 to-blue-600'  // Victory: celebratory green to blue
    : 'from-red-600 to-black';      // Defeat: dramatic red to black
    
  // Main title with outcome-specific emoji and messaging
  const title = isWon ? '🎉 WIN! 🎉' : '💀 CAUGHT! 💀';
  
  // Personalized message including game consequences
  const message = isWon 
    ? `You successfully escaped! ${playerName} for the Chaser`
    : `The Chaser got you! ${playerName} for everyone!`;
    
  // Button styling and text based on outcome
  const buttonVariant = isWon ? 'success' : 'danger';
  const buttonText = isWon ? 'Play Again' : 'Try Again';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4`}>
      {/* Sound Effects */}
      {isWon ? (
        <FanfareSound 
          play={playSound} 
          volume={0.4}
          onComplete={() => setPlaySound(false)}
        />
      ) : (
        <WompWompSound 
          play={playSound} 
          volume={0.4}
          onComplete={() => setPlaySound(false)}
        />
      )}
      
      {/* Main result card with glass morphism effect */}
      <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md">
        {/* Large dramatic title */}
        <h1 className="text-6xl font-bold text-white mb-4">{title}</h1>
        
        {/* Personalized consequence message */}
        <p className="text-2xl text-white mb-8">{message}</p>
        
        {/* Action button centered */}
        <div className="flex justify-center">
          <Button
            variant={buttonVariant}
            size="lg"
            onClick={onGameEnd}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
