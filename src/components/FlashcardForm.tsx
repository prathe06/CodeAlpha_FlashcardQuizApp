import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Code } from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardFormProps {
  isOpen: boolean;
  isEditing: boolean;
  initialData?: Flashcard | null;
  onSave: (data: { question: string; answer: string }) => void;
  onClose: () => void;
}

export const FlashcardForm: React.FC<FlashcardFormProps> = ({
  isOpen,
  isEditing,
  initialData,
  onSave,
  onClose,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});
  const questionInputRef = useRef<HTMLTextAreaElement>(null);
  const answerInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setQuestion(initialData.question);
        setAnswer(initialData.answer);
      } else {
        setQuestion('');
        setAnswer('');
      }
      setErrors({});
      setTimeout(() => {
        questionInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialData]);

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

  const insertPythonSnippet = (target: 'question' | 'answer') => {
    const snippet = '\n```python\n# Write Python code here\ndef example():\n    return "Hello World"\n```\n';
    if (target === 'question') {
      setQuestion((prev) => prev + snippet);
      questionInputRef.current?.focus();
    } else {
      setAnswer((prev) => prev + snippet);
      answerInputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    const newErrors: { question?: string; answer?: string } = {};

    if (!trimmedQuestion) {
      newErrors.question = 'Question cannot be empty.';
    }

    if (!trimmedAnswer) {
      newErrors.answer = 'Answer cannot be empty.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      question: trimmedQuestion,
      answer: trimmedAnswer,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 id="modal-title" className="text-lg font-bold text-slate-800">
            {isEditing ? 'Edit Flashcard' : 'Add Flashcard'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Question Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="card-question"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Question <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => insertPythonSnippet('question')}
                className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                title="Insert formatted Python code block"
              >
                <Code className="w-3 h-3" />
                <span>+ Python Code</span>
              </button>
            </div>
            <textarea
              id="card-question"
              ref={questionInputRef}
              rows={3}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (errors.question) {
                  setErrors((prev) => ({ ...prev, question: undefined }));
                }
              }}
              placeholder="e.g. How do you parse an API response in Python?"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y min-h-[75px] font-sans ${
                errors.question
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
              }`}
              aria-invalid={errors.question ? 'true' : 'false'}
              aria-describedby={errors.question ? 'question-error' : undefined}
            />
            {errors.question && (
              <p
                id="question-error"
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.question}</span>
              </p>
            )}
          </div>

          {/* Answer Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="card-answer"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Answer <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => insertPythonSnippet('answer')}
                className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                title="Insert formatted Python code block"
              >
                <Code className="w-3 h-3" />
                <span>+ Python Code</span>
              </button>
            </div>
            <textarea
              id="card-answer"
              ref={answerInputRef}
              rows={5}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (errors.answer) {
                  setErrors((prev) => ({ ...prev, answer: undefined }));
                }
              }}
              placeholder="Provide answer or code snippet. Use ```python ... ``` for syntax formatting."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y min-h-[90px] font-sans ${
                errors.answer
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
              }`}
              aria-invalid={errors.answer ? 'true' : 'false'}
              aria-describedby={errors.answer ? 'answer-error' : undefined}
            />
            {errors.answer && (
              <p
                id="answer-error"
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.answer}</span>
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-sm shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            >
              Save Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
