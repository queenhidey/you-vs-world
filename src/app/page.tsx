/**
 * Main Application Page
 * 
 * Root component that manages the overall application flow.
 * Handles navigation between different game states: menu, player selection, and gameplay.
 */

'use client';

import { useState } from 'react';
import { ChaseGame } from '../components/features';
import { MenuState, PlayerSelectState } from '../components/game-states';
import { Player, getAllPlayers } from './data/questions';

/**
 * Main application component
 * 
 * Manages the top-level application state and navigation flow:
 * 1. MenuState - Initial welcome screen with game instructions
 * 2. PlayerSelectState - Choose which player character to play as
 * 3. ChaseGame - The actual game experience
 * 
 * State transitions:
 * Menu → Player Selection → Game → Menu (on game end)
 */
export default function Home() {
  // Application state management
  const [gameStarted, setGameStarted] = useState(false);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Get all available player characters from data
  const allPlayers = getAllPlayers();

  /**
   * Handles game completion (win or lose)
   * Resets all state to return to the main menu
   */
  const handleGameEnd = () => {
    setGameStarted(false);
    setShowPlayerSelect(false);
    setSelectedPlayer(null);
  };

  /**
   * Handles player character selection
   * Transitions from player selection to game start
   */
  const handlePlayerSelect = (playerId: Player) => {
    setSelectedPlayer(playerId);
    setGameStarted(true);
  };

  /**
   * Handles "Start The Chase" button from main menu
   * Transitions to player selection screen
   */
  const handleStartGame = () => {
    setShowPlayerSelect(true);
  };

  /**
   * Handles back navigation from player selection
   * Returns to main menu
   */
  const handleBackToMenu = () => {
    setShowPlayerSelect(false);
  };

  // Render the game if both conditions are met
  if (gameStarted && selectedPlayer) {
    return <ChaseGame onGameEnd={handleGameEnd} selectedPlayer={selectedPlayer} />;
  }

  // Render player selection screen
  if (showPlayerSelect) {
    return (
      <PlayerSelectState
        players={allPlayers}
        onPlayerSelect={handlePlayerSelect}
        onBack={handleBackToMenu}
      />
    );
  }

  // Render main menu (default state)
  return <MenuState onStartGame={handleStartGame} />;
}
