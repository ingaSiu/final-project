import { Question } from '../../types/question';
import QuestionBoard from '../../components/QuestionBoard/QuestionBoard';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { date } from '../../utils/date';
import styled from 'styled-components';
import { useQuestions } from '../../hooks/question';

const Home = () => {
  const { data } = useQuestions();
  const questions = data || [];

  return (
    <>
      <QuestionBoard title="All questions"></QuestionBoard>
      <CardWrapper>
        {questions.map((question: Question) => (
          <QuestionCard
            key={question._id}
            questionId={question._id}
            title={question.title}
            answerCount={question.answerCount}
            username={question.username}
            createdAt={date(question.createdAt)}
          />
        ))}
      </CardWrapper>
    </>
  );
};

export default Home;

const CardWrapper = styled.div`
  display: flex;
  margin: 50px;
`;
