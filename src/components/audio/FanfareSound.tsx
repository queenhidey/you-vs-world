/**
 * Fanfare Sound Component
 * 
 * Generates and plays a triumphant fanfare melody using Web Audio API.
 * Used for celebrating player victories with an uplifting musical sequence.
 */

'use client';

import { useEffect } from 'react';

/**
 * Props for the FanfareSound component
 */
interface FanfareSoundProps {
  /** Whether to play the fanfare sound */
  play: boolean;
  /** Volume level (0-1) */
  volume?: number;
  /** Callback when sound completes */
  onComplete?: () => void;
}

/**
 * Musical notes for fanfare melody
 * Bright, energetic victory fanfare with rapid flourishes and major key triumph
 */
const FANFARE_NOTES = [
  { frequency: 523.25, duration: 0.15 }, // C5 (quick start)
  { frequency: 659.25, duration: 0.15 }, // E5 (rapid ascent)
  { frequency: 783.99, duration: 0.15 }, // G5
  { frequency: 1046.50, duration: 0.25 }, // C6 (octave higher!)
  { frequency: 783.99, duration: 0.15 }, // G5 (quick return)
  { frequency: 1046.50, duration: 0.15 }, // C6 (bounce back up)
  { frequency: 1318.51, duration: 0.4 }, // E6 (soaring high)
  { frequency: 1567.98, duration: 0.6 }, // G6 (triumphant peak!)
];

/**
 * Component that plays a celebratory fanfare sound
 * 
 * Creates a majestic musical sequence perfect for victory celebrations.
 * Uses overlapping harmonies and crescendo effect for maximum impact.
 * 
 * @param play - Triggers the fanfare when true
 * @param volume - Controls overall volume (default: 0.3)
 * @param onComplete - Called when the entire fanfare sequence finishes
 */
export default function FanfareSound({ 
  play, 
  volume = 0.1, 
  onComplete 
}: FanfareSoundProps) {
  
  useEffect(() => {
    if (!play) return;

    let audioContext: AudioContext | null = null;
    
    try {
      // Create audio context
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
      
      /**
       * Creates a single note with envelope and harmonic richness
       * @param frequency - Base frequency in Hz
       * @param duration - Note duration in seconds
       * @param delay - Delay before playing in milliseconds
       * @param noteVolume - Volume for this specific note
       */
      const playNote = (frequency: number, duration: number, delay: number, noteVolume: number) => {
        setTimeout(() => {
          if (!audioContext) return;
          
          // Main oscillator for the note (bright triangle wave)
          const mainOsc = audioContext.createOscillator();
          const mainGain = audioContext.createGain();
          
          // Harmonic oscillator for sparkle (fifth interval)
          const harmOsc = audioContext.createOscillator();
          const harmGain = audioContext.createGain();
          
          // Sub-harmonic for richness (octave down)
          const subOsc = audioContext.createOscillator();
          const subGain = audioContext.createGain();
          
          // Master gain for combining all oscillators
          const masterGain = audioContext.createGain();
          
          // Connect audio graph
          mainOsc.connect(mainGain);
          harmOsc.connect(harmGain);
          subOsc.connect(subGain);
          mainGain.connect(masterGain);
          harmGain.connect(masterGain);
          subGain.connect(masterGain);
          masterGain.connect(audioContext.destination);
          
          // Configure main note (triangle wave for brightness)
          mainOsc.frequency.setValueAtTime(frequency, audioContext.currentTime);
          mainOsc.type = 'triangle';
          
          // Configure harmonic (perfect fifth for brightness)
          harmOsc.frequency.setValueAtTime(frequency * 1.5, audioContext.currentTime);
          harmOsc.type = 'sine';
          
          // Configure sub-harmonic (octave down for richness)
          subOsc.frequency.setValueAtTime(frequency * 0.5, audioContext.currentTime);
          subOsc.type = 'sine';
          
          // Set volumes for bright, energetic mix
          mainGain.gain.setValueAtTime(noteVolume * 0.2, audioContext.currentTime);
          harmGain.gain.setValueAtTime(noteVolume * 0.1, audioContext.currentTime); // Prominent harmony
          subGain.gain.setValueAtTime(noteVolume * 0.1, audioContext.currentTime); // Rich foundation
          
          // Bright envelope: Snappy attack, brief sustain, quick release
          masterGain.gain.setValueAtTime(0, audioContext.currentTime);
          masterGain.gain.linearRampToValueAtTime(volume * 1.2, audioContext.currentTime + 0.02); // Very quick, bright attack
          masterGain.gain.setValueAtTime(volume, audioContext.currentTime + duration * 0.1); // Brief sustain
          masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration); // Clean release
          
          // Start and stop oscillators
          const startTime = audioContext.currentTime;
          const stopTime = startTime + duration;
          
          mainOsc.start(startTime);
          harmOsc.start(startTime);
          subOsc.start(startTime);
          mainOsc.stop(stopTime);
          harmOsc.stop(stopTime);
          subOsc.stop(stopTime);
        }, delay);
      };
      
      // Play the fanfare sequence with rapid, energetic progression
      let totalDelay = 0;
      FANFARE_NOTES.forEach((note, index) => {
        const energeticVolume = 0.1 + (index * 0.05); // Strong volume with slight crescendo
        playNote(note.frequency, note.duration, totalDelay, energeticVolume);
        totalDelay += note.duration * 350; // Faster progression for energy
      });
      
      // Add multiple triumphant chords for explosive finale
      setTimeout(() => {
        if (!audioContext) return;
        
        // First chord: C major triad (C6, E6, G6)
        const firstChord = [1046.50, 1318.51, 1567.98];
        firstChord.forEach(freq => {
          playNote(freq, 0.8, 0, 1.0); // Loud, sustained
        });
        
        // Second chord: Higher octave burst (C7, E7, G7)
        setTimeout(() => {
          const secondChord = [2093.00, 2637.02, 3135.96];
          secondChord.forEach(freq => {
            playNote(freq, 0.6, 0, 0.9); // Brilliant sparkle
          });
        }, 400);
        
        // Final explosive chord with all harmonics
        setTimeout(() => {
          const finalChord = [1046.50, 1318.51, 1567.98, 2093.00];
          finalChord.forEach((freq, i) => {
            playNote(freq, 1.2, i * 20, 1.0); // Staggered for richness
          });
        }, 800);
        
        // Call completion callback after finale
        setTimeout(() => {
          onComplete?.();
        }, 2200);
        
      }, totalDelay + 100);
      
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
