import { BASE_URL } from './baseApi';
import { User } from '../types/user';
import httpClient from './httpClient';

export const login = ({ username, password }: User): Promise<User> => {
  return httpClient
    .post(`${BASE_URL}login`, { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.data);
      console.log(error.response.headers);
      throw error;
    });
};
