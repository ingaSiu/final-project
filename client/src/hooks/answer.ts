import { deleteAnswer, editAnswer, postAnswer } from '../api/answers';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SESSION_KEY } from '../settings';

const ANSWERS = 'ANSWERS';

export const usePostAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
    onSuccess: () => {
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
      console.log('Answer edited succesfully');
    },
    onError: () => {
      console.log('Error then editing answer');
    },
  });
};

export const useDeleteAnswer = () => {
  return useMutation(deleteAnswer);
};
