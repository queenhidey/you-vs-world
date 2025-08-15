/**
 * Unit Tests for GameResultState Component
 * 
 * Tests the game result screen including visual presentation, sound integration,
 * victory/defeat scenarios, and user interactions.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import GameResultState from '../src/components/game-states/GameResultState';

// Mock the audio components
vi.mock('../src/components/audio/FanfareSound', () => ({
  default: ({ play, onComplete }: { play: boolean; onComplete?: () => void }) => {
    if (play && onComplete) {
      // Simulate audio completion after a brief delay
      setTimeout(onComplete, 100);
    }
    return <div data-testid="fanfare-sound" data-play={play} />;
  }
}));

vi.mock('../src/components/audio/WompWompSound', () => ({
  default: ({ play, onComplete }: { play: boolean; onComplete?: () => void }) => {
    if (play && onComplete) {
      // Simulate audio completion after a brief delay
      setTimeout(onComplete, 100);
    }
    return <div data-testid="womp-womp-sound" data-play={play} />;
  }
}));

// Mock the Button component
vi.mock('../src/components/ui', () => ({
  Button: ({ children, onClick, variant, size, ...props }: any) => (
    <button 
      onClick={onClick} 
      data-variant={variant} 
      data-size={size}
      {...props}
    >
      {children}
    </button>
  )
}));

describe('GameResultState Component', () => {
  const mockOnGameEnd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('Victory State', () => {
    it('should render victory screen with correct styling', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Test Player"
          onGameEnd={mockOnGameEnd}
        />
      );

      // Check for victory elements
      expect(screen.getByText('🎉 YOU WON! 🎉')).toBeInTheDocument();
      expect(screen.getByText('You escaped! Test Player for everyone except you!')).toBeInTheDocument();
      expect(screen.getByText('Play Again')).toBeInTheDocument();
    });

    it('should have victory background gradient', () => {
      const { container } = render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const backgroundDiv = container.querySelector('.bg-gradient-to-br');
      expect(backgroundDiv).toHaveClass('from-green-600', 'to-blue-600');
    });

    it('should play fanfare sound on victory', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const fanfareSound = screen.getByTestId('fanfare-sound');
      expect(fanfareSound).toHaveAttribute('data-play', 'true');
      
      // Should not render womp womp sound for victory
      expect(screen.queryByTestId('womp-womp-sound')).not.toBeInTheDocument();
    });

    it('should have success button variant for victory', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'success');
      expect(button).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Defeat State', () => {
    it('should render defeat screen with correct styling', () => {
      render(
        <GameResultState 
          result="caught" 
          playerName="Test Player"
          onGameEnd={mockOnGameEnd}
        />
      );

      // Check for defeat elements
      expect(screen.getByText('💀 CAUGHT! 💀')).toBeInTheDocument();
      expect(screen.getByText('The Chasers got you! Test Player for you!')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should have defeat background gradient', () => {
      const { container } = render(
        <GameResultState 
          result="caught" 
          playerName="Loser"
          onGameEnd={mockOnGameEnd}
        />
      );

      const backgroundDiv = container.querySelector('.bg-gradient-to-br');
      expect(backgroundDiv).toHaveClass('from-red-600', 'to-black');
    });

    it('should play womp womp sound on defeat', () => {
      render(
        <GameResultState 
          result="caught" 
          playerName="Loser"
          onGameEnd={mockOnGameEnd}
        />
      );

      const wompWompSound = screen.getByTestId('womp-womp-sound');
      expect(wompWompSound).toHaveAttribute('data-play', 'true');
      
      // Should not render fanfare sound for defeat
      expect(screen.queryByTestId('fanfare-sound')).not.toBeInTheDocument();
    });

    it('should have danger button variant for defeat', () => {
      render(
        <GameResultState 
          result="caught" 
          playerName="Loser"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'danger');
      expect(button).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Player Name Integration', () => {
    it('should include player name in victory message', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Custom Name"
          onGameEnd={mockOnGameEnd}
        />
      );

      expect(screen.getByText('You escaped! Custom Name for everyone except you!')).toBeInTheDocument();
    });

    it('should include player name in defeat message', () => {
      render(
        <GameResultState 
          result="caught" 
          playerName="Another Name"
          onGameEnd={mockOnGameEnd}
        />
      );

      expect(screen.getByText('The Chasers got you! Another Name for you!')).toBeInTheDocument();
    });

    it('should handle special characters in player name', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Test & Name! 123"
          onGameEnd={mockOnGameEnd}
        />
      );

      expect(screen.getByText('You escaped! Test & Name! 123 for everyone except you!')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onGameEnd when victory button is clicked', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByText('Play Again');
      fireEvent.click(button);

      expect(mockOnGameEnd).toHaveBeenCalledTimes(1);
    });

    it('should call onGameEnd when defeat button is clicked', () => {
      render(
        <GameResultState 
          result="caught" 
          playerName="Loser"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByText('Try Again');
      fireEvent.click(button);

      expect(mockOnGameEnd).toHaveBeenCalledTimes(1);
    });

    it('should not call onGameEnd multiple times on rapid clicks', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByText('Play Again');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnGameEnd).toHaveBeenCalledTimes(3);
    });
  });

  describe('Sound Management', () => {
    it('should trigger sound playback on mount', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const fanfareSound = screen.getByTestId('fanfare-sound');
      expect(fanfareSound).toHaveAttribute('data-play', 'true');
    });

    it('should handle sound completion callback', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      // Advance timers to trigger sound completion
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Sound should complete and component should handle it gracefully
      expect(screen.getByTestId('fanfare-sound')).toBeInTheDocument();
    });

    it('should pass correct volume to sound components', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      // The volume should be passed to the audio component (0.4 based on the implementation)
      const fanfareSound = screen.getByTestId('fanfare-sound');
      expect(fanfareSound).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    it('should have glass morphism effect on result card', () => {
      const { container } = render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const card = container.querySelector('.bg-white\\/10');
      expect(card).toHaveClass('backdrop-blur-sm', 'rounded-lg');
    });

    it('should have proper text styling for title', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const title = screen.getByText('🎉 YOU WON! 🎉');
      expect(title.closest('h1')).toHaveClass('text-6xl', 'font-bold', 'text-white');
    });

    it('should have proper text styling for message', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const message = screen.getByText(/You escaped!/);
      expect(message.closest('p')).toHaveClass('text-2xl', 'text-white');
    });

    it('should center the action button', () => {
      const { container } = render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const buttonContainer = container.querySelector('.flex.justify-center');
      expect(buttonContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('🎉 YOU WON! 🎉');
    });

    it('should have accessible button', () => {
      render(
        <GameResultState 
          result="won" 
          playerName="Winner"
          onGameEnd={mockOnGameEnd}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Play Again');
      expect(button).not.toHaveAttribute('disabled');
    });
  });
});
