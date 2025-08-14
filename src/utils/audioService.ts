'use client';

export class AudioService {
  private static instance: AudioService;
  private audioContext: AudioContext | null = null;

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext!;
  }

  playAlarmSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      // Create alarm sound with oscillators (classic alarm clock beeping)
      const createBeep = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };
      
      // Create rapid beeping alarm pattern
      for (let i = 0; i < 6; i++) {
        createBeep(800, 0.15, i * 200); // High pitch beep
        createBeep(600, 0.15, i * 200 + 100); // Lower pitch beep
      }
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  playWarningBeep(): void {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  playSuccessSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      // Play ascending notes for success
      const notes = [261.63, 329.63, 392.00]; // C, E, G
      notes.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 150);
      });
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }

  playErrorSound(): void {
    try {
      const audioContext = this.getAudioContext();
      
      // Play descending notes for error
      const notes = [392.00, 329.63, 261.63]; // G, E, C
      notes.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sawtooth';
          
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }, index * 100);
      });
    } catch {
      console.log('Audio not supported or blocked by browser');
    }
  }
}
