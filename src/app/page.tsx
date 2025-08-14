'use client';

import { useState } from 'react';
import { ChaseGame } from '../components/features';
import { MenuState, PlayerSelectState } from '../components/game-states';
import { Player, getAllPlayers } from './data/questions';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const allPlayers = getAllPlayers();

  const handleGameEnd = () => {
    setGameStarted(false);
    setShowPlayerSelect(false);
    setSelectedPlayer(null);
  };

  const handlePlayerSelect = (playerId: Player) => {
    setSelectedPlayer(playerId);
    setGameStarted(true);
  };

  const handleStartGame = () => {
    setShowPlayerSelect(true);
  };

  const handleBackToMenu = () => {
    setShowPlayerSelect(false);
  };

  if (gameStarted && selectedPlayer) {
    return <ChaseGame onGameEnd={handleGameEnd} selectedPlayer={selectedPlayer} />;
  }

  if (showPlayerSelect) {
    return (
      <PlayerSelectState
        players={allPlayers}
        onPlayerSelect={handlePlayerSelect}
        onBack={handleBackToMenu}
      />
    );
  }

  return <MenuState onStartGame={handleStartGame} />;
}
