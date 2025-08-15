/**
 * Menu State Component
 * 
 * Initial welcome screen that introduces the game and provides entry point.
 * Displays game rules and the main "Start The Chase" button.
 */

'use client';

import { Button, Card } from '../ui';

/**
 * Props for the MenuState component
 */
interface MenuStateProps {
  /** Callback when user wants to start playing */
  onStartGame: () => void;
}

/**
 * Main menu screen component
 * 
 * Serves as the landing page for the application, providing:
 * - Game title and branding
 * - Clear instructions on how to play
 * - Entry point to begin the game experience
 * 
 * Uses a centered layout with glass morphism card styling
 * to create an engaging visual presentation.
 */
export default function MenuState({ onStartGame }: MenuStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Main game title */}
        <h1 className="text-6xl font-bold text-white mb-8">
          THE CHASE
        </h1>
        
        {/* Game instructions card */}
        <Card className="max-w-md mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-6">How to Play</h2>
          
          {/* Game rules list */}
          <ul className="text-white text-left space-y-2 mb-6 text-center">
            <li>• Answer questions to move forward and catch!</li>
            <li>• Get questions wrong and the Chaser might catch up!</li>
            <li>• Reach the end before being caught to win!</li>
          </ul>
          
          {/* Main action button - centered for visual balance */}
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
