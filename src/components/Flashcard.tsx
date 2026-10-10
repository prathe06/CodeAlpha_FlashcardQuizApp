import React from 'react';
import { Eye, EyeOff, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Flashcard as FlashcardType } from '../types';
import { CodeRenderer } from './CodeRenderer';

interface FlashcardProps {
  card: FlashcardType;
  showAnswer: boolean;
  onToggleAnswer: () => void;
  cardNumber: number;
  totalCards: number;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  showAnswer,
  onToggleAnswer,
  cardNumber,
  totalCards,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000 select-none">
      {/* 3D Card Container */}
      <div
        className={`relative w-full min-h-[320px] sm:min-h-[360px] rounded-2xl transition-transform duration-500 transform-style-preserve-3d cursor-pointer shadow-sm hover:shadow-md border border-slate-200/90 bg-white ${
          showAnswer ? 'rotate-y-180' : ''
        }`}
        onClick={onToggleAnswer}
        role="button"
        tabIndex={0}
        aria-label={
          showAnswer
            ? `Flashcard ${cardNumber} of ${totalCards}. Answer: ${card.answer}. Press space or click to view question.`
            : `Flashcard ${cardNumber} of ${totalCards}. Question: ${card.question}. Press space or click to show answer.`
        }
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onToggleAnswer();
          }
        }}
      >
        {/* ================= FRONT SIDE (QUESTION) ================= */}
        <div className="absolute inset-0 w-full h-full p-6 sm:p-7 flex flex-col justify-between backface-hidden rounded-2xl bg-white overflow-y-auto">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Question</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Card {cardNumber} of {totalCards}
            </span>
          </div>

          {/* Question Text */}
          <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
            <div className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed px-1 w-full text-center">
              <CodeRenderer content={card.question} />
            </div>
          </div>

          {/* Front Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-normal hidden sm:inline-block">
              Click card or press Space to flip
            </span>

            {/* Prominent "Show Answer" button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleAnswer();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white transition-all shadow-sm shadow-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Show Answer"
            >
              <Eye className="w-4 h-4" />
              <span>Show Answer</span>
            </button>
          </div>
        </div>

        {/* ================= BACK SIDE (ANSWER) ================= */}
        <div className="absolute inset-0 w-full h-full p-6 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 rounded-2xl bg-slate-50/70 overflow-y-auto">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Answer</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Card {cardNumber} of {totalCards}
            </span>
          </div>

          {/* Answer Content */}
          <div className="my-auto py-4 flex flex-col items-center justify-center w-full">
            <div className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed px-1 w-full text-left sm:text-center">
              <CodeRenderer content={card.answer} />
            </div>
          </div>

          {/* Back Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-200 gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-normal hidden sm:inline-block">
              Click card or press Space to hide
            </span>

            {/* "Hide Answer" / "Show Question" button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleAnswer();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              aria-label="Hide Answer"
            >
              <EyeOff className="w-4 h-4 text-slate-600" />
              <span>Hide Answer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
