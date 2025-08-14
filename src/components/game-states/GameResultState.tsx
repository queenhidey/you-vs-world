/**
 * Game Result State Component
 * 
 * Displays the final outcome of a completed chase game with dramatic full-screen presentation.
 * Shows victory or defeat with appropriate visual styling and drinking game consequences.
 */

'use client';

import { Button } from '../ui';

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
 * 
 * Visual Design:
 * - Victory: Green to blue gradient with celebration emoji
 * - Defeat: Red to black gradient with caught emoji
 * - Glass morphism card effect for modern aesthetic
 */
export default function GameResultState({ result, playerName, onGameEnd }: GameResultStateProps) {
  // Determine if player successfully escaped
  const isWon = result === 'won';
  
  // Set background gradient based on game outcome
  const bgGradient = isWon 
    ? 'from-green-600 to-blue-600'  // Victory: celebratory green to blue
    : 'from-red-600 to-black';      // Defeat: dramatic red to black
    
  // Main title with outcome-specific emoji and messaging
  const title = isWon ? '🎉 YOU WON! 🎉' : '💀 CAUGHT! 💀';
  
  // Personalized message including drinking game consequences
  const message = isWon 
    ? `You escaped! ${playerName} DRINKS FOR EVERYONE (except you)`
    : `The Chasers got you! ${playerName} DRINKS FOR YOU`;
    
  // Button styling and text based on outcome
  const buttonVariant = isWon ? 'success' : 'danger';
  const buttonText = isWon ? 'Play Again' : 'Try Again';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4`}>
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
