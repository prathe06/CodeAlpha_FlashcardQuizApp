/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { Flashcard as FlashcardComponent } from './components/Flashcard';
import { NavigationControls } from './components/NavigationControls';
import { FlashcardForm } from './components/FlashcardForm';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { EmptyState } from './components/EmptyState';
import { DeckOverviewModal } from './components/DeckOverviewModal';
import { PythonCodeModal } from './components/PythonCodeModal';
import { INITIAL_FLASHCARDS, SIMPLE_PYTHON_FLASHCARDS } from './data/initialCards';
import { Flashcard } from './types';

const STORAGE_KEY = 'flashcards_deck_simple_v4';

export default function App() {
  // Flashcards list loaded from localStorage or initial sample set with simple questions
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
    return INITIAL_FLASHCARDS;
  });

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Form modal states
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  // Delete modal state
  const [deletingCard, setDeletingCard] = useState<Flashcard | null>(null);

  // Deck overview list modal state
  const [isDeckListOpen, setIsDeckListOpen] = useState<boolean>(false);

  // Python Code Modal state
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);

  // Shuffle state indicator
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Save to localStorage whenever flashcards change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [flashcards]);

  // Ensure currentCardIndex stays valid if flashcards count changes
  useEffect(() => {
    if (flashcards.length === 0) {
      setCurrentCardIndex(0);
    } else if (currentCardIndex >= flashcards.length) {
      setCurrentCardIndex(flashcards.length - 1);
    }
  }, [flashcards.length, currentCardIndex]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentCardIndex < flashcards.length - 1) {
      setShowAnswer(false);
      setCurrentCardIndex((prev) => prev + 1);
    }
  }, [currentCardIndex, flashcards.length]);

  const handlePrevious = useCallback(() => {
    if (currentCardIndex > 0) {
      setShowAnswer(false);
      setCurrentCardIndex((prev) => prev - 1);
    }
  }, [currentCardIndex]);

  const handleToggleAnswer = useCallback(() => {
    setShowAnswer((prev) => !prev);
  }, []);

  // Open modal to add a new card
  const handleOpenAddCard = () => {
    setEditingCard(null);
    setIsFormOpen(true);
  };

  // Open modal to edit current card
  const handleOpenEditCard = (cardToEdit?: Flashcard) => {
    const target = cardToEdit || flashcards[currentCardIndex];
    if (!target) return;
    setEditingCard(target);
    setIsFormOpen(true);
  };

  // Open delete confirmation modal
  const handleOpenDeleteCard = (cardToDelete?: Flashcard) => {
    const target = cardToDelete || flashcards[currentCardIndex];
    if (!target) return;
    setDeletingCard(target);
  };

  // Save card (handles both Add and Edit)
  const handleSaveCard = ({ question, answer }: { question: string; answer: string }) => {
    if (editingCard) {
      // Editing existing card
      setFlashcards((prev) =>
        prev.map((c) =>
          c.id === editingCard.id
            ? { ...c, question, answer }
            : c
        )
      );
    } else {
      // Adding new card
      const newCard: Flashcard = {
        id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        question,
        answer,
        createdAt: Date.now(),
      };
      setFlashcards((prev) => [...prev, newCard]);
      setCurrentCardIndex(flashcards.length);
      setShowAnswer(false);
    }
    setIsFormOpen(false);
    setEditingCard(null);
  };

  // Confirm delete card
  const handleConfirmDelete = () => {
    if (!deletingCard) return;

    const deleteIndex = flashcards.findIndex((c) => c.id === deletingCard.id);
    const updatedCards = flashcards.filter((c) => c.id !== deletingCard.id);

    setFlashcards(updatedCards);
    setShowAnswer(false);

    if (deleteIndex !== -1) {
      if (updatedCards.length === 0) {
        setCurrentCardIndex(0);
      } else if (deleteIndex >= updatedCards.length) {
        setCurrentCardIndex(updatedCards.length - 1);
      } else {
        setCurrentCardIndex(deleteIndex);
      }
    }

    setDeletingCard(null);
  };

  // Restore sample flashcards
  const handleRestoreDefaults = () => {
    setFlashcards(INITIAL_FLASHCARDS);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setIsShuffled(false);
  };

  // Switch to Simple Python deck
  const handleLoadPythonDeck = () => {
    setFlashcards(SIMPLE_PYTHON_FLASHCARDS);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setIsShuffled(false);
  };

  // Switch to Simple Web deck
  const handleLoadWebDeck = () => {
    setFlashcards(INITIAL_FLASHCARDS);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setIsShuffled(false);
  };

  // Shuffle deck
  const handleShuffle = () => {
    if (flashcards.length <= 1) return;
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setIsShuffled(true);
  };

  // Reset shuffled order
  const handleResetOrder = () => {
    const sorted = [...flashcards].sort((a, b) => a.createdAt - b.createdAt);
    setFlashcards(sorted);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setIsShuffled(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA';

      if (isInputActive || isFormOpen || deletingCard || isDeckListOpen || isPythonModalOpen) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === ' ' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleAnswer();
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        handleOpenEditCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleNext,
    handlePrevious,
    handleToggleAnswer,
    isFormOpen,
    deletingCard,
    isDeckListOpen,
    isPythonModalOpen,
    flashcards,
    currentCardIndex,
  ]);

  const currentCard = flashcards[currentCardIndex];
  const hasCards = flashcards.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <Header
        cardCount={flashcards.length}
        onAddCard={handleOpenAddCard}
        onToggleDeckList={() => setIsDeckListOpen(true)}
        isDeckListOpen={isDeckListOpen}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* Page Title & Subtitle */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Study Your Way
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-md mx-auto">
            Review your flashcards and master your subjects.
          </p>

          {/* Quick Simple Deck Switchers */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleLoadWebDeck}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              🌐 Simple Web Deck
            </button>
            <button
              type="button"
              onClick={handleLoadPythonDeck}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              🐍 Simple Python Deck
            </button>
          </div>
        </div>

        {hasCards ? (
          <div className="w-full flex flex-col items-center">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-6">
              <ProgressBar
                currentIndex={currentCardIndex}
                totalCards={flashcards.length}
              />
            </div>

            {/* Flashcard Component */}
            {currentCard && (
              <FlashcardComponent
                card={currentCard}
                showAnswer={showAnswer}
                onToggleAnswer={handleToggleAnswer}
                cardNumber={currentCardIndex + 1}
                totalCards={flashcards.length}
              />
            )}

            {/* Navigation Controls: Previous, Counter, Next, Edit, Delete */}
            <NavigationControls
              currentIndex={currentCardIndex}
              totalCards={flashcards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onEdit={() => handleOpenEditCard()}
              onDelete={() => handleOpenDeleteCard()}
              onShuffle={handleShuffle}
              onResetOrder={handleResetOrder}
              isShuffled={isShuffled}
            />

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px] shadow-2xs">
                  Space
                </kbd>{' '}
                Flip Card
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px] shadow-2xs">
                  ←
                </kbd>{' '}
                Prev
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px] shadow-2xs">
                  →
                </kbd>{' '}
                Next
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px] shadow-2xs">
                  E
                </kbd>{' '}
                Edit
              </span>
            </div>
          </div>
        ) : (
          /* Empty State when no cards */
          <EmptyState
            onCreateCard={handleOpenAddCard}
            onRestoreDefaults={handleRestoreDefaults}
          />
        )}
      </main>

      {/* Add / Edit Flashcard Modal */}
      <FlashcardForm
        isOpen={isFormOpen}
        isEditing={Boolean(editingCard)}
        initialData={editingCard}
        onSave={handleSaveCard}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCard(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingCard)}
        card={deletingCard}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingCard(null)}
      />

      {/* Deck Overview Modal */}
      <DeckOverviewModal
        isOpen={isDeckListOpen}
        onClose={() => setIsDeckListOpen(false)}
        cards={flashcards}
        currentIndex={currentCardIndex}
        onSelectCard={(idx) => {
          setCurrentCardIndex(idx);
          setShowAnswer(false);
        }}
        onEditCard={(card) => {
          setIsDeckListOpen(false);
          handleOpenEditCard(card);
        }}
        onDeleteCard={(card) => {
          setIsDeckListOpen(false);
          handleOpenDeleteCard(card);
        }}
      />

      {/* Python Code Companion Modal */}
      <PythonCodeModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
        onLoadPythonDeck={handleLoadPythonDeck}
        onLoadWebDeck={handleLoadWebDeck}
      />
    </div>
  );
}
