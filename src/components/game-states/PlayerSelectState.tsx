'use client';

import { Player, PlayerData } from '../../types/game';
import { Button, Card } from '../ui';

interface PlayerSelectStateProps {
  players: PlayerData[];
  onPlayerSelect: (playerId: Player) => void;
  onBack: () => void;
}

export default function PlayerSelectState({ players, onPlayerSelect, onBack }: PlayerSelectStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 shadow-lg">
          THE CHASE
        </h1>
        <p className="text-xl text-white mb-8 opacity-90">
          Choose Your Player
        </p>
        <div className="flex gap-8 justify-center flex-wrap">
          {players.map((player: PlayerData) => (
            <Card key={player.id} className="max-w-sm">
              <div className="text-center">
                <div className="text-6xl mb-4">{player.emoji}</div>
                <h2 className="text-3xl font-bold text-white mb-4">{player.name}</h2>
                <Button
                  variant={player.id === 'jimmy' ? 'primary' : 'success'}
                  onClick={() => onPlayerSelect(player.id as Player)}
                  className="w-full"
                >
                  Play as {player.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={onBack}
            className="mt-8"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
}
