import { deleteQuestion, editQuestion, getQuestionWithAnswers, getQuestions, postQuestion } from '../api/questions';
import { useMutation, useQuery } from '@tanstack/react-query';

import { GetProps } from '../api/questions';
import { SESSION_KEY } from '../settings';
import { queryClient } from '../main';

export const QUESTIONS_KEY = 'QUESTIONS';
export const QUESTION_KEY = 'QUESTION';

export const useQuestions = ({ sortDate, sortAnswer, answeredFilter }: GetProps) => {
  return useQuery({
    queryKey: [QUESTIONS_KEY, sortDate, sortAnswer, answeredFilter],
    queryFn: getQuestions,
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: [QUESTION_KEY, id],
    queryFn: getQuestionWithAnswers,
  });
};

export const usePostQuestion = () => {
  return useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
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
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Question edited succesfully');
    },
    onError: () => {
      console.log('Error then editing question');
    },
  });
};

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUESTION_KEY] });
      console.log('Question deleted succesfully');
    },
    onError: () => {
      console.log('Error then deleted question');
    },
  });
};
