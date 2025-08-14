import { describe, it, expect } from 'vitest'
import { 
  calculateDistance, 
  determineGameResult, 
  canStartGame, 
  getSetupStepColor 
} from '../src/app/utils/utilities'

describe('Game Logic Utilities', () => {
  describe('Position Calculations', () => {
    it('should calculate distance between player and chaser correctly', () => {
      expect(calculateDistance(5, 3)).toBe(2)
      expect(calculateDistance(3, 5)).toBe(-2)
      expect(calculateDistance(4, 4)).toBe(0)
    })

    it('should determine if chaser caught player', () => {
      const isCaught = (playerPos: number, chaserPos: number) => {
        return chaserPos >= playerPos && playerPos > 0
      }
      
      expect(isCaught(3, 3)).toBe(true)
      expect(isCaught(3, 4)).toBe(true)
      expect(isCaught(4, 3)).toBe(false)
      expect(isCaught(0, 1)).toBe(false) // Player at start shouldn't be caught
    })

    it('should determine if player won', () => {
      const hasWon = (playerPos: number, totalSteps: number) => {
        return playerPos >= totalSteps
      }
      
      expect(hasWon(9, 9)).toBe(true)
      expect(hasWon(10, 9)).toBe(true)
      expect(hasWon(8, 9)).toBe(false)
    })

    it('should calculate steps remaining', () => {
      const stepsRemaining = (playerPos: number, totalSteps: number) => {
        return Math.max(0, totalSteps - playerPos)
      }
      
      expect(stepsRemaining(4, 9)).toBe(5)
      expect(stepsRemaining(9, 9)).toBe(0)
      expect(stepsRemaining(10, 9)).toBe(0)
    })
  })

  describe('Timer Utilities', () => {
    it('should format time correctly', () => {
      const formatTime = (seconds: number) => {
        if (seconds <= 0) return '⏰ TIMES UP ⏰'
        return seconds.toString()
      }
      
      expect(formatTime(10)).toBe('10')
      expect(formatTime(5)).toBe('5')
      expect(formatTime(0)).toBe('⏰ TIMES UP ⏰')
      expect(formatTime(-1)).toBe('⏰ TIMES UP ⏰')
    })

    it('should determine timer color based on remaining time', () => {
      const getTimerColor = (timeLeft: number) => {
        if (timeLeft <= 3) return 'bg-red-600'
        if (timeLeft <= 5) return 'bg-yellow-500'
        return 'bg-green-600'
      }
      
      expect(getTimerColor(10)).toBe('bg-green-600')
      expect(getTimerColor(6)).toBe('bg-green-600')
      expect(getTimerColor(5)).toBe('bg-yellow-500')
      expect(getTimerColor(4)).toBe('bg-yellow-500')
      expect(getTimerColor(3)).toBe('bg-red-600')
      expect(getTimerColor(1)).toBe('bg-red-600')
    })
  })

  describe('Question Selection Logic', () => {
    const mockQuestions = [
      { id: 1, question: 'Q1', options: ['A', 'B', 'C'], correctAnswer: 0 },
      { id: 2, question: 'Q2', options: ['A', 'B', 'C'], correctAnswer: 1 },
      { id: 3, question: 'Q3', options: ['A', 'B', 'C'], correctAnswer: 2 },
      { id: 4, question: 'Q4', options: ['A', 'B', 'C'], correctAnswer: 0 },
      { id: 5, question: 'Q5', options: ['A', 'B', 'C'], correctAnswer: 1 }
    ]

    it('should select random unused question', () => {
      const usedIds = new Set([1, 3])
      
      const getRandomUnusedQuestion = (questions: any[], usedIds: Set<number>) => {
        const available = questions.filter(q => !usedIds.has(q.id))
        if (available.length === 0) return null
        return available[Math.floor(Math.random() * available.length)]
      }
      
      const selected = getRandomUnusedQuestion(mockQuestions, usedIds)
      expect(selected).toBeTruthy()
      expect([2, 4, 5]).toContain(selected?.id)
    })

    it('should reset when all questions used', () => {
      const usedIds = new Set([1, 2, 3, 4, 5])
      
      const getRandomUnusedQuestion = (questions: any[], usedIds: Set<number>) => {
        const available = questions.filter(q => !usedIds.has(q.id))
        if (available.length === 0) {
          // Reset scenario - return any question
          return questions[Math.floor(Math.random() * questions.length)]
        }
        return available[Math.floor(Math.random() * available.length)]
      }
      
      const selected = getRandomUnusedQuestion(mockQuestions, usedIds)
      expect(selected).toBeTruthy()
      expect(mockQuestions.map(q => q.id)).toContain(selected?.id)
    })

    it('should validate question structure', () => {
      const isValidQuestion = (question: any) => {
        return question &&
               typeof question.id === 'number' &&
               typeof question.question === 'string' &&
               Array.isArray(question.options) &&
               question.options.length === 3 &&
               typeof question.correctAnswer === 'number' &&
               question.correctAnswer >= 0 &&
               question.correctAnswer < question.options.length
      }
      
      const validQuestion = mockQuestions[0]
      expect(isValidQuestion(validQuestion)).toBe(true)
      
      const invalidQuestion = { id: 'wrong', question: 123, options: ['A'], correctAnswer: 5 }
      expect(isValidQuestion(invalidQuestion)).toBe(false)
    })
  })

  describe('Game State Validation', () => {
    it('should validate setup completion', () => {
      const isSetupComplete = (stepLabels: Record<number, string>, hasSelectedPosition: boolean) => {
        const requiredSteps = [3, 4, 5]
        const allLabelsProvided = requiredSteps.every(step => stepLabels[step] && stepLabels[step].trim().length > 0)
        return allLabelsProvided && hasSelectedPosition
      }
      
      expect(isSetupComplete({ 3: 'Beer', 4: 'Wine', 5: 'Vodka' }, true)).toBe(true)
      expect(isSetupComplete({ 3: 'Beer', 4: 'Wine' }, true)).toBe(false)
      expect(isSetupComplete({ 3: 'Beer', 4: 'Wine', 5: 'Vodka' }, false)).toBe(false)
      expect(isSetupComplete({ 3: '', 4: 'Wine', 5: 'Vodka' }, true)).toBe(false)
    })

    it('should validate answer selection states', () => {
      const canShowAnswer = (playerAnswered: boolean, chaserPicked: boolean) => {
        return playerAnswered && chaserPicked
      }
      
      const canProceedToNext = (showingAnswer: boolean, playerAnswered: boolean, chaserPicked: boolean) => {
        return showingAnswer && playerAnswered && chaserPicked
      }
      
      expect(canShowAnswer(true, true)).toBe(true)
      expect(canShowAnswer(true, false)).toBe(false)
      expect(canShowAnswer(false, true)).toBe(false)
      
      expect(canProceedToNext(true, true, true)).toBe(true)
      expect(canProceedToNext(false, true, true)).toBe(false)
    })
  })

  describe('Button State Logic', () => {
    it('should determine button disabled states correctly', () => {
      const isPlayerDidntAnswerDisabled = (playerAnswer: number | null) => {
        return playerAnswer !== null
      }
      
      const isChaserDidntAnswerDisabled = (chaserHasPicked: boolean) => {
        return chaserHasPicked
      }
      
      expect(isPlayerDidntAnswerDisabled(null)).toBe(false)
      expect(isPlayerDidntAnswerDisabled(0)).toBe(true)
      expect(isPlayerDidntAnswerDisabled(-1)).toBe(true)
      
      expect(isChaserDidntAnswerDisabled(false)).toBe(false)
      expect(isChaserDidntAnswerDisabled(true)).toBe(true)
    })

    it('should determine start game button state', () => {
      expect(canStartGame({ 3: 'A', 4: 'B', 5: 'C' }, true)).toBe(true)
      expect(canStartGame({ 3: 'A', 4: 'B', 5: 'C' }, false)).toBe(false)
      expect(canStartGame({ 3: 'A', 4: 'B' }, true)).toBe(false)
      expect(canStartGame({ 3: '', 4: 'B', 5: 'C' }, true)).toBe(false)
    })
  })

  describe('Step Appearance Logic', () => {
    it('should determine correct step colors for setup phase', () => {
      // During setup
      expect(getSetupStepColor(3, 4, false)).toBe('bg-blue-800') // Unselected setup step
      expect(getSetupStepColor(4, 4, false)).toBe('bg-blue-400') // Selected setup step
      expect(getSetupStepColor(5, 4, false)).toBe('bg-blue-800') // Unselected setup step
      expect(getSetupStepColor(6, 4, false)).toBe('bg-blue-800') // Non-setup step
      
      // During game
      expect(getSetupStepColor(4, 4, true)).toBe('bg-blue-800') // Game phase uses different logic
    })

    it('should determine step visibility states', () => {
      const getStepDisplayMode = (stepIndex: number, isGameStarted: boolean, hasLabel: boolean) => {
        const isSetupStep = !isGameStarted && [3, 4, 5].includes(stepIndex)
        
        if (!isSetupStep) return 'normal'
        if (!hasLabel) return 'input'
        return 'button'
      }
      
      expect(getStepDisplayMode(3, false, false)).toBe('input')
      expect(getStepDisplayMode(3, false, true)).toBe('button')
      expect(getStepDisplayMode(3, true, true)).toBe('normal')
      expect(getStepDisplayMode(6, false, false)).toBe('normal')
    })
  })
})
