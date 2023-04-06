import { QUESTIONS_KEY, QUESTION_KEY } from './question';
import { deleteAnswer, editAnswer, postAnswer, rateAnswer } from '../api/answers';

import { queryClient } from '../main';
import { useMutation } from '@tanstack/react-query';

export const usePostAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
    onSuccess: () => {
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
  return useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Answer deleted succesfully');
    },
    onError: () => {
      console.log('Error then deleted answer');
    },
  });
};

export const useRateAnswer = () => {
  return useMutation({
    mutationFn: rateAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Answer rated succesfully');
    },
    onError: () => {
      console.log('Error when rating answer');
    },
  });
};
