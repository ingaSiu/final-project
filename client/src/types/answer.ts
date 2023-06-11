export type Answer = {
  _id?: string;
  answer: string;
  rating?: number;
  liked?: number;
  username?: string;
  createdAt?: number;
  updatedAt?: number | null;
  userId?: string;
  questionId?: string;
};

export type NewAnswer = {
  answer: string;
};
