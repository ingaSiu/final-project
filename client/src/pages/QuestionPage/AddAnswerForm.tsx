import * as Yup from 'yup';

import { Answer, NewAnswer } from '../../types/answer';
import { Form, Formik } from 'formik';

import Button from '../../components/Button/Button';
import FormikTextArea from '../../components/Formik/FormikTextarea';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { usePostAnswer } from '../../hooks/answer';

const initialValues: Answer = {
  answer: '',
};

type FormikFormProps = {
  resetForm: () => void;
};
const validationSchema: Yup.ObjectSchema<NewAnswer> = Yup.object().shape({
  answer: Yup.string().required(requiredField),
});

const AddAnswerForm = () => {
  const { mutateAsync: createAnswer } = usePostAnswer();

  const handleSubmit = (values: Answer, { resetForm }: FormikFormProps) => {
    createAnswer(values)
      .then((response) => {
        console.log(response);
        resetForm();
        toast.success('Answer created successfully');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error('Session ended');
        }
        console.error('Failed to create question');
        toast.error('Failed to create question');
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <StyledFormContainer>
          <StyledForm>
            <InputRow>
              <FormikTextArea type="text" name="answer" placeholder="Write an answer" />
            </InputRow>
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
  max-height: 500px;
  width: 600px;
  overflow-y: auto;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  gap: 16px;
  justify-content: center;
  padding: 32px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
