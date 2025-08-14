'use client';

import { Button, Card } from '../ui';

interface GameSetupStateProps {
  stepLabels: { [key: number]: string };
  hasSelectedStartPosition: boolean;
  onStartGame: () => void;
}

export default function GameSetupState({ 
  stepLabels, 
  hasSelectedStartPosition, 
  onStartGame 
}: GameSetupStateProps) {
  const allLabelsComplete = stepLabels[3] && stepLabels[4] && stepLabels[5];
  const canStart = hasSelectedStartPosition && allLabelsComplete;

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Game Setup</h2>
      <p className="text-white mb-6">
        Enter labels for all three steps around your starting position, then click on a step to choose your starting position.
      </p>
      
      {!allLabelsComplete && (
        <p className="text-yellow-300 mb-4 font-medium">
          ⚠️ Please fill in all three text fields first
        </p>
      )}
      
      {allLabelsComplete && !hasSelectedStartPosition && (
        <p className="text-yellow-300 mb-4 font-medium">
          ⚠️ Now select a starting position by clicking one of the buttons on the board
        </p>
      )}
      
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
