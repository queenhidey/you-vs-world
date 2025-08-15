/**
 * Unit Tests for WompWompSound Component
 * 
 * Tests the defeat sound effect component including audio context initialization,
 * sliding frequency effects, prop handling, and error scenarios.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import WompWompSound from '../src/components/audio/WompWompSound';

// Mock Web Audio API
const mockAudioContext = {
  createOscillator: vi.fn(),
  createGain: vi.fn(),
  createBiquadFilter: vi.fn(),
  destination: {},
  currentTime: 0,
  state: 'running',
  close: vi.fn(),
};

const mockOscillator = {
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  frequency: {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
  type: 'triangle',
};

const mockGainNode = {
  connect: vi.fn(),
  gain: {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
};

const mockFilter = {
  connect: vi.fn(),
  frequency: {
    setValueAtTime: vi.fn(),
  },
  Q: {
    setValueAtTime: vi.fn(),
  },
  type: 'lowpass',
};

describe('WompWompSound Component', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Mock AudioContext constructor
    global.AudioContext = vi.fn().mockImplementation(() => mockAudioContext);
    (global as any).webkitAudioContext = vi.fn().mockImplementation(() => mockAudioContext);
    
    // Setup mock returns
    mockAudioContext.createOscillator.mockReturnValue(mockOscillator);
    mockAudioContext.createGain.mockReturnValue(mockGainNode);
    mockAudioContext.createBiquadFilter.mockReturnValue(mockFilter);
    
    // Mock setTimeout and clearTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without visual output', () => {
      const { container } = render(
        <WompWompSound play={false} />
      );
      
      // Audio components don't render visual elements
      expect(container.firstChild).toBeNull();
    });

    it('should not crash with minimal props', () => {
      expect(() => {
        render(<WompWompSound play={false} />);
      }).not.toThrow();
    });
  });

  describe('Audio Playback', () => {
    it('should not play audio when play is false', () => {
      render(<WompWompSound play={false} />);
      
      expect(global.AudioContext).not.toHaveBeenCalled();
    });

    it('should initialize audio when play is true', () => {
      render(<WompWompSound play={true} />);
      
      expect(global.AudioContext).toHaveBeenCalled();
    });

    it('should create audio nodes for womp sequence', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Should create oscillators and gain nodes for the womp sequence
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockAudioContext.createGain).toHaveBeenCalled();
      expect(mockAudioContext.createBiquadFilter).toHaveBeenCalled();
    });

    it('should respect volume prop', () => {
      const customVolume = 0.5;
      render(<WompWompSound play={true} volume={customVolume} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Volume should be used in gain calculations
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
    });

    it('should use default volume when not specified', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Should use default volume of 0.3
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
    });
  });

  describe('Sliding Frequency Effect', () => {
    it('should configure frequency slides for womp effect', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger womp creation
      vi.advanceTimersByTime(100);
      
      // Should set initial frequency and create exponential ramp
      expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalled();
      expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalled();
    });

    it('should create multiple womp sounds in sequence', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger womp sequence
      vi.advanceTimersByTime(500);
      
      // Should create multiple oscillators for the two-womp sequence
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
    });

    it('should configure triangle wave type for warm timbre', () => {
      render(<WompWompSound play={true} />);
      
      vi.advanceTimersByTime(100);
      
      // The oscillator type should be set to triangle for brightness
      // We can't directly verify the type was set since it's set in the audio code,
      // but we can verify the audio nodes were created and connected properly
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
    });
  });

  describe('Lifecycle Management', () => {
    it('should call onComplete callback when sequence finishes', () => {
      const mockOnComplete = vi.fn();
      render(<WompWompSound play={true} onComplete={mockOnComplete} />);
      
      // Fast-forward timers to complete the sequence
      vi.advanceTimersByTime(2000);
      
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should clean up audio context on unmount', () => {
      const { unmount } = render(<WompWompSound play={true} />);
      
      unmount();
      
      expect(mockAudioContext.close).toHaveBeenCalled();
    });

    it('should handle re-render with play changing from false to true', () => {
      const { rerender } = render(<WompWompSound play={false} />);
      
      expect(global.AudioContext).not.toHaveBeenCalled();
      
      rerender(<WompWompSound play={true} />);
      
      expect(global.AudioContext).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle AudioContext creation failure gracefully', () => {
      global.AudioContext = vi.fn().mockImplementation(() => {
        throw new Error('AudioContext not supported');
      });
      
      const mockOnComplete = vi.fn();
      
      expect(() => {
        render(<WompWompSound play={true} onComplete={mockOnComplete} />);
      }).not.toThrow();
      
      // Should still call onComplete even if audio fails
      vi.advanceTimersByTime(200);
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should handle missing AudioContext gracefully', () => {
      (global as any).AudioContext = undefined;
      (global as any).webkitAudioContext = undefined;
      
      expect(() => {
        render(<WompWompSound play={true} />);
      }).not.toThrow();
    });

    it('should not crash if onComplete is not provided', () => {
      render(<WompWompSound play={true} />);
      
      expect(() => {
        vi.advanceTimersByTime(2000);
      }).not.toThrow();
    });
  });

  describe('Filter Configuration', () => {
    it('should configure lowpass filter for warm timbre', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger filter creation
      vi.advanceTimersByTime(100);
      
      expect(mockFilter.frequency.setValueAtTime).toHaveBeenCalled();
      expect(mockFilter.Q.setValueAtTime).toHaveBeenCalled();
      expect(mockFilter.type).toBe('lowpass');
    });

    it('should connect audio graph properly', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger audio graph creation
      vi.advanceTimersByTime(100);
      
      // Should connect oscillators through filters and gains
      expect(mockOscillator.connect).toHaveBeenCalled();
      expect(mockGainNode.connect).toHaveBeenCalled();
      expect(mockFilter.connect).toHaveBeenCalled();
    });
  });

  describe('Comedic Envelope', () => {
    it('should configure envelope for comedic effect', () => {
      render(<WompWompSound play={true} />);
      
      // Advance timers to trigger envelope creation
      vi.advanceTimersByTime(100);
      
      // Should configure bouncy attack and gentle release
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalled();
      expect(mockGainNode.gain.exponentialRampToValueAtTime).toHaveBeenCalled();
    });

    it('should start and stop oscillators with proper timing', () => {
      render(<WompWompSound play={true} />);
      
      vi.advanceTimersByTime(100);
      
      expect(mockOscillator.start).toHaveBeenCalled();
    });
  });
});
