import AddQuestionForm from './AddQuestionForm';
import cat_question from '../../assets/cat_question.jpg';
import styled from 'styled-components';

const AddQuestion = () => {
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
  /* flex-wrap: wrap; */
`;

const Title = styled.p`
  font-size: 40px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100vw
  height: 90vh;
  align-items: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
