import { useContext, useEffect } from 'react';

import AddQuestionForm from './AddQuestionForm';
import { LOGIN_PATH } from '../../routes/consts';
import { UserContext } from '../../context/UserContext';
import cat_question from '../../assets/cat_question.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(LOGIN_PATH);
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Wrapper>
        <Details>
          <Title>Got a question?</Title>
          <AddQuestionForm />
        </Details>

        <img src={cat_question} alt="Cat with question" />
      </Wrapper>
    </Container>
  );
};

export default AddQuestion;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 40px;
`;

const Container = styled.div`
  display: flex;

  margin-top: 50px;
  width: 100vw;
  height: 90vh;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
