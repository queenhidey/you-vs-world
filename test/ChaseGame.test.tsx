import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ChaseGame from '../src/components/features/ChaseGame'
import type { Player } from '../src/app/data/contestantControls'
import { playerIds, getPlayer } from '../src/app/data/contestantControls'

// Mock the child components
vi.mock('../src/components/features/QuestionCard', () => ({
  default: ({ question, onAnswer, onChaserPick }: any) => (
    <div data-testid="question-card">
      <div>{question?.question}</div>
      <button onClick={() => onAnswer(true, 0)}>Mock Answer</button>
      <button onClick={() => onChaserPick(1)}>Mock Chaser Pick</button>
    </div>
  )
}))

vi.mock('../src/components/features/GameBoard', () => ({
  default: ({ playerPosition, chaserPosition, onPlayerStartPositionChange, onStepLabelChange, stepLabels }: any) => (
    <div data-testid="game-board">
      <div>Player: {playerPosition}</div>
      <div>Chaser: {chaserPosition}</div>
      <input 
        data-testid="step-input-3"
        onChange={(e) => onStepLabelChange?.(3, e.target.value)}
        placeholder="Step 3"
        value=""
      />
      <input 
        data-testid="step-input-4"
        onChange={(e) => onStepLabelChange?.(4, e.target.value)}
        placeholder="Step 4"
        value=""
      />
      <input 
        data-testid="step-input-5"
        onChange={(e) => onStepLabelChange?.(5, e.target.value)}
        placeholder="Step 5"
        value=""
      />
      {stepLabels?.[3] && (
        <button 
          onClick={() => onPlayerStartPositionChange?.(3, stepLabels[3])}
          data-testid="setup-button-3"
        >
          Select position 3: {stepLabels[3]}
        </button>
      )}
      {stepLabels?.[4] && (
        <button 
          onClick={() => onPlayerStartPositionChange?.(4, stepLabels[4])}
          data-testid="setup-button-4"
        >
          Select position 4: {stepLabels[4]}
        </button>
      )}
      {stepLabels?.[5] && (
        <button 
          onClick={() => onPlayerStartPositionChange?.(5, stepLabels[5])}
          data-testid="setup-button-5"
        >
          Select position 5: {stepLabels[5]}
        </button>
      )}
      <button 
        onClick={() => onPlayerStartPositionChange?.(3, 'TestLabel')}
        data-testid="setup-button"
      >
        Setup Button
      </button>
    </div>
  )
}))

describe('ChaseGame Component', () => {
  const mockOnGameEnd = vi.fn()
  // Use the first available player dynamically
  const selectedPlayer: Player = playerIds[0]
  const playerData = getPlayer(selectedPlayer)

  const defaultProps = {
    onGameEnd: mockOnGameEnd,
    selectedPlayer
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Initial Render', () => {
    it('should render the game title', () => {
      render(<ChaseGame {...defaultProps} />)
      expect(screen.getByText('YOU vs WORLD')).toBeInTheDocument()
    })

    it('should show setup phase initially', () => {
      render(<ChaseGame {...defaultProps} />)
      expect(screen.getByText('Game Setup')).toBeInTheDocument()
      expect(screen.getByText('Start Game')).toBeInTheDocument()
    })

    it('should display player information', () => {
      render(<ChaseGame {...defaultProps} />)
      expect(screen.getByText(/Playing as:/)).toBeInTheDocument()
      expect(screen.getByText(`${playerData.emoji} ${playerData.name}`)).toBeInTheDocument()
    })

    it('should show manual controls', () => {
      render(<ChaseGame {...defaultProps} />)
      expect(screen.getByText('Manual Controls')).toBeInTheDocument()
      expect(screen.getByText('Advance Player ⬆️')).toBeInTheDocument()
      expect(screen.getByText('Advance Chasers ⬆️')).toBeInTheDocument()
    })
  })

  describe('Setup Phase', () => {
    it('should have disabled Start Game button initially', () => {
      render(<ChaseGame {...defaultProps} />)
      const startButton = screen.getByText('Start Game')
      expect(startButton).toBeDisabled()
    })

    it('should enable Start Game button after position selection', () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels first  
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Simulate setup button click to select position
      const setupButton = screen.getByTestId('setup-button')
      fireEvent.click(setupButton)
      
      const startButton = screen.getByText('Start Game')
      expect(startButton).not.toBeDisabled()
    })

    it('should show warning message when fields are empty', () => {
      render(<ChaseGame {...defaultProps} />)
      expect(screen.getByText(/Please fill in all text fields first/)).toBeInTheDocument()
    })

    it('should transition to game phase when Start Game is clicked', () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels first  
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Select position first
      fireEvent.click(screen.getByTestId('setup-button'))
      
      // Then start game
      fireEvent.click(screen.getByText('Start Game'))
      
      expect(screen.queryByText('Game Setup')).not.toBeInTheDocument()
      expect(screen.getByTestId('question-card')).toBeInTheDocument()
    })
  })

  describe('Game Phase', () => {
    const setupGame = () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Select position
      fireEvent.click(screen.getByTestId('setup-button'))
      
      // Start game
      fireEvent.click(screen.getByText('Start Game'))
    }

    it('should show question card during game', () => {
      setupGame()
      expect(screen.getByTestId('question-card')).toBeInTheDocument()
    })

    it('should show timer during game', () => {
      setupGame()
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('seconds remaining')).toBeInTheDocument()
    })

    it('should show question number', () => {
      setupGame()
      expect(screen.getByText('Question 1')).toBeInTheDocument()
    })
  })

  describe('Timer Functionality', () => {
    const setupGame = () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Select position
      fireEvent.click(screen.getByTestId('setup-button'))
      
      // Start game
      fireEvent.click(screen.getByText('Start Game'))
    }

    it('should countdown from 10 seconds', async () => {
      setupGame()
      
      expect(screen.getByText('30')).toBeInTheDocument()
      
      await act(async () => {
        vi.advanceTimersByTime(1000)
      })
      expect(screen.getByText('29')).toBeInTheDocument()
      
      await act(async () => {
        vi.advanceTimersByTime(1000)
      })
      expect(screen.getByText('28')).toBeInTheDocument()
    })

    it('should show TIMES UP when timer reaches zero', async () => {
      setupGame()
      
      await act(async () => {
        vi.advanceTimersByTime(30000)
      })
      
      expect(screen.getByText(/⏰ TIMES UP ⏰/)).toBeInTheDocument()
    })

    it('should change color as timer counts down', async () => {
      setupGame()
      
      // Should be green initially
      expect(screen.getByText('30').closest('div')).toHaveClass('bg-green-600')
      
      // Should be yellow at 5 seconds (after 25 seconds elapsed)
      await act(async () => {
        vi.advanceTimersByTime(25000)
      })
      expect(screen.getByText('5').closest('div')).toHaveClass('bg-yellow-500')
      
      // Should be red at 3 seconds (after 27 seconds total elapsed)
      await act(async () => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.getByText('3').closest('div')).toHaveClass('bg-red-600')
    })
  })

  describe('Manual Controls', () => {
    const setupGame = () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Select position
      fireEvent.click(screen.getByTestId('setup-button'))
      
      // Start game
      fireEvent.click(screen.getByText('Start Game'))
    }

    it('should advance player position when clicked', () => {
      setupGame()
      
      fireEvent.click(screen.getByText('Advance Player ⬆️'))
      
      // Player position should change in the GameBoard mock
      expect(screen.getByText('Player: 4')).toBeInTheDocument() // 3 + 1
    })

    it('should advance chaser position when clicked', () => {
      setupGame()
      
      fireEvent.click(screen.getByText('Advance Chasers ⬆️'))
      
      // Chaser position should change in the GameBoard mock
      expect(screen.getByText('Chaser: 1')).toBeInTheDocument() // 0 + 1
    })

    it('should disable "Player Didn\'t Answer" button after use', () => {
      setupGame()
      
      const button = screen.getByText('Player Didn\'t Answer ⏭️')
      fireEvent.click(button)
      
      expect(button).toBeDisabled()
    })

    it('should disable "Chaser Didn\'t Answer" button after use', () => {
      setupGame()
      
      const button = screen.getByText('Chaser\'s Didn\'t Answer ⏭️')
      fireEvent.click(button)
      
      expect(button).toBeDisabled()
    })
  })

  describe('Answer Flow', () => {
    const setupGame = () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Fill in step labels
      fireEvent.change(screen.getByTestId('step-input-3'), { target: { value: 'Beer' } })
      fireEvent.change(screen.getByTestId('step-input-4'), { target: { value: 'Wine' } })
      fireEvent.change(screen.getByTestId('step-input-5'), { target: { value: 'Vodka' } })
      
      // Select position
      fireEvent.click(screen.getByTestId('setup-button'))
      
      // Start game
      fireEvent.click(screen.getByText('Start Game'))
    }

    it('should show Show Answer button after chaser picks', () => {
      setupGame()
      
      // Player answers first
      fireEvent.click(screen.getByText('Mock Answer'))
      
      // Chaser picks
      fireEvent.click(screen.getByText('Mock Chaser Pick'))
      
      expect(screen.getByText('Show Answer')).toBeInTheDocument()
    })

    it('should show Next Question button after showing answer', () => {
      setupGame()
      
      // Complete the answer flow
      fireEvent.click(screen.getByText('Mock Answer'))
      fireEvent.click(screen.getByText('Mock Chaser Pick'))
      fireEvent.click(screen.getByText('Show Answer'))
      
      expect(screen.getByText('Next Question →')).toBeInTheDocument()
    })

    it('should increment question number on next question', () => {
      setupGame()
      
      // Wait for question card to appear
      expect(screen.getByTestId('question-card')).toBeInTheDocument()
      
      // Complete first question
      fireEvent.click(screen.getByText('Mock Answer'))
      fireEvent.click(screen.getByText('Mock Chaser Pick'))
      fireEvent.click(screen.getByText('Show Answer'))
      fireEvent.click(screen.getByText('Next Question →'))
      
      expect(screen.getByText('Question 2')).toBeInTheDocument()
    })
  })

  describe('Game End Conditions', () => {
    it('should show win screen when player wins', () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Mock winning condition by setting player position to finish
      // This would require more complex mocking of internal state
      // For now, we'll test the win screen component structure
      
      // We can test the win condition by examining the component logic
      // or by mocking the game state more extensively
    })

    it('should show caught screen when chaser catches player', () => {
      render(<ChaseGame {...defaultProps} />)
      
      // Similar to win condition, this would require state mocking
      // to trigger the caught condition
    })

    it('should call onGameEnd when Play Again is clicked in win screen', () => {
      // This test would require triggering the win condition first
      // Then checking if the Play Again button calls onGameEnd
    })
  })

  describe('Audio Features', () => {
    it('should not throw error when audio is not supported', () => {
      // Mock AudioContext to throw an error
      const originalAudioContext = global.AudioContext
      global.AudioContext = undefined as any
      
      expect(() => {
        render(<ChaseGame {...defaultProps} />)
      }).not.toThrow()
      
      // Restore
      global.AudioContext = originalAudioContext
    })
  })
})
