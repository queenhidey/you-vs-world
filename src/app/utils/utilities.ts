/**
 * Game Logic Utilities
 * 
 * Pure functions for game logic calculations and validations.
 * These utilities help determine game state and validate game conditions.
 */

/**
 * Calculates the distance between player and chaser positions
 * @param playerPos - Current player position on the board
 * @param chaserPos - Current chaser position on the board
 * @returns Distance between positions (positive = player ahead, negative = chaser ahead)
 */
export const calculateDistance = (playerPos: number, chaserPos: number): number => {
  return playerPos - chaserPos;
};

/**
 * Determines the current game result based on positions
 * @param playerPos - Current player position
 * @param chaserPos - Current chaser position  
 * @param totalSteps - Total steps needed to win
 * @returns Game status: 'playing', 'won', or 'caught'
 */
export const determineGameResult = (
  playerPos: number, 
  chaserPos: number, 
  totalSteps: number
): 'playing' | 'won' | 'caught' => {
  // Player reaches the end - they win
  if (playerPos >= totalSteps) {
    return 'won';
  } 
  // Chaser catches up to or passes player - player loses
  else if (chaserPos >= playerPos) {
    return 'caught';
  }
  // Game continues
  return 'playing';
};

/**
 * Validates whether the game can be started
 * Checks that all required setup steps are completed
 * @param stepLabels - Labels for game board positions
 * @param hasSelectedStartPosition - Whether player selected starting position
 * @returns True if game can start, false otherwise
 */
export const canStartGame = (
  stepLabels: { [key: number]: string }, 
  hasSelectedStartPosition: boolean
): boolean => {
  // Check that all three setup positions (3, 4, 5) have non-empty labels
  const hasAllLabels = stepLabels[3] && stepLabels[3].trim().length > 0 &&
                      stepLabels[4] && stepLabels[4].trim().length > 0 &&
                      stepLabels[5] && stepLabels[5].trim().length > 0;

  return Boolean(hasAllLabels) && hasSelectedStartPosition;
};

/**
 * Determines the color class for board steps during setup phase
 * @param stepIndex - The step position being evaluated
 * @param playerPosition - Current player position
 * @param isGameStarted - Whether the game has started
 * @returns CSS class string for step styling
 */
export const getSetupStepColor = (
  stepIndex: number, 
  playerPosition: number, 
  isGameStarted: boolean
): string => {
  // Only apply special coloring during setup for positions 3, 4, 5
  const isSetupStep = !isGameStarted && [3, 4, 5].includes(stepIndex);
  
  if (!isSetupStep) return 'bg-blue-800'; // Default step color
  
  // Highlight selected position during setup
  if (playerPosition === stepIndex) {
    return 'bg-blue-400'; // Selected step color
  }
  return 'bg-blue-800'; // Unselected setup step color
};

/**
 * Alias for canStartGame - checks if all game prerequisites are met
 * @param stepLabels - Labels for game board positions
 * @param hasSelectedStartPosition - Whether player selected starting position
 * @returns True if game is ready to start
 */
export const isGameReady = (
  stepLabels: { [key: number]: string },
  hasSelectedStartPosition: boolean
): boolean => {
  return canStartGame(stepLabels, hasSelectedStartPosition);
};
