'use client';

import { Button, Card } from '../ui';

interface ManualControlsProps {
  onAdvancePlayer: () => void;
  onUnadvancePlayer: () => void;
  onAdvanceChaser: () => void;
  onUnadvanceChaser: () => void;
  onPlayerNoAnswer: () => void;
  onChaserNoAnswer: () => void;
  playerAnswered: boolean;
  chaserHasPicked: boolean;
}

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
        
        <div className="border-t border-white/20 my-3"></div>
        
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
