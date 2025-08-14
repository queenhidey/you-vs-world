import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Web Audio API
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    frequency: { setValueAtTime: vi.fn() },
    type: 'sine',
    start: vi.fn(),
    stop: vi.fn(),
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: { 
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  }),
  destination: {},
  currentTime: 0,
}))

// Mock window.webkitAudioContext for Safari
;(global as any).webkitAudioContext = global.AudioContext

// Mock timers
vi.useFakeTimers()
