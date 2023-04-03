import { Question, QuestionWithAnswers } from '../types/question';

import { BASE_URL } from './baseApi';
import { SESSION_KEY } from '../settings';
import httpClient from './httpClient';

export const getQuestions = (): Promise<Question[]> => {
  return httpClient
    .get(`${BASE_URL}questions`)
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

export const getQuestionWithAnswers = ({ _id: id }: QuestionWithAnswers): Promise<QuestionWithAnswers> => {
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

export const postQuestion = ({ title, question }: Question) => {
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
  title: Question;
  question: Question;
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

export const deleteQuestion = (id: number) => {
  return httpClient.delete(`${BASE_URL}question/${id}`).then((response) => {
    return console.log('Question was succesfully deleted');
  });
};
