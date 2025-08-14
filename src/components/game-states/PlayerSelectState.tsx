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
          THE CHASE: YOU vs THE WORLD
        </h1>

        <p className="text-3xl text-red-500 mb-8">
          Choose Your Player
        </p>
        
        {/* Player character selection grid */}
        <div className="flex gap-8 justify-center flex-wrap">
          {players.map((player: PlayerData) => (
            <Card key={player.id} className="max-w-sm">
              <div className="text-center">
                {/* Character emoji avatar */}
                <div className="text-6xl mb-4">{player.emoji}</div>
                
                {/* Character name */}
                <h2 className="text-3xl font-bold text-white mb-4">{player.name}</h2>

                <ul className="text-xl text-white mb-4">{player.description}</ul>
                
                {/* Selection button with character-specific styling */}
                <Button
                  onClick={() => onPlayerSelect(player.id as Player)}
                  variant={'success'}
                >
                  Play as {player.name}
                </Button>
              </div>
            </Card>
          ))}
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
