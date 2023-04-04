import AddAnswerForm from './AddAnswerForm';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuestion } from '../../hooks/question';

const QuestionPage = () => {
  const { questionId } = useParams();

  const { data: questionData } = useQuestion(questionId ? questionId : '');
  console.log(questionData);
  return (
    <div>
      {questionData && (
        <div>
          <Wrapper>
            <Title>{questionData.title}</Title>
            <QuestionText>{questionData.question}</QuestionText>
            <UserInfo>
              <Username>{questionData.username}</Username>
              <CreatedAt>{questionData.createdAt}</CreatedAt>
            </UserInfo>
          </Wrapper>

          <div>
            <p>Total answers: {questionData.answersCount}</p>
          </div>
          <AnswerWrapper>
            <Answer>text text tex</Answer>
            <UserInfo>
              <Username>{questionData.username}</Username>
              <CreatedAt>{questionData.createdAt}</CreatedAt>
            </UserInfo>
          </AnswerWrapper>
        </div>
      )}

      <AddAnswerForm />
    </div>
  );
};

export default QuestionPage;

const Wrapper = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  width: 700px;
`;

const AnswerWrapper = styled.div`
  padding: 10px;
  border: 1px solid black;
`;

const Answer = styled.div`
  font-size: 20px;
`;

const Title = styled.p`
  font-size: 15px;
`;
const UserInfo = styled.div`
  display: flex;
`;
const Username = styled.p`
  font-size: 15px;
`;

const CreatedAt = styled.p`
  font-size: 15px;
`;
const QuestionText = styled.p`
  font-size: 15px;
`;
