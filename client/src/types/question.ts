import { Answer } from './answer';

export type Question = {
  _id?: string;
  title: string;
  question: string;
  userId?: string;
  createdAt?: number | string;
  updatedAt?: null | number;
  username?: string;
  answerCount?: number;
};

export type QuestionWithAnswers = Question & Answer[];

export type NewQuestion = {
  title: string;
  question: string;
};
