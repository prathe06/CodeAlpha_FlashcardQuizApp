import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download, Sparkles } from 'lucide-react';

interface PythonCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadPythonDeck: () => void;
  onLoadWebDeck: () => void;
}

export const PYTHON_APPLET_CODE = `#!/usr/bin/env python3
"""
Flashcard Quiz Application
A complete standalone Python study application implementing:
- Flashcard display with Show/Hide Answer
- Card navigation (Previous, Next, Card Counter)
- Add, Edit, Delete flashcards with input validation
- Confirmation dialogs for deletion
- Data persistence using local JSON storage
- Default sample flashcards
"""

import json
import os
import sys

DATA_FILE = "flashcards_deck.json"

DEFAULT_CARDS = [
    {
        "id": "1",
        "question": "What is HTML?",
        "answer": "HTML is the standard markup language used to structure web pages."
    },
    {
        "id": "2",
        "question": "What is CSS?",
        "answer": "CSS is used to style and design web pages."
    },
    {
        "id": "3",
        "question": "What is JavaScript?",
        "answer": "JavaScript is a programming language used to make web pages interactive."
    },
    {
        "id": "4",
        "question": "What is React?",
        "answer": "React is a JavaScript library for building user interfaces."
    },
    {
        "id": "5",
        "question": "What is an API?",
        "answer": "An API allows different software applications to communicate with each other."
    }
]

def load_deck():
    """Load flashcards from local JSON file or return default cards."""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return list(DEFAULT_CARDS)

def save_deck(cards):
    """Save flashcards to local JSON file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(cards, f, indent=2, ensure_ascii=False)

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main_cli():
    cards = load_deck()
    current_idx = 0
    show_answer = False

    while True:
        clear_screen()
        total = len(cards)

        print("==================================================")
        print("           📚 FLASHCARD QUIZ APP (PYTHON)         ")
        print("==================================================")

        if total == 0:
            print("\\n  [!] Your study deck is empty.")
            print("  Create your first flashcard to start studying.\\n")
            print("[A] Add Flashcard   [R] Restore Samples   [Q] Quit")
            choice = input("\\nChoose option: ").strip().lower()
            if choice == "a":
                add_card(cards)
            elif choice == "r":
                cards = list(DEFAULT_CARDS)
                save_deck(cards)
                current_idx = 0
            elif choice == "q":
                break
            continue

        # Clamp index
        if current_idx >= total:
            current_idx = total - 1
        if current_idx < 0:
            current_idx = 0

        card = cards[current_idx]
        progress = int(((current_idx + 1) / total) * 100)

        print(f"Card {current_idx + 1} of {total}  [{'#' * (progress // 10)}{'.' * (10 - progress // 10)}] {progress}%")
        print("--------------------------------------------------")

        # Question / Answer Display
        print(f"\\n[QUESTION]:\\n  {card['question']}\\n")

        if show_answer:
            print("--------------------------------------------------")
            print(f"[ANSWER]:\\n  {card['answer']}\\n")
            print("--------------------------------------------------")
        else:
            print("--------------------------------------------------")
            print("  (Answer hidden - press [S] to Show Answer)")
            print("--------------------------------------------------")

        # Controls
        print("\\nNavigation: [N] Next | [P] Previous | [S] Show/Hide Answer")
        print("Manage:     [A] Add  | [E] Edit     | [D] Delete | [Q] Quit")
        cmd = input("\\nCommand: ").strip().lower()

        if cmd == "s":
            show_answer = not show_answer
        elif cmd == "n":
            if current_idx < total - 1:
                current_idx += 1
                show_answer = False
            else:
                input("\\nAlready on the last card. Press Enter...")
        elif cmd == "p":
            if current_idx > 0:
                current_idx -= 1
                show_answer = False
            else:
                input("\\nAlready on the first card. Press Enter...")
        elif cmd == "a":
            add_card(cards)
            current_idx = len(cards) - 1
            show_answer = False
        elif cmd == "e":
            edit_card(cards, current_idx)
            show_answer = False
        elif cmd == "d":
            confirm = input("\\nAre you sure you want to delete this flashcard? (y/N): ").strip().lower()
            if confirm == "y":
                cards.pop(current_idx)
                save_deck(cards)
                show_answer = False
                if current_idx >= len(cards) and len(cards) > 0:
                    current_idx = len(cards) - 1
        elif cmd == "q":
            print("\\nHappy studying! Exiting...")
            sys.exit(0)

def add_card(cards):
    print("\\n--- Add Flashcard ---")
    q = input("Question: ").strip()
    if not q:
        print("[!] Question cannot be empty.")
        input("Press Enter...")
        return
    a = input("Answer: ").strip()
    if not a:
        print("[!] Answer cannot be empty.")
        input("Press Enter...")
        return
    new_card = {"id": str(len(cards) + 1), "question": q, "answer": a}
    cards.append(new_card)
    save_deck(cards)
    print("✓ Flashcard added successfully!")

def edit_card(cards, idx):
    card = cards[idx]
    print("\\n--- Edit Flashcard ---")
    print(f"Current Question: {card['question']}")
    new_q = input("New Question (press Enter to keep): ").strip()
    print(f"Current Answer: {card['answer']}")
    new_a = input("New Answer (press Enter to keep): ").strip()

    if new_q:
        card['question'] = new_q
    if new_a:
        card['answer'] = new_a
    save_deck(cards)
    print("✓ Flashcard updated successfully!")

if __name__ == "__main__":
    main_cli()
`;

export const PythonCodeModal: React.FC<PythonCodeModalProps> = ({
  isOpen,
  onClose,
  onLoadPythonDeck,
  onLoadWebDeck,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_APPLET_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([PYTHON_APPLET_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards_app.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="python-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-xl border border-slate-200 flex flex-col overflow-hidden transform transition-all animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-200">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 id="python-modal-title" className="text-base font-bold text-slate-800">
                Python Flashcard Implementation
              </h2>
              <p className="text-xs text-slate-500">
                Run locally with <code className="font-mono text-indigo-600">python flashcards_app.py</code>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Deck Switcher Action Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-700">Quick Study Deck Sets:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onLoadPythonDeck();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Python Core Deck</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onLoadWebDeck();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Load Web Basics Deck</span>
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 font-mono text-xs text-slate-200">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">
            <code>{PYTHON_APPLET_CODE}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">Standard library only · No dependencies required</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .py</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
