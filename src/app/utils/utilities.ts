// Game Logic Utilities

export const calculateDistance = (playerPos: number, chaserPos: number): number => {
  return playerPos - chaserPos
}

export const determineGameResult = (playerPos: number, chaserPos: number, totalSteps: number): 'playing' | 'won' | 'caught' => {
  if (playerPos >= totalSteps) {
    return 'won'
  } else if (chaserPos >= playerPos) {
    return 'caught'
  }
  return 'playing'
}

export const canStartGame = (stepLabels: { [key: number]: string }, hasSelectedStartPosition: boolean): boolean => {
  const hasAllLabels = stepLabels[3] && stepLabels[3].trim().length > 0 &&
                      stepLabels[4] && stepLabels[4].trim().length > 0 &&
                      stepLabels[5] && stepLabels[5].trim().length > 0

  return Boolean(hasAllLabels) && hasSelectedStartPosition
}

export const getSetupStepColor = (stepIndex: number, playerPosition: number, isGameStarted: boolean): string => {
  const isSetupStep = !isGameStarted && [3, 4, 5].includes(stepIndex)
  
  if (!isSetupStep) return 'bg-blue-800' // Default
  
  if (playerPosition === stepIndex) {
    return 'bg-blue-400' // Selected
  }
  return 'bg-blue-800' // Unselected setup step
}

export const isGameReady = (
  stepLabels: { [key: number]: string },
  hasSelectedStartPosition: boolean
): boolean => {
  return canStartGame(stepLabels, hasSelectedStartPosition)
}
