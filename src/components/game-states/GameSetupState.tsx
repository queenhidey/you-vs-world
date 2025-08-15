/**
 * Game Setup State Component
 * 
 * Handles the pre-game setup phase where players configure their starting position.
 * Players must fill in custom labels and select their starting position before the game begins.
 */

'use client';

import { Button, Card } from '../ui';

/**
 * Props for the GameSetupState component
 */
interface GameSetupStateProps {
  /** Custom labels entered for board positions */
  stepLabels: { [key: number]: string };
  /** Whether the player has selected their starting position */
  hasSelectedStartPosition: boolean;
  /** Callback to begin the actual game */
  onStartGame: () => void;
}

/**
 * Game setup screen component
 * 
 * Manages the setup phase where players must:
 * 1. Fill in custom labels for positions 3, 4, and 5 on the game board
 * 2. Select their starting position by clicking on one of the labeled positions
 * 
 * The setup ensures players understand the board layout and have
 * personalized stakes for each position (typically drink counts or similar).
 * 
 * Provides clear visual feedback about what steps remain to be completed.
 */
export default function GameSetupState({ 
  stepLabels, 
  hasSelectedStartPosition, 
  onStartGame 
}: GameSetupStateProps) {
  
  // Check if all required labels have been filled in
  const allLabelsComplete = stepLabels[3] && stepLabels[4] && stepLabels[5];
  
  // Game can only start when both conditions are met
  const canStart = hasSelectedStartPosition && allLabelsComplete;

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Game Setup</h2>
      
      {/* Setup instructions */}
      <p className="text-white mb-6">
        Enter labels for all three steps around your starting position, then click on a step to choose your starting position.
      </p>
      
      {/* Warning: Labels not complete */}
      {!allLabelsComplete && (
        <p className="text-yellow-300 mb-4 font-medium">
          ⚠️ Please fill in all text fields first
        </p>
      )}
      
      {/* Warning: Position not selected */}
      {allLabelsComplete && !hasSelectedStartPosition && (
        <p className="text-yellow-300 mb-4 font-medium">
          ⚠️ Now select a starting position by clicking one of the buttons on the board
        </p>
      )}
      
      {/* Start game button - only enabled when setup is complete */}
      <div className="flex justify-center">
        <Button
          variant="success"
          size="lg"
          onClick={onStartGame}
          disabled={!canStart}
        >
          Start Game
        </Button>
      </div>
    </Card>
  );
}
