import { register } from '../api/register';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log('Register mutation succesful');
    },
  });
};
