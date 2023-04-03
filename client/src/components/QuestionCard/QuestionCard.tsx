import { Link } from 'react-router-dom';
import { QUESTION_PAGE_PATH } from '../../routes/consts';
import { generatePath } from 'react-router-dom';
import styled from 'styled-components';

type QuestionCardProps = {
  title: string;
  username: string | undefined;
  createdAt: string;
  answerCount: number | undefined;
  questionId: string | undefined;
};

const QuestionCard = ({ title, username, createdAt, answerCount, questionId }: QuestionCardProps) => {
  return (
    <CardWrapper>
      <CountWrapper>
        <Count>{answerCount} answers</Count>
      </CountWrapper>

      <TitleWrapper>
        <Title to={generatePath(QUESTION_PAGE_PATH, { id: questionId ? questionId : null })}>{title}</Title>
      </TitleWrapper>

      <UserWrapper>
        {username}
        asked: {createdAt}
      </UserWrapper>
    </CardWrapper>
  );
};

// to make a link
{
  /* <ButtonLink to={generatePath(RECIPE_PAGE_PATH, { recipeId })}>
        <ButtonMain>Read more →</ButtonMain>
      </ButtonLink> */
}

export default QuestionCard;

const CardWrapper = styled.div`
  padding: 5px;
  border: 1px solid black;
  width: 700px;
`;

const Title = styled(Link)`
  font-size: 20px;
`;
const TitleWrapper = styled.div`
  padding: 5px;
`;

const UserWrapper = styled.div`
  padding: 5px;
`;

const CountWrapper = styled.div`
  padding: 5px;
`;
const Count = styled.div`
  padding: 5px;
`;
