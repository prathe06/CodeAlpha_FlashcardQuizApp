import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  totalCards: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalCards,
}) => {
  if (totalCards === 0) {
    return null;
  }

  const currentNumber = currentIndex + 1;
  const progressPercentage = Math.min(100, Math.max(0, (currentNumber / totalCards) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
        <span>Deck Progress</span>
        <span>
          {Math.round(progressPercentage)}% ({currentNumber}/{totalCards})
        </span>
      </div>
      <div
        className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60"
        role="progressbar"
        aria-valuenow={currentNumber}
        aria-valuemin={1}
        aria-valuemax={totalCards}
        aria-label="Study progress in deck"
      >
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
