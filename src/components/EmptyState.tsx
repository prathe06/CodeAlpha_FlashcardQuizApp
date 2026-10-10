import React from 'react';
import { Plus, BookOpen, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onCreateCard: () => void;
  onRestoreDefaults: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onCreateCard,
  onRestoreDefaults,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto py-12 px-6 text-center bg-white rounded-3xl border border-slate-200/90 shadow-sm my-6">
      {/* Decorative Icon */}
      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
        <BookOpen className="w-8 h-8" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
        Your study deck is empty
      </h2>

      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
        Create your first flashcard to start studying.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onCreateCard}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm shadow-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          <span>+ Create Flashcard</span>
        </button>

        <button
          type="button"
          onClick={onRestoreDefaults}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Restore Sample Cards</span>
        </button>
      </div>
    </div>
  );
};
