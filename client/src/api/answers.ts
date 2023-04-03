import { Answer } from '../types/answer';
import { BASE_URL } from './baseApi';
import { SESSION_KEY } from '../settings';
import httpClient from './httpClient';

export const postAnswer = ({ answer, questionId: id }: Answer) => {
  return httpClient
    .post(`${BASE_URL}question/${id}`, { answer })
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
