/**
 * Audio Service
 * 
 * Singleton service for managing game audio effects.
 * Provides various sound effects for different game events using Web Audio API.
 */

'use client';

/**
 * Singleton service class for handling all game audio effects
 */
export class AudioService {
  private static instance: AudioService;
  private audioContext: AudioContext | null = null;

  /**
   * Gets the singleton instance of AudioService
   * @returns The singleton AudioService instance
   */
  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  /**
   * Gets or creates the Web Audio API context
   * @returns The AudioContext instance
   */
  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext!;
  }

  /**
   * Plays an alarm sound when the timer expires
   * Creates a rapid beeping pattern to indicate time's up
   */
  playAlarmSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      /**
       * Creates a single beep sound
       * @param frequency - Frequency in Hz
       * @param duration - Duration in seconds
       * @param delay - Delay before playing in milliseconds
       */
      const createBeep = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          // Connect oscillator to gain to output
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Configure the beep sound
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'square'; // Sharp, attention-grabbing sound
          
          // Set volume and fade out
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          // Play the sound
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };
      
      // Create rapid beeping alarm pattern (alternating high and low pitch)
      for (let i = 0; i < 6; i++) {
        createBeep(800, 0.15, i * 200); // High pitch beep
        createBeep(600, 0.15, i * 200 + 100); // Lower pitch beep
      }
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  /**
   * Plays a warning beep for countdown (last few seconds)
   * Single, short beep to indicate urgency
   */
  playWarningBeep(): void {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect and configure
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Medium frequency sine wave for warning
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.type = 'sine';
      
      // Quieter than alarm, brief sound
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  /**
   * Plays a success sound (ascending musical notes)
   * Used for positive feedback like correct answers
   */
  playSuccessSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      // Play ascending chord progression (C, E, G)
      const notes = [261.63, 329.63, 392.00];
      notes.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Pleasant sine wave
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          // Medium volume with gentle fade
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 150); // Stagger the notes
      });
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  /**
   * Plays an error sound (descending musical notes)
   * Used for negative feedback like wrong answers
   */
  playErrorSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      // Play descending notes (G, E, C) - opposite of success
      const notes = [392.00, 329.63, 261.63];
      notes.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Harsher sawtooth wave for error feedback
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sawtooth';
          
          // Shorter, more abrupt sound
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }, index * 100); // Faster progression for urgency
      });
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }
}
