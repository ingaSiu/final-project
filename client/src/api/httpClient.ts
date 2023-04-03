import { SESSION_KEY } from '../settings';
import axios from 'axios';

const httpClient = () => {
  // Create instance
  let instance = axios.create();

  // Set the AUTH token for any request

  instance.interceptors.request.use((config) => {
    let token = localStorage.getItem(SESSION_KEY);
    token = token ? token.replaceAll('"', '') : null;
    config.headers.Authorization = null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default httpClient();
