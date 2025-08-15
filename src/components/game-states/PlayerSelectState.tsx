/**
 * Player Select State Component
 * 
 * Screen for choosing which player character to play as.
 * Each player has their own set of specialized questions and visual identity.
 */

'use client';

import { Player, PlayerData } from '../../types/game';
import { Button, Card } from '../ui';

/**
 * Props for the PlayerSelectState component
 */
interface PlayerSelectStateProps {
  /** Array of available player characters */
  players: PlayerData[];
  /** Callback when a player character is selected */
  onPlayerSelect: (playerId: Player) => void;
  /** Callback to return to main menu */
  onBack: () => void;
}

/**
 * Player character selection screen
 * 
 * Displays all available player characters with their:
 * - Visual emoji representation
 * - Character name
 * - Individual selection buttons
 * 
 * Each player character has their own specialized question set,
 * allowing for different difficulty levels and topic areas.
 */
export default function PlayerSelectState({ 
  players, 
  onPlayerSelect, 
  onBack 
}: PlayerSelectStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Screen title */}
        <h1 className="text-6xl font-bold text-white mb-4">
          THE CHASE
        </h1>

        <p className="text-3xl text-red-500 mb-8">
          Choose Your Chaser
        </p>
        
        {/* Player character selection grid */}
        <div className="max-w-8xl">
          {/* First row - 8 players */}
          <div className="grid grid-cols-8 gap-4 mb-2">
            {players.slice(0, 16).map((player: PlayerData) => (
              <Card key={player.id} className="w-50 h-70">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    {/* Character emoji avatar */}
                    <div className="text-5xl mb-2 text-center h-15">{player.emoji}</div>

                    {/* Character name */}
                    <h2 className="text-2xl font-bold mb-3 text-center leading-tight h-8">{player.name}</h2>

                    {/* Description with fixed height */}
                    <div className="text-xl text-white text-center h-12 flex items-center justify-center px-1 mb-1">{player.description}</div>
                  </div>
                  
                  {/* Selection button always at bottom */}
                  <div className="flex justify-center w-full mt-2">
                    <Button
                      onClick={() => onPlayerSelect(player.id as Player)}
                      variant={'success'}
                      size="smmd"
                    >
                      Play
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Back to menu navigation */}
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
