import React, { useState, useEffect } from 'react';
import { X, Search, Pencil, Trash2 } from 'lucide-react';
import { Flashcard } from '../types';

interface DeckOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Flashcard[];
  currentIndex: number;
  onSelectCard: (index: number) => void;
  onEditCard: (card: Flashcard) => void;
  onDeleteCard: (card: Flashcard) => void;
}

export const DeckOverviewModal: React.FC<DeckOverviewModalProps> = ({
  isOpen,
  onClose,
  cards,
  currentIndex,
  onSelectCard,
  onEditCard,
  onDeleteCard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCards = cards.filter(
    (card) =>
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deck-overview-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-xl border border-slate-200 flex flex-col overflow-hidden transform transition-all animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 id="deck-overview-title" className="text-lg font-bold text-slate-800">
              Deck Overview
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {cards.length} {cards.length === 1 ? 'card' : 'cards'} in total
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close overview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cards by question or answer..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Card List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
          {filteredCards.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No flashcards found matching "{searchTerm}"
            </div>
          ) : (
            filteredCards.map((card) => {
              const originalIndex = cards.findIndex((c) => c.id === card.id);
              const isActive = originalIndex === currentIndex;

              return (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div
                    className="flex-1 cursor-pointer min-w-0"
                    onClick={() => {
                      onSelectCard(originalIndex);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{originalIndex + 1}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {card.question}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                      {card.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCard(originalIndex);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Study
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditCard(card)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit card"
                      aria-label="Edit card"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteCard(card)}
                      className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete card"
                      aria-label="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
