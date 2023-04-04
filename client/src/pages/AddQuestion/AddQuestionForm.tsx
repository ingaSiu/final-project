import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import { NewQuestion, Question } from '../../types/question';

import Button from '../../components/Button/Button';
import FormikInput from '../../components/Formik/FormikInput';
import FormikTextArea from '../../components/Formik/FormikTextarea';
import { MainGreen } from '../../const/styles';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { usePostQuestion } from '../../hooks/question';

const initialValues: Question = {
  title: '',
  question: '',
};

type FormikFormProps = {
  resetForm: () => void;
};
const validationSchema: Yup.ObjectSchema<NewQuestion> = Yup.object().shape({
  title: Yup.string().required(requiredField),
  question: Yup.string().required(requiredField),
});

const AddQuestionForm = () => {
  const { mutateAsync: createPost } = usePostQuestion();
  const navigate = useNavigate();

  // after submitting navigate to the written question page

  const handleSubmit = (values: Question, { resetForm }: FormikFormProps) => {
    createPost(values)
      .then((response) => {
        console.log(response);
        toast.success('Question created successfully');
        //TODO change with variable
        navigate('/question/' + response.insertedId);
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
            <FormikInput name="title" placeholder="Write title" />

            <InputRow>
              <FormikTextArea type="text" name="question" placeholder="Write a question" />
            </InputRow>
            <InputRow>
              <Button type="submit" title="Submit" />
            </InputRow>
          </StyledForm>
        </StyledFormContainer>
      )}
    </Formik>
  );
};

export default AddQuestionForm;

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
