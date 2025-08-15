import { players } from './players';

// Base interfaces
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface PlayerData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: Question[];
}

// Utility types and functions
export type Player = keyof typeof players;
export const playerIds = Object.keys(players) as Player[];

// Helper functions
export const getPlayer = (playerId: Player): PlayerData => {
  return players[playerId];
};

export const getPlayerQuestions = (playerId: Player): Question[] => {
  return players[playerId]?.questions || [];
};

export const getAllPlayers = (): PlayerData[] => {
  return Object.values(players);
};

export const getPlayerById = (id: string): PlayerData | undefined => {
  return players[id as Player];
};

// Legacy compatibility function (for existing code)
export const getQuestionsByPlayer = (playerId: Player): Question[] => {
  return getPlayerQuestions(playerId);
};

// Flattened questions array (if needed for backward compatibility)
export const questions: Question[] = Object.values(players).flatMap(player => player.questions);

// Validation function
export const validatePlayerData = (playerData: PlayerData): boolean => {
  if (!playerData.id || !playerData.name || !playerData.questions) {
    return false;
  }
  
  // Check if all questions have unique IDs
  const questionIds = playerData.questions.map(q => q.id);
  const uniqueIds = new Set(questionIds);
  if (questionIds.length !== uniqueIds.size) {
    console.warn(`Player ${playerData.name} has duplicate question IDs`);
    return false;
  }
  
  return true;
};

// Function to validate that all players have unique question IDs
export const validateAllPlayers = (): boolean => {
  const allQuestionIds: number[] = [];
  const allPlayers = Object.values(players);
  
  for (const player of allPlayers) {
    for (const question of player.questions) {
      if (allQuestionIds.includes(question.id)) {
        console.error(`Duplicate question ID ${question.id} found across players`);
        return false;
      }
      allQuestionIds.push(question.id);
    }
  }
  
  console.log(`✅ All ${allQuestionIds.length} questions have unique IDs across ${allPlayers.length} players`);
  return true;
};

// Function to get random questions from a player's set
export const getRandomPlayerQuestions = (playerId: Player, count?: number): Question[] => {
  const playerQuestions = getPlayerQuestions(playerId);
  if (!count || count >= playerQuestions.length) {
    return [...playerQuestions].sort(() => Math.random() - 0.5);
  }
  
  const shuffled = [...playerQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to add a new player dynamically (if needed at runtime)
export const addPlayer = (playerData: PlayerData): boolean => {
  if (!validatePlayerData(playerData)) {
    return false;
  }
  
  if (players[playerData.id]) {
    console.warn(`Player with ID ${playerData.id} already exists`);
    return false;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (players as any)[playerData.id] = playerData;
  return true;
};
