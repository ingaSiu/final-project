import * as Yup from 'yup';

import { Answer, NewAnswer } from '../../types/answer';
import { Form, Formik } from 'formik';

import Button from '../../components/Button/Button';
import FormikTextArea from '../../components/Formik/FormikTextarea';
import { LOGIN_PATH } from '../../routes/consts';
import { UserContext } from '../../context/UserContext';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { useEditAnswer } from '../../hooks/answer';
import { useNavigate } from 'react-router-dom';
import { usePostAnswer } from '../../hooks/answer';

type FormikFormProps = {
  resetForm: () => void;
};
const validationSchema: Yup.ObjectSchema<NewAnswer> = Yup.object().shape({
  answer: Yup.string().required(requiredField),
});

type AnswerForm = {
  questionId: string;
  answer?: string;
  answerId?: string;
};

const AddAnswerForm = ({ questionId, answer, answerId }: AnswerForm) => {
  const initialValues: Answer = {
    answer: '',
  };
  const { mutateAsync: createAnswer } = usePostAnswer();
  const { mutateAsync: editAnswer } = useEditAnswer();

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const handleSubmit = (values: Answer, { resetForm }: FormikFormProps) => {
    if (!isLoggedIn) {
      return navigate(LOGIN_PATH);
    }
    if (answerId) {
      const answerValues = { ...values, id: answerId };
      editAnswer(answerValues)
        .then((response) => {
          console.log(response);
          resetForm();
          toast.success('Answer edited successfully');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error('Session ended');
          }
          console.error('Failed to edit answer');
          toast.error('Failed to edit answer');
        });
    } else {
      const answerValues = { ...values, questionId: questionId };

      createAnswer(answerValues)
        .then((response) => {
          console.log(response);
          resetForm();
          toast.success('Answer created successfully');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error('Session ended');
          }
          console.error('Failed to create answer');
          toast.error('Failed to create answer');
        });
    }
  };

  if (answer) {
    initialValues.answer = answer ? answer : '';
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <StyledFormContainer>
          <StyledForm>
            <FormikTextArea type="text" name="answer" placeholder="Write an answer" />

            <InputRow>
              <Button type="submit" title="Submit answer" />
            </InputRow>
          </StyledForm>
        </StyledFormContainer>
      )}
    </Formik>
  );
};

export default AddAnswerForm;

const StyledFormContainer = styled.div`
  max-height: 900px;
  width: 40%;
  overflow-y: auto;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  justify-content: center;
  padding: 32px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;
