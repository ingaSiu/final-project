import { Answer } from './answer';

export type Question = {
  _id?: string;
  title: string;
  question: string;
  userId?: string;
  createdAt?: number | string;
  updatedAt?: null | number;
  username?: string;
  answersCount?: number;
};

export type QuestionWithAnswers = Question & Answer[];

export type NewQuestion = {
  title: string;
  question: string;
};
