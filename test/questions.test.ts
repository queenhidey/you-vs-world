import { describe, it, expect } from 'vitest'
import { 
  type Player, 
  getQuestionsByPlayer, 
  getPlayer, 
  getAllPlayers,
  validateAllPlayers,
  type Question,
  playerIds,
} from '../src/app/data/contestantControls'

describe('Questions Data Module', () => {
  describe('Player types and basic functionality', () => {
    it('should return all available players', () => {
      const allPlayers = getAllPlayers()
      expect(allPlayers).toHaveLength(playerIds.length)
      
      // Verify each player ID exists in the returned players
      playerIds.forEach(playerId => {
        expect(allPlayers.some(player => player.id === playerId)).toBe(true)
      })
    })

    it('should have at least one player defined', () => {
      expect(playerIds.length).toBeGreaterThan(0)
    })
  })

  describe('getPlayer function', () => {
    it('should return player data for each defined player', () => {
      playerIds.forEach(playerId => {
        const player = getPlayer(playerId)
        expect(player).toBeDefined()
        expect(player.id).toBe(playerId)
        expect(player.name).toBeTruthy()
        expect(typeof player.name).toBe('string')
        expect(player.emoji).toBeTruthy()
        expect(typeof player.emoji).toBe('string')
        expect(player.description).toBeTruthy()
        expect(typeof player.description).toBe('string')
        expect(player.questions).toBeInstanceOf(Array)
        expect(player.questions.length).toBeGreaterThan(0)
      })
    })

    it('should return undefined for invalid player', () => {
      const result = getPlayer('invalid' as Player)
      expect(result).toBeUndefined()
    })
  })

  describe('getQuestionsByPlayer function', () => {
    it('should return questions for each defined player', () => {
      playerIds.forEach(playerId => {
        const questions = getQuestionsByPlayer(playerId)
        expect(questions).toBeInstanceOf(Array)
        expect(questions.length).toBeGreaterThan(0)
        
        // Check question structure
        questions.forEach(question => {
          expect(question).toHaveProperty('id')
          expect(question).toHaveProperty('question')
          expect(question).toHaveProperty('options')
          expect(question).toHaveProperty('correctAnswer')
          expect(question.options.length).toBeGreaterThanOrEqual(3) // Allow 3 or 4 options
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
          expect(question.correctAnswer).toBeLessThan(question.options.length)
        })
      })
    })

    it('should return different questions for different players (if multiple players exist)', () => {
      if (playerIds.length > 1) {
        const firstPlayerQuestions = getQuestionsByPlayer(playerIds[0])
        const secondPlayerQuestions = getQuestionsByPlayer(playerIds[1])
        
        expect(firstPlayerQuestions).not.toEqual(secondPlayerQuestions)
      } else {
        // If only one player, this test is not applicable
        expect(true).toBe(true)
      }
    })
  })

  describe('Question validation', () => {
    it('should validate all players without throwing', () => {
      expect(() => validateAllPlayers()).not.toThrow()
    })

    it('should have unique question IDs within each player', () => {
      playerIds.forEach(playerId => {
        const questions = getQuestionsByPlayer(playerId)
        const questionIds = questions.map(q => q.id)
        const uniqueIds = new Set(questionIds)
        expect(questionIds.length).toBe(uniqueIds.size)
      })
    })

    it('should have valid question format for all players', () => {
      const allQuestions: Question[] = []
      
      playerIds.forEach(playerId => {
        const questions = getQuestionsByPlayer(playerId)
        allQuestions.push(...questions)
      })

      allQuestions.forEach(question => {
        expect(typeof question.id).toBe('number')
        expect(typeof question.question).toBe('string')
        expect(question.question.length).toBeGreaterThan(0)
        expect(Array.isArray(question.options)).toBe(true)
        expect(question.options.length).toBeGreaterThanOrEqual(3) // Allow 3 or 4 options
        expect(typeof question.correctAnswer).toBe('number')
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
        expect(question.correctAnswer).toBeLessThan(question.options.length)
        
        // Check all options are non-empty strings
        question.options.forEach(option => {
          expect(typeof option).toBe('string')
          expect(option.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have unique question IDs across all players', () => {
      const allQuestionIds: number[] = []
      
      playerIds.forEach(playerId => {
        const questions = getQuestionsByPlayer(playerId)
        questions.forEach(question => {
          expect(allQuestionIds).not.toContain(question.id)
          allQuestionIds.push(question.id)
        })
      })
      
      const uniqueIds = new Set(allQuestionIds)
      expect(allQuestionIds.length).toBe(uniqueIds.size)
    })
  })
})
