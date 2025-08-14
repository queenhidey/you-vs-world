/**
 * Manual Controls Component
 * 
 * Provides manual game control buttons for advancing/reversing player and chaser positions.
 * Also includes shortcuts for handling situations where players don't answer questions.
 */

'use client';

import { Button, Card } from '../ui';

/**
 * Props for the ManualControls component
 */
interface ManualControlsProps {
  /** Callback to advance player one position */
  onAdvancePlayer: () => void;
  /** Callback to move player back one position */
  onUnadvancePlayer: () => void;
  /** Callback to advance chaser one position */
  onAdvanceChaser: () => void;
  /** Callback to move chaser back one position */
  onUnadvanceChaser: () => void;
  /** Callback when player doesn't answer within time limit */
  onPlayerNoAnswer: () => void;
  /** Callback when chaser doesn't make a selection */
  onChaserNoAnswer: () => void;
  /** Whether the player has already answered the current question */
  playerAnswered: boolean;
  /** Whether the chaser has already made their selection */
  chaserHasPicked: boolean;
}

/**
 * Manual game controls panel
 * 
 * Provides quick access to manual game state manipulation for:
 * - Position adjustments (advance/reverse for both player and chaser)
 * - Handling non-responses (when player or chaser doesn't answer)
 * 
 * Buttons are conditionally disabled based on current game state to prevent
 * invalid actions (e.g., can't mark player as "didn't answer" if they already answered)
 */
export default function ManualControls({
  onAdvancePlayer,
  onUnadvancePlayer,
  onAdvanceChaser,
  onUnadvanceChaser,
  onPlayerNoAnswer,
  onChaserNoAnswer,
  playerAnswered,
  chaserHasPicked
}: ManualControlsProps) {
  return (
    <Card>
      <h3 className="text-white font-bold text-lg mb-4 text-center">Manual Controls</h3>
      
      <div className="flex flex-col gap-3">
        {/* Position Control Buttons */}
        <Button variant="primary" onClick={onAdvancePlayer}>
          Advance Player ⬆️
        </Button>
        
        <Button variant="info" onClick={onUnadvancePlayer}>
          Unadvance Player ⬇️
        </Button>
        
        <Button variant="danger" onClick={onAdvanceChaser}>
          Advance Chasers ⬆️
        </Button>
        
        <Button variant="warning" onClick={onUnadvanceChaser}>
          Unadvance Chasers ⬇️
        </Button>
        
        {/* Visual separator between position controls and skip controls */}
        <div className="border-t border-white/20 my-3"></div>
        
        {/* Skip/No Answer Buttons */}
        <Button 
          variant="warning"
          onClick={onPlayerNoAnswer}
          disabled={playerAnswered}
        >
          Player Didn&apos;t Answer ⏭️
        </Button>
        
        <Button 
          variant="info"
          onClick={onChaserNoAnswer}
          disabled={chaserHasPicked}
        >
          Chaser&apos;s Didn&apos;t Answer ⏭️
        </Button>
      </div>
    </Card>
  );
}
