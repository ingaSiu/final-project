import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import { generatePath, useNavigate } from 'react-router-dom';
import { useEditQuestion, usePostQuestion } from '../../hooks/question';

import Button from '../../components/Button/Button';
import FormikInput from '../../components/Formik/FormikInput';
import FormikTextArea from '../../components/Formik/FormikTextarea';
import { NewQuestion } from '../../types/question';
import { QUESTION_PAGE_PATH } from '../../routes/consts';
import { requiredField } from '../../const/validation';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

const initialValues: QuestionFormProps = {
  title: '',
  question: '',
};

const validationSchema: Yup.ObjectSchema<NewQuestion> = Yup.object().shape({
  title: Yup.string().required(requiredField),
  question: Yup.string().required(requiredField),
});

type QuestionFormProps = {
  title?: string;
  question?: string;
  id?: string;
};

const AddQuestionForm = ({ title, question, id }: QuestionFormProps) => {
  const { mutateAsync: createPost } = usePostQuestion();
  const navigate = useNavigate();
  const { mutateAsync: EditQuestion } = useEditQuestion();

  const handleSubmit = (values: QuestionFormProps) => {
    if (id) {
      EditQuestion({ ...values, id: id })
        .then((response) => {
          console.log(response);
          toast.success('Question edited successfully');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error('Session ended');
          }
          console.error('Failed to edit question');
          toast.error('Failed to edit question');
        });
    } else {
      createPost(values)
        .then((response) => {
          console.log(response);
          toast.success('Question created successfully');
          const path = generatePath(QUESTION_PAGE_PATH, {
            questionId: response.insertedId ? response.insertedId : null,
          });
          navigate(path);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error('Session ended');
          }
          console.error('Failed to create question');
          toast.error('Failed to create question');
        });
    }
  };

  if (title || question) {
    initialValues.title = title ? title : '';
    initialValues.question = question ? question : '';
  }

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
  max-height: 900px;
  width: 100%;
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
