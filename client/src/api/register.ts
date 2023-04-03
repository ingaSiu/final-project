import { BASE_URL } from './baseApi';
import { User } from '../types/user';
import httpClient from './httpClient';

export const register = ({ username, password }: User): Promise<User> => {
  return httpClient
    .post(`${BASE_URL}register`, { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      throw error;
    });
};
