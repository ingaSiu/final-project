import { ADD_QUESTION_PATH } from '../../routes/consts';
import Button from '../Button/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type QuestionBoard = {
  title: string;
};

const QuestionBoard = ({ title }: QuestionBoard) => {
  const navigate = useNavigate();
  return (
    <BoardWrapper>
      <Details>
        <Title>{title}</Title>
        <Button title="Ask Question" onClick={() => navigate(ADD_QUESTION_PATH)} />
      </Details>
    </BoardWrapper>
  );
};

export default QuestionBoard;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 30px;
`;
