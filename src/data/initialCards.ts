import { Flashcard } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'card-1',
    question: 'What is HTML?',
    answer: 'HTML is the standard markup language used to structure web pages.',
    createdAt: 1710000001000,
  },
  {
    id: 'card-2',
    question: 'What is CSS?',
    answer: 'CSS is used to style and design web pages.',
    createdAt: 1710000002000,
  },
  {
    id: 'card-3',
    question: 'What is JavaScript?',
    answer: 'JavaScript is a programming language used to make web pages interactive.',
    createdAt: 1710000003000,
  },
  {
    id: 'card-4',
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
    createdAt: 1710000004000,
  },
  {
    id: 'card-5',
    question: 'What is an API?',
    answer: 'An API allows different software applications to communicate with each other.',
    createdAt: 1710000005000,
  },
];

export const SIMPLE_PYTHON_FLASHCARDS: Flashcard[] = [
  {
    id: 'py-1',
    question: 'What is Python?',
    answer: 'Python is a popular programming language known for being easy to read and simple to learn.',
    createdAt: 1710000006000,
  },
  {
    id: 'py-2',
    question: 'How do you output text to the screen in Python?',
    answer: 'Use the `print()` function: \n\n```python\nprint("Hello, World!")\n```',
    createdAt: 1710000007000,
  },
  {
    id: 'py-3',
    question: 'What keyword is used to define a function in Python?',
    answer: 'The `def` keyword: \n\n```python\ndef say_hello():\n    print("Hello!")\n```',
    createdAt: 1710000008000,
  },
  {
    id: 'py-4',
    question: 'How do you write a comment in Python?',
    answer: 'Use the `#` symbol: \n\n```python\n# This is a comment in Python\n```',
    createdAt: 1710000009000,
  },
  {
    id: 'py-5',
    question: 'What data type represents True or False in Python?',
    answer: 'The `bool` (Boolean) data type, which can be either `True` or `False`.',
    createdAt: 1710000010000,
  },
];
