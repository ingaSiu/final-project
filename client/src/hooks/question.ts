import { deleteQuestion, editQuestion, getQuestions, postQuestion } from '../api/questions';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SESSION_KEY } from '../settings';

const QUESTIONS = 'QUESTIONS';

export const useQuestions = () => {
  return useQuery([QUESTIONS, localStorage.getItem(SESSION_KEY)], getQuestions);
};

export const usePostQuestion = () => {
  return useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      console.log('Question created succesfully');
    },
    onError: () => {
      console.log('Error then creating question');
    },
  });
};

export const useEditQuestion = () => {
  return useMutation({
    mutationFn: editQuestion,
    onSuccess: () => {
      console.log('Question edited succesfully');
    },
    onError: () => {
      console.log('Error then editing question');
    },
  });
};

export const useDeleteQuestion = () => {
  return useMutation(deleteQuestion);
};
