import { QUESTIONS_KEY, QUESTION_KEY } from './question';
import { deleteAnswer, editAnswer, postAnswer } from '../api/answers';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SESSION_KEY } from '../settings';
import { queryClient } from '../main';

const ANSWERS = 'ANSWERS';

export const usePostAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
    onSuccess: () => {
      //TODO invalidate single question query with answers QUESTION
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Answer created succesfully');
    },
    onError: () => {
      console.log('Error then creating answer');
    },
  });
};

export const useEditAnswer = () => {
  return useMutation({
    mutationFn: editAnswer,
    onSuccess: () => {
      //TODO invalidate single question query with answers QUESTION
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Answer edited succesfully');
    },
    onError: () => {
      console.log('Error then editing answer');
    },
  });
};

export const useDeleteAnswer = () => {
  //TODO invalidate single question query with answers QUESTION
  return useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      //TODO invalidate single question query with answers QUESTION
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Answer deleted succesfully');
    },
    onError: () => {
      console.log('Error then deleted answer');
    },
  });
};
