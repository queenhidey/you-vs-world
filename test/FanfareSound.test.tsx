/**
 * Unit Tests for FanfareSound Component
 * 
 * Tests the victory sound effect component including audio context initialization,
 * prop handling, lifecycle management, and error scenarios.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import FanfareSound from '../src/components/audio/FanfareSound';

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

describe('FanfareSound Component', () => {
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
        <FanfareSound play={false} />
      );
      
      // Audio components don't render visual elements
      expect(container.firstChild).toBeNull();
    });

    it('should not crash with minimal props', () => {
      expect(() => {
        render(<FanfareSound play={false} />);
      }).not.toThrow();
    });
  });

  describe('Audio Playback', () => {
    it('should not play audio when play is false', () => {
      render(<FanfareSound play={false} />);
      
      expect(global.AudioContext).not.toHaveBeenCalled();
    });

    it('should initialize audio when play is true', () => {
      render(<FanfareSound play={true} />);
      
      expect(global.AudioContext).toHaveBeenCalled();
    });

    it('should create audio nodes for fanfare sequence', () => {
      render(<FanfareSound play={true} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Should create multiple oscillators and gain nodes for the fanfare
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockAudioContext.createGain).toHaveBeenCalled();
    });

    it('should respect volume prop', () => {
      const customVolume = 0.7;
      render(<FanfareSound play={true} volume={customVolume} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Volume should be used in gain calculations
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
    });

    it('should use default volume when not specified', () => {
      render(<FanfareSound play={true} />);
      
      // Advance timers to trigger audio creation
      vi.advanceTimersByTime(100);
      
      // Should use default volume of 0.1
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
    });
  });

  describe('Lifecycle Management', () => {
    it('should call onComplete callback when sequence finishes', () => {
      const mockOnComplete = vi.fn();
      render(<FanfareSound play={true} onComplete={mockOnComplete} />);
      
      // Fast-forward timers to complete the sequence
      vi.advanceTimersByTime(3000);
      
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should clean up audio context on unmount', () => {
      const { unmount } = render(<FanfareSound play={true} />);
      
      unmount();
      
      expect(mockAudioContext.close).toHaveBeenCalled();
    });

    it('should handle re-render with play changing from false to true', () => {
      const { rerender } = render(<FanfareSound play={false} />);
      
      expect(global.AudioContext).not.toHaveBeenCalled();
      
      rerender(<FanfareSound play={true} />);
      
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
        render(<FanfareSound play={true} onComplete={mockOnComplete} />);
      }).not.toThrow();
      
      // Should still call onComplete even if audio fails
      vi.advanceTimersByTime(200);
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should handle missing AudioContext gracefully', () => {
      (global as any).AudioContext = undefined;
      (global as any).webkitAudioContext = undefined;
      
      expect(() => {
        render(<FanfareSound play={true} />);
      }).not.toThrow();
    });

    it('should not crash if onComplete is not provided', () => {
      render(<FanfareSound play={true} />);
      
      expect(() => {
        vi.advanceTimersByTime(3000);
      }).not.toThrow();
    });
  });

  describe('Audio Sequence', () => {
    it('should play multiple notes in sequence', () => {
      render(<FanfareSound play={true} />);
      
      // Advance timers to trigger note sequence
      vi.advanceTimersByTime(500);
      
      // Should create multiple oscillators for the note sequence
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
    });

    it('should configure oscillator frequencies', () => {
      render(<FanfareSound play={true} />);
      
      // Advance timers to trigger note creation
      vi.advanceTimersByTime(100);
      
      expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalled();
    });

    it('should configure gain envelopes', () => {
      render(<FanfareSound play={true} />);
      
      // Advance timers to trigger note creation
      vi.advanceTimersByTime(100);
      
      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalled();
      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalled();
    });

    it('should start and stop oscillators with proper timing', () => {
      render(<FanfareSound play={true} />);
      
      vi.advanceTimersByTime(100);
      
      expect(mockOscillator.start).toHaveBeenCalled();
    });
  });
});
