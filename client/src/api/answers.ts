import { Answer } from '../types/answer';
import { BASE_URL } from './baseApi';
import { SESSION_KEY } from '../settings';
import httpClient from './httpClient';

export const postAnswer = ({ answer, questionId }: Answer) => {
  return httpClient
    .post(`${BASE_URL}question/${questionId}/answers`, { answer })
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

type EditedAnswer = {
  id: string;
  answer: string;
};

export const editAnswer = ({ id, answer }: EditedAnswer) => {
  return httpClient
    .put(`${BASE_URL}answer/${id}`, { answer })
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

export const deleteAnswer = (id: number) => {
  return httpClient.delete(`${BASE_URL}answer/${id}`).then((response) => {
    return console.log('Question was succesfully deleted', response);
  });
};

type RatedAnswer = {
  answerId: string;
  rating: number;
};

export const rateAnswer = ({ answerId, rating }: RatedAnswer) => {
  return httpClient
    .post(`${BASE_URL}rate/answers/${answerId}`, { rating })
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
