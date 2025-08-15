/**
 * Womp Womp Sound Component
 * 
 * Generates and plays the classic "womp womp" defeat sound using Web Audio API.
 * Used for player losses with a descending trombone-like effect.
 */

'use client';

import { useEffect } from 'react';

/**
 * Props for the WompWompSound component
 */
interface WompWompSoundProps {
  /** Whether to play the womp womp sound */
  play: boolean;
  /** Volume level (0-1) */
  volume?: number;
  /** Callback when sound completes */
  onComplete?: () => void;
}

/**
 * Musical sequence for the classic "womp womp" defeat sound
 * Comedic, bouncy trombone-like notes with playful character
 */
const WOMP_SEQUENCE = [
  { 
    startFreq: 330,   // E4 (higher, brighter)
    endFreq: 220,     // A3 (bigger slide for comedy)
    duration: 0.4 
  },
  { 
    startFreq: 247,   // B3 (musical interval)
    endFreq: 165,     // E3 (playful descent)
    duration: 0.5 
  }
];

/**
 * Component that plays the classic "womp womp" defeat sound
 * 
 * Creates a comedic but sympathetic sound effect perfect for losses.
 * Uses sliding frequencies and trombone-like timbre for authentic effect.
 * 
 * @param play - Triggers the womp womp when true
 * @param volume - Controls overall volume (default: 0.3)
 * @param onComplete - Called when the sound sequence finishes
 */
export default function WompWompSound({ 
  play, 
  volume = 0.3, 
  onComplete 
}: WompWompSoundProps) {
  
  useEffect(() => {
    if (!play) return;

    let audioContext: AudioContext | null = null;
    
    try {
      // Create audio context
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
      
      /**
       * Creates a single "womp" with sliding pitch and comedic character
       * @param startFreq - Starting frequency in Hz
       * @param endFreq - Ending frequency in Hz (creates slide effect)
       * @param duration - Duration of the womp in seconds
       * @param delay - Delay before playing in milliseconds
       */
      const playWomp = (startFreq: number, endFreq: number, duration: number, delay: number) => {
        setTimeout(() => {
          if (!audioContext) return;
          
          // Main oscillator for the womp sound
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          // Harmonic oscillator for brightness (perfect fifth)
          const harmOsc = audioContext.createOscillator();
          const harmGain = audioContext.createGain();
          
          // Add filter for warm, rounded timbre
          const filter = audioContext.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, audioContext.currentTime); // Brighter filter
          filter.Q.setValueAtTime(3, audioContext.currentTime); // Less harsh
          
          // Master gain for combining oscillators
          const masterGain = audioContext.createGain();
          
          // Connect audio graph: oscillators -> gains -> master -> filter -> output
          oscillator.connect(gainNode);
          harmOsc.connect(harmGain);
          gainNode.connect(masterGain);
          harmGain.connect(masterGain);
          masterGain.connect(filter);
          filter.connect(audioContext.destination);
          
          // Use triangle wave for warmer, friendlier timbre
          oscillator.type = 'triangle';
          harmOsc.type = 'sine';
          
          // Create the sliding pitch effect (the "womp")
          const currentTime = audioContext.currentTime;
          oscillator.frequency.setValueAtTime(startFreq, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(endFreq, currentTime + duration);
          
          // Harmonic follows at perfect fifth for richness
          harmOsc.frequency.setValueAtTime(startFreq * 1.5, currentTime);
          harmOsc.frequency.exponentialRampToValueAtTime(endFreq * 1.5, currentTime + duration);
          
          // Set volumes for bright, comedic mix
          gainNode.gain.setValueAtTime(volume * 0.8, currentTime);
          harmGain.gain.setValueAtTime(volume * 0.3, currentTime); // Bright harmonic
          
          // Comedic envelope: Bouncy attack, playful sustain, gentle release
          masterGain.gain.setValueAtTime(0, currentTime);
          masterGain.gain.linearRampToValueAtTime(1.0, currentTime + 0.04); // Bouncy attack
          masterGain.gain.setValueAtTime(0.9, currentTime + duration * 0.4); // Sustained comedy
          masterGain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration); // Gentle release
          
          // Add cheerful vibrato for character
          const lfo = audioContext.createOscillator();
          const lfoGain = audioContext.createGain();
          lfo.frequency.setValueAtTime(6, currentTime); // 6Hz vibrato (more lively)
          lfoGain.gain.setValueAtTime(12, currentTime); // Prominent modulation for personality
          
          lfo.connect(lfoGain);
          lfoGain.connect(oscillator.frequency);
          
          // Start everything
          oscillator.start(currentTime);
          harmOsc.start(currentTime);
          lfo.start(currentTime);
          
          // Stop everything
          oscillator.stop(currentTime + duration);
          harmOsc.stop(currentTime + duration);
          lfo.stop(currentTime + duration);
        }, delay);
      };
      
      // Play the womp womp sequence
      let totalDelay = 0;
      WOMP_SEQUENCE.forEach((womp) => {
        playWomp(womp.startFreq, womp.endFreq, womp.duration, totalDelay);
        totalDelay += womp.duration * 1000 + 100; // Small gap between womps
      });
      
      // Call completion callback after sequence finishes
      setTimeout(() => {
        onComplete?.();
      }, totalDelay + 200);
      
    } catch (error) {
      console.log('Audio not supported or blocked by browser:', error);
      // Call completion callback even if audio fails
      setTimeout(() => onComplete?.(), 100);
    }
    
    // Cleanup function
    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [play, volume, onComplete]);

  // This component doesn't render anything visual
  return null;
}
