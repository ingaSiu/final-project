export type Answer = {
  _id?: string;
  answer: string;
  rating: number;
  createdAt: number;
  updatedAt: number | null;
  userId: string;
  questionId: string;
};
