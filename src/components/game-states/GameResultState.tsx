'use client';

import { Button } from '../ui';

interface GameResultStateProps {
  result: 'won' | 'caught';
  playerName: string;
  onGameEnd: () => void;
}

export default function GameResultState({ result, playerName, onGameEnd }: GameResultStateProps) {
  const isWon = result === 'won';
  
  const bgGradient = isWon 
    ? 'from-green-600 to-blue-600' 
    : 'from-red-600 to-black';
    
  const title = isWon ? '🎉 YOU WON! 🎉' : '💀 CAUGHT! 💀';
  const message = isWon 
    ? `You escaped! ${playerName} DRINKS FOR EVERYONE (except you)`
    : `The Chasers got you! ${playerName} DRINKS FOR YOU`;
    
  const buttonVariant = isWon ? 'success' : 'danger';
  const buttonText = isWon ? 'Play Again' : 'Try Again';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4`}>
      <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">{title}</h1>
        <p className="text-2xl text-white mb-8">{message}</p>
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
