import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GameBoard from '../src/app/components/GameBoard'

describe('GameBoard Component', () => {
  const defaultProps = {
    playerPosition: 4,
    chaserPosition: 2,
    totalSteps: 9,
    isGameStarted: true,
    stepLabels: {},
    playerName: 'Test Player'
  }

  describe('Rendering', () => {
    it('should render the game board with correct title', () => {
      render(<GameBoard {...defaultProps} />)
      expect(screen.getByText('The Chase Board')).toBeInTheDocument()
    })

    it('should display player and chaser positions', () => {
      render(<GameBoard {...defaultProps} />)
      expect(screen.getByText('Pos: 4/9')).toBeInTheDocument()
      expect(screen.getByText('Pos: 2/9')).toBeInTheDocument()
    })

    it('should show distance between player and chaser', () => {
      render(<GameBoard {...defaultProps} />)
      expect(screen.getByText('Distance: 2 steps')).toBeInTheDocument()
    })

    it('should display finish line step', () => {
      render(<GameBoard {...defaultProps} />)
      // The finish line should be rendered with the flag emoji
      expect(screen.getByText('🏁')).toBeInTheDocument()
    })
  })

  describe('Game Status Indicators', () => {
    it('should show danger warning when chaser is close', () => {
      render(
        <GameBoard 
          {...defaultProps} 
          playerPosition={3} 
          chaserPosition={2} 
        />
      )
      expect(screen.getByText(/DANGER!/)).toBeInTheDocument()
    })

    it('should show caught message when chaser catches player', () => {
      render(
        <GameBoard 
          {...defaultProps} 
          playerPosition={3} 
          chaserPosition={3} 
        />
      )
      expect(screen.getByText(/CAUGHT!/)).toBeInTheDocument()
    })

    it('should show encouraging message when player is ahead', () => {
      render(
        <GameBoard 
          {...defaultProps} 
          playerPosition={8} 
          chaserPosition={2} 
        />
      )
      expect(screen.getByText("You're doing great!")).toBeInTheDocument()
    })

    it('should show warning when chaser is getting closer', () => {
      render(
        <GameBoard 
          {...defaultProps} 
          playerPosition={5} 
          chaserPosition={3} 
        />
      )
      expect(screen.getByText('Chaser is getting closer...')).toBeInTheDocument()
    })
  })

  describe('Setup Phase', () => {
    const setupProps = {
      ...defaultProps,
      isGameStarted: false,
      playerPosition: -1,
      onPlayerStartPositionChange: vi.fn(),
      onStepLabelChange: vi.fn()
    }

    it('should render text inputs for setup steps', () => {
      render(<GameBoard {...setupProps} />)
      const inputs = screen.getAllByPlaceholderText('Drink number')
      expect(inputs).toHaveLength(3) // Steps 3, 4, 5
    })

    it('should call onStepLabelChange when input is submitted', () => {
      const mockOnStepLabelChange = vi.fn()
      render(
        <GameBoard 
          {...setupProps} 
          onStepLabelChange={mockOnStepLabelChange}
        />
      )
      
      const inputs = screen.getAllByPlaceholderText('Drink number')
      fireEvent.change(inputs[0], { target: { value: 'Beer' } })
      fireEvent.blur(inputs[0]) // This triggers the submit
      
      expect(mockOnStepLabelChange).toHaveBeenCalledWith(5, 'Beer') // First input is step 5 due to reverse order
    })

    it('should convert text inputs to buttons when labels are added', () => {
      const propsWithLabels = {
        ...setupProps,
        stepLabels: { 3: 'Beer', 4: 'Wine', 5: 'Vodka' }
      }
      
      render(<GameBoard {...propsWithLabels} />)
      
      expect(screen.getByText('Beer')).toBeInTheDocument()
      expect(screen.getByText('Wine')).toBeInTheDocument()
      expect(screen.getByText('Vodka')).toBeInTheDocument()
    })

    it('should call onPlayerStartPositionChange when setup button is clicked', () => {
      const mockOnPlayerStartPositionChange = vi.fn()
      const propsWithLabels = {
        ...setupProps,
        stepLabels: { 3: 'Beer', 4: 'Wine', 5: 'Vodka' },
        onPlayerStartPositionChange: mockOnPlayerStartPositionChange
      }
      
      render(<GameBoard {...propsWithLabels} />)
      
      fireEvent.click(screen.getByText('Beer'))
      
      expect(mockOnPlayerStartPositionChange).toHaveBeenCalledWith(3, 'Beer')
    })
  })

  describe('Step Colors During Setup', () => {
    it('should show selected step as light blue during setup', () => {
      const propsWithSelection = {
        ...defaultProps,
        isGameStarted: false,
        playerPosition: 4,
        stepLabels: { 3: 'Beer', 4: 'Wine', 5: 'Vodka' }
      }
      
      render(<GameBoard {...propsWithSelection} />)
      
      // The selected step (4) should have light blue background
      const wineButton = screen.getByText('Wine')
      expect(wineButton.closest('button')).toHaveClass('bg-blue-400')
    })

    it('should show unselected setup steps as dark blue', () => {
      const propsWithSelection = {
        ...defaultProps,
        isGameStarted: false,
        playerPosition: 4,
        stepLabels: { 3: 'Beer', 4: 'Wine', 5: 'Vodka' }
      }
      
      render(<GameBoard {...propsWithSelection} />)
      
      // Unselected steps should have dark blue background
      const beerButton = screen.getByText('Beer')
      const vodkaButton = screen.getByText('Vodka')
      expect(beerButton.closest('button')).toHaveClass('bg-blue-800')
      expect(vodkaButton.closest('button')).toHaveClass('bg-blue-800')
    })
  })

  describe('Game Phase Colors', () => {
    it('should show player position with correct styling during game', () => {
      render(<GameBoard {...defaultProps} />)
      // Player should be represented with the person emoji - check all instances exist
      const playerEmojis = screen.getAllByText('🧑')
      expect(playerEmojis.length).toBeGreaterThan(0)
    })

    it('should show chaser position with correct styling during game', () => {
      render(<GameBoard {...defaultProps} />)
      // Chaser should be represented with the monster emoji - check all instances exist
      const chaserEmojis = screen.getAllByText('👹')
      expect(chaserEmojis.length).toBeGreaterThan(0)
    })

    it('should show collision when player and chaser are on same step', () => {
      render(
        <GameBoard 
          {...defaultProps} 
          playerPosition={3} 
          chaserPosition={3} 
        />
      )
      // Collision should be represented with explosion emoji
      expect(screen.getByText('💥')).toBeInTheDocument()
    })
  })

  describe('Progress Indicators', () => {
    it('should calculate steps to go correctly', () => {
      render(<GameBoard {...defaultProps} />)
      expect(screen.getByText('5 to go!')).toBeInTheDocument() // 9 - 4 = 5
    })

    it('should calculate chaser distance correctly', () => {
      render(<GameBoard {...defaultProps} />)
      expect(screen.getByText('2 behind you..')).toBeInTheDocument() // 4 - 2 = 2
    })
  })
})
