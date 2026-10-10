import React from 'react';
import { ChevronLeft, ChevronRight, Pencil, Trash2, Shuffle, RotateCcw } from 'lucide-react';

interface NavigationControlsProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onShuffle?: () => void;
  onResetOrder?: () => void;
  isShuffled?: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  onEdit,
  onDelete,
  onShuffle,
  onResetOrder,
  isShuffled,
}) => {
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === totalCards - 1;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4 mt-6">
      {/* Primary Navigation Row: Previous, Counter, Next */}
      <div className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstCard}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            isFirstCard
              ? 'text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          }`}
          aria-label="Previous flashcard"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Card Counter Display */}
        <div className="text-center">
          <span className="text-sm font-semibold text-slate-800">
            Card {currentIndex + 1} of {totalCards}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={isLastCard}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            isLastCard
              ? 'text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          }`}
          aria-label="Next flashcard"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Controls: Edit, Delete, and Study helpers */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 px-1">
        {/* Left helper actions: Shuffle */}
        <div className="flex items-center gap-2">
          {onShuffle && totalCards > 1 && (
            <button
              type="button"
              onClick={onShuffle}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isShuffled
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
              title="Shuffle card order"
              aria-label="Shuffle card order"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{isShuffled ? 'Shuffled' : 'Shuffle'}</span>
            </button>
          )}

          {isShuffled && onResetOrder && (
            <button
              type="button"
              onClick={onResetOrder}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
              title="Reset to default card order"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right action buttons: Edit and Delete */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Edit button */}
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Edit this flashcard"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit</span>
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-label="Delete this flashcard"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
