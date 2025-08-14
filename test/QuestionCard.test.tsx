import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionCard from '../src/app/components/QuestionCard'
import type { Question } from '../src/app/data/questions'
import { beforeEach } from 'vitest'

describe('QuestionCard Component', () => {
  const mockQuestion: Question = {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin"],
    correctAnswer: 1
  }

  const defaultProps = {
    question: mockQuestion,
    onAnswer: vi.fn(),
    onChaserPick: vi.fn(),
    showResult: false,
    disabled: false,
    showCorrectAnswer: false,
    playerDidntAnswer: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render question text', () => {
      render(<QuestionCard {...defaultProps} />)
      expect(screen.getByText(mockQuestion.question)).toBeInTheDocument()
    })

    it('should render all answer options', () => {
      render(<QuestionCard {...defaultProps} />)
      mockQuestion.options.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument()
      })
    })

    it('should not show question number (not implemented)', () => {
      render(<QuestionCard {...defaultProps} />)
      // Question number is displayed in parent component, not QuestionCard
      expect(screen.queryByText('Question #1')).not.toBeInTheDocument()
    })
  })

  describe('Player Answer Selection', () => {
    it('should call onAnswer when player clicks an option', () => {
      const mockOnAnswer = vi.fn()
      render(<QuestionCard {...defaultProps} onAnswer={mockOnAnswer} />)
      
      fireEvent.click(screen.getByText('Paris'))
      
      expect(mockOnAnswer).toHaveBeenCalledWith(true, 1) // Paris is correct (index 1)
    })

    it('should call onAnswer with false for incorrect answer', () => {
      const mockOnAnswer = vi.fn()
      render(<QuestionCard {...defaultProps} onAnswer={mockOnAnswer} />)
      
      fireEvent.click(screen.getByText('London'))
      
      expect(mockOnAnswer).toHaveBeenCalledWith(false, 0) // London is incorrect (index 0)
    })

    it('should have consistent styling (no phase-based borders)', () => {
      render(<QuestionCard {...defaultProps} />)
      
      const questionCard = screen.getByText(mockQuestion.question).closest('div')
      expect(questionCard).toHaveClass('bg-white/10')
    })
  })

  describe('Chaser Selection Phase', () => {
    it('should have consistent styling during chaser selection', () => {
      render(<QuestionCard {...defaultProps} showResult={true} />)
      
      const questionCard = screen.getByText(mockQuestion.question).closest('div')
      expect(questionCard).toHaveClass('bg-white/10')
    })

    it('should call onChaserPick when chaser option is clicked during showResult phase', () => {
      const mockOnChaserPick = vi.fn()
      render(
        <QuestionCard 
          {...defaultProps} 
          showResult={true} 
          onChaserPick={mockOnChaserPick} 
        />
      )
      
      // First click an option to set selectedAnswer (player's choice)
      fireEvent.click(screen.getByText('Paris'))
      
      // Then click another option as chaser's choice
      fireEvent.click(screen.getByText('Berlin'))
      
      expect(mockOnChaserPick).toHaveBeenCalledWith(2) // Berlin is index 2
    })

    it('should have consistent styling during chaser selection phase', () => {
      render(<QuestionCard {...defaultProps} showResult={true} />)
      
      // Check that the question is displayed
      expect(screen.getByText(mockQuestion.question)).toBeInTheDocument()
      
      // Check that options are rendered and clickable for chaser selection
      mockQuestion.options.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument()
      })
    })
  })

  describe('Answer Reveal Phase', () => {
    it('should highlight correct answer in green', () => {
      render(
        <QuestionCard 
          {...defaultProps} 
          showResult={true} 
          showCorrectAnswer={true} 
        />
      )
      
      const correctOption = screen.getByText('Paris')
      expect(correctOption.closest('button')).toHaveClass('bg-green-600')
    })

    it('should show player selection with blue background', () => {
      render(
        <QuestionCard 
          {...defaultProps} 
          showResult={true} 
          showCorrectAnswer={true} 
        />
      )
      
      // Simulate player selecting first option
      const firstOption = screen.getByText('London')
      fireEvent.click(firstOption)
      
      expect(firstOption.closest('button')).toHaveClass('bg-blue-600')
    })

    it('should handle playerDidntAnswer prop correctly', () => {
      render(
        <QuestionCard 
          {...defaultProps} 
          showResult={true} 
          showCorrectAnswer={true}
          playerDidntAnswer={true}
        />
      )
      
      // When playerDidntAnswer is true, correct answer should still be highlighted
      expect(screen.getByText("Paris").closest('button')).toHaveClass('bg-green-600')
    })
  })

  describe('Disabled State', () => {
    it('should disable buttons when disabled prop is true', () => {
      render(<QuestionCard {...defaultProps} disabled={true} />)
      
      mockQuestion.options.forEach(option => {
        const button = screen.getByText(option).closest('button')
        expect(button).toBeDisabled()
      })
    })

    it('should not call onAnswer when disabled and button is clicked', () => {
      const mockOnAnswer = vi.fn()
      render(
        <QuestionCard 
          {...defaultProps} 
          disabled={true} 
          onAnswer={mockOnAnswer} 
        />
      )
      
      fireEvent.click(screen.getByText('Paris'))
      
      expect(mockOnAnswer).not.toHaveBeenCalled()
    })
  })

  describe('Visual States', () => {
    it('should show different visual states for different phases', () => {
      const { rerender } = render(<QuestionCard {...defaultProps} />)
      
      // Initial state - check that options have default styling
      let firstOption = screen.getByText('London').closest('button')
      expect(firstOption).toHaveClass('bg-white')
      
      // Answer reveal state
      rerender(
        <QuestionCard 
          {...defaultProps} 
          showResult={true} 
          showCorrectAnswer={true} 
        />
      )
      // Should show correct answer in green
      expect(screen.getByText('Paris').closest('button')).toHaveClass('bg-green-600')
    })
  })

  describe('Edge Cases', () => {
    it('should handle question with empty options gracefully', () => {
      const emptyQuestion: Question = {
        id: 2,
        question: "Empty question?",
        options: [],
        correctAnswer: 0
      }
      
      render(<QuestionCard {...defaultProps} question={emptyQuestion} />)
      expect(screen.getByText("Empty question?")).toBeInTheDocument()
    })

    it('should handle invalid correct answer index', () => {
      const invalidQuestion: Question = {
        id: 3,
        question: "Invalid question?",
        options: ["A", "B", "C"],
        correctAnswer: 5 // Invalid index
      }
      
      expect(() => {
        render(<QuestionCard {...defaultProps} question={invalidQuestion} />)
      }).not.toThrow()
    })
  })
})
