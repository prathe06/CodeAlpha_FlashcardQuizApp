import React from 'react';
import { Plus, BookOpen, Layers, Terminal } from 'lucide-react';

interface HeaderProps {
  cardCount: number;
  onAddCard: () => void;
  onToggleDeckList?: () => void;
  isDeckListOpen?: boolean;
  onOpenPythonModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cardCount,
  onAddCard,
  onToggleDeckList,
  isDeckListOpen,
  onOpenPythonModal,
}) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-lg flex items-center gap-1.5">
              FlashCards
            </span>
          </div>
        </div>

        {/* Right: Actions & Counter */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Python Code Action Button */}
          {onOpenPythonModal && (
            <button
              onClick={onOpenPythonModal}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100/80 text-amber-900 transition-colors cursor-pointer"
              title="View Python code implementation & deck switcher"
              aria-label="View Python code"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-600" />
              <span>Python Code</span>
            </button>
          )}

          <div className="hidden sm:flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-900 mr-1">{cardCount}</span>
            {cardCount === 1 ? 'Card' : 'Cards'}
          </div>

          {onToggleDeckList && cardCount > 0 && (
            <button
              onClick={onToggleDeckList}
              type="button"
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDeckListOpen
                  ? 'bg-slate-100 text-slate-900 border-slate-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="View all cards in deck"
              aria-label="View all cards in deck"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>All Cards</span>
            </button>
          )}

          <button
            onClick={onAddCard}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            aria-label="Add new flashcard"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>+ Add Flashcard</span>
          </button>
        </div>
      </div>
    </header>
  );
};
