import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import { HOME_PATH, LOGIN_PATH } from '../../routes/consts';

import Button from '../../components/Button/Button';
import FormikInput from '../../components/Formik/FormikInput';
import { MainGreen } from '../../const/styles';
import { User } from '../../types/user';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/register';

const initialValues: User = {
  username: '',
  password: '',
};

const validationSchema: Yup.ObjectSchema<User> = Yup.object().shape({
  username: Yup.string().required(requiredField),
  password: Yup.string().required(requiredField),
  confirmPassword: Yup.string()
    .required(requiredField)
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const RegisterForm = () => {
  const { mutateAsync: createUser } = useRegister();

  const navigate = useNavigate();

  const handleSubmit = (values: User) => {
    toast('Registration successfull!');

    createUser(values)
      .then(() => {
        toast.success('Register successfully');

        navigate(LOGIN_PATH);
      })
      .catch(() => {
        console.error('Failed to register');
        toast.error('Failed to register');
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <StyledFormContainer>
          <StyledForm>
            <InputRow>
              <InputRowItem>
                <FormikInput name="username" placeholder="Your username" />
              </InputRowItem>
            </InputRow>

            <InputRow>
              <InputRowItem>
                <FormikInput type="password" name="password" placeholder="Password" />
              </InputRowItem>
            </InputRow>

            <InputRow>
              <InputRowItem>
                <FormikInput type="password" name="confirmPassword" placeholder="Repeat password" />
              </InputRowItem>
            </InputRow>

            <InputRow>
              <Button type="submit" title="Register" />
            </InputRow>
          </StyledForm>
        </StyledFormContainer>
      )}
    </Formik>
  );
};

export default RegisterForm;

const StyledFormContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 32px;
  border: 1px solid ${MainGreen};
  border-radius: 4px;
  width: 500px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const InputRowItem = styled.div`
  flex: 1;
`;
