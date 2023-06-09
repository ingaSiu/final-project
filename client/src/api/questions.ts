import { Question, QuestionWithAnswers } from '../types/question';

import { BASE_URL } from './baseApi';
import { QueryKey } from '@tanstack/react-query';
import { SESSION_KEY } from '../settings';
import httpClient from './httpClient';

export type GetProps = {
  sortDate?: string | undefined;
  sortAnswer?: string | undefined;
  answeredFilter?: string | undefined;
};

type QueryKeyObj = {
  queryKey: QueryKey;
};

export const getQuestions = ({ queryKey }: QueryKeyObj): Promise<Question[]> => {
  const sortDate = queryKey[1];
  const sortAnswer = queryKey[2];
  const answeredFilter = queryKey[3];

  return httpClient
    .get(`${BASE_URL}questions`, {
      params: {
        sortDate: sortDate ? sortDate : null,
        sortAnswer: sortAnswer ? sortAnswer : null,
        answeredFilter: answeredFilter ? answeredFilter : null,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(SESSION_KEY);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      throw error;
    });
};

export const getQuestionWithAnswers = ({ queryKey }: QueryKeyObj): Promise<QuestionWithAnswers> => {
  const id = queryKey[1];

  return httpClient
    .get(`${BASE_URL}questions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(SESSION_KEY);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      throw error;
    });
};

type CreateQuestionProps = {
  title: string;
  question: string;
};

export const postQuestion = ({ title, question }: CreateQuestionProps) => {
  return httpClient
    .post(`${BASE_URL}question`, { title, question })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(SESSION_KEY);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      throw error;
    });
};

type EditedQuestion = {
  id: string;
  title: string;
  question: string;
};

export const editQuestion = ({ id, title, question }: EditedQuestion) => {
  return httpClient
    .put(`${BASE_URL}question/${id}`, { title, question })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(SESSION_KEY);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      throw error;
    });
};

export const deleteQuestion = (id: string) => {
  return httpClient.delete(`${BASE_URL}question/${id}`).then(() => {
    return console.log('Question was succesfully deleted');
  });
};
