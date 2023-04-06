import { login } from '../api/login';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('Login mutation succesful');
    },
  });
};
