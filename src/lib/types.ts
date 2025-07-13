export type Answer = {
  id: string;
  author: string;
  avatarUrl: string;
  content: string;
  upvotes: number;
  timestamp: string;
};

export type Question = {
  id: string;
  title: string;
  author: string;
  avatarUrl: string;
  topic: string;
  content: string;
  timestamp: string;
  answers: Answer[];
};

export type Student = {
  id: string;
  name: string;
  avatarUrl: string;
  major: string;
  year: number;
  isOnline: boolean;
};
