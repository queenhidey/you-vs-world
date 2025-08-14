'use client';

import { Button, Card } from '../ui';

interface MenuStateProps {
  onStartGame: () => void;
}

export default function MenuState({ onStartGame }: MenuStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 shadow-lg">
          THE CHASE: YOU vs THE WORLD 
        </h1>
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">How to Play</h2>
          <ul className="text-white text-left space-y-2 mb-6">
            <li>• Answer questions to move forward</li>
            <li>• Get questions wrong and the Chaser catches up</li>
            <li>• Reach the end before being caught to win!</li>
          </ul>
          <div className="flex justify-center">
            <Button variant="danger" size="lg" onClick={onStartGame}>
              Start The Chase
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
