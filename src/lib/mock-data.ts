import type { Question, Student } from './types';

export const currentUser: Student = {
    id: 's6',
    name: 'Fiona Garcia',
    avatarUrl: 'https://placehold.co/100x100.png',
    major: 'Computer Science',
    year: 4,
    isOnline: true
};

export const questions: Question[] = [
  {
    id: '1',
    title: 'What are the core principles of quantum mechanics?',
    author: 'Albert E.',
    avatarUrl: 'https://placehold.co/100x100.png',
    topic: 'Physics',
    content: 'I\'m struggling to grasp the fundamental concepts of quantum mechanics for my PHYS-201 class. Can someone explain the principles of superposition and entanglement in simple terms? Also, how do they differ from classical physics?',
    timestamp: '2 days ago',
    answers: [
      {
        id: 'a1',
        author: 'Niels B.',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'Superposition is the idea that a particle can be in multiple states at once until it\'s measured. Think of a spinning coin: it\'s both heads and tails until it lands. Entanglement is when two particles are linked, and the state of one instantly affects the other, no matter the distance. Einstein called it "spooky action at a distance."',
        upvotes: 28,
        timestamp: '2 days ago',
      },
      {
        id: 'a2',
        author: 'Marie C.',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'A key difference from classical physics is determinism. In classical mechanics, if you know the initial conditions, you can predict the outcome perfectly. In quantum mechanics, you can only predict the probability of different outcomes. It\'s fundamentally probabilistic.',
        upvotes: 15,
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: '2',
    title: 'How does photosynthesis work at a chemical level?',
    author: 'Jane G.',
    avatarUrl: 'https://placehold.co/100x100.png',
    topic: 'Biology',
    content: 'Can someone break down the light-dependent and light-independent reactions in photosynthesis? I need to understand the inputs and outputs of each stage for my biology exam.',
    timestamp: '5 days ago',
    answers: [
       {
        id: 'a3',
        author: 'Gregor M.',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'The light-dependent reactions use light energy to make two molecules needed for the next stage of photosynthesis: ATP and NADPH. These reactions take place in the thylakoid membranes of organelles called chloroplasts. Water is used and oxygen is produced as a byproduct.',
        upvotes: 19,
        timestamp: '4 days ago',
      },
      {
        id: 'a4',
        author: 'Fiona Garcia',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'To add to that, the light-independent reactions (or Calvin Cycle) use the ATP and NADPH to convert CO2 into glucose. This happens in the stroma of the chloroplasts. It\'s a cycle because the starting materials are regenerated.',
        upvotes: 12,
        timestamp: '3 days ago',
      }
    ],
  },
  {
    id: '3',
    title: 'What are the main causes of the fall of the Roman Empire?',
    author: 'Edward G.',
    avatarUrl: 'https://placehold.co/100x100.png',
    topic: 'History',
    content: 'Historians debate the exact causes, but what are the most widely accepted theories for the collapse of the Western Roman Empire? I\'m looking for factors beyond just "barbarian invasions."',
    timestamp: '1 week ago',
    answers: [
      {
        id: 'a5',
        author: 'Mary B.',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'It\'s a complex issue with no single cause. Key factors include political instability (a rapid succession of weak emperors), economic troubles (over-reliance on slave labor, inflation), overexpansion and military overspending, and the rise of the Eastern Empire, which shifted power and resources away from the West.',
        upvotes: 42,
        timestamp: '6 days ago',
      },
    ],
  },
    {
    id: '4',
    title: 'How do you implement a linked list in Java?',
    author: 'Fiona Garcia',
    avatarUrl: 'https://placehold.co/100x100.png',
    topic: 'Computer Science',
    content: 'I\'m preparing for a technical interview and need a refresher on data structures. Can someone provide a simple implementation of a singly linked list in Java, with methods for adding and removing nodes?',
    timestamp: '3 days ago',
    answers: [],
  }
];

export const findQuestionById = (id: string) => questions.find(q => q.id === id);

export const students: Student[] = [
    { id: 's1', name: 'Alice Johnson', avatarUrl: 'https://placehold.co/100x100.png', major: 'Computer Science', year: 3, isOnline: true },
    { id: 's2', name: 'Bob Williams', avatarUrl: 'https://placehold.co/100x100.png', major: 'Physics', year: 2, isOnline: false },
    { id: 's3', name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png', major: 'History', year: 4, isOnline: true },
    { id: 's4', name: 'Diana Miller', avatarUrl: 'https://placehold.co/100x100.png', major: 'Biology', year: 1, isOnline: true },
    { id: 's5', name: 'Ethan Davis', avatarUrl: 'https://placehold.co/100x100.png', major: 'Business', year: 3, isOnline: false },
    { id: 's6', name: 'Fiona Garcia', avatarUrl: 'https://placehold.co/100x100.png', major: 'Computer Science', year: 4, isOnline: true },
    { id: 's7', name: 'George Rodriguez', avatarUrl: 'https://placehold.co/100x100.png', major: 'Mathematics', year: 2, isOnline: false },
    { id: 's8', name: 'Hannah Wilson', avatarUrl: 'https://placehold.co/100x100.png', major: 'Physics', year: 1, isOnline: true },
    { id: 's9', name: 'Ian Martinez', avatarUrl: 'https://placehold.co/100x100.png', major: 'History', year: 2, isOnline: false },
    { id: 's10', name: 'Jessica Lee', avatarUrl: 'https://placehold.co/100x100.png', major: 'Biology', year: 4, isOnline: true },
];
