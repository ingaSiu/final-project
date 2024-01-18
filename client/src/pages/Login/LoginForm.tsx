import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import Button from '../../components/Button/Button';
import FormikInput from '../../components/Formik/FormikInput';
import { HOME_PATH } from '../../routes/consts';
import { User } from '../../types/user';
import { UserContext } from '../../context/UserContext';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { useLogin } from '../../hooks/login';
import { useNavigate } from 'react-router-dom';

const validationSchema: Yup.ObjectSchema<User> = Yup.object().shape({
  username: Yup.string().required(requiredField),
  password: Yup.string().required(requiredField),
});

const initialValues: User = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const { mutateAsync: login } = useLogin();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (values: User) => {
    try {
      const response = await login(values);
      setUser(response);
      navigate(HOME_PATH);
      toast.success('Successfully logged in!');
    } catch {
      toast.error('Failed to login:');
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <StyledForm>
          <InputRow>
            <InputRowItem>
              <FormikInput name="username" placeholder="Username" />
            </InputRowItem>
          </InputRow>
          <InputRow>
            <InputRowItem>
              <FormikInput type="password" name="password" placeholder="Password" />
            </InputRowItem>
          </InputRow>
          <InputRow>
            <Button type="submit" title="Submit" />
          </InputRow>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 32px;

  border-radius: 4px;
  width: 400px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const InputRowItem = styled.div`
  flex: 1;
`;
