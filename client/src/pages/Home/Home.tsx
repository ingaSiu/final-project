import Button from '../../components/Button/Button';
import { Question } from '../../types/question';
import QuestionBoard from '../../components/QuestionBoard/QuestionBoard';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { date } from '../../utils/date';
import styled from 'styled-components';
import { useQuestions } from '../../hooks/question';
import { useState } from 'react';

const Home = () => {
  const [sortDate, setSortDate] = useState('');
  const [sortAnswer, setSortAnswer] = useState('');
  const [answeredFilter, setAnsweredFilter] = useState('');
  const { data } = useQuestions({ sortDate, sortAnswer, answeredFilter });

  const handleSortDate = () => {
    const sortVal = sortDate === 'dsc' ? 'asc' : 'dsc';
    setSortDate(sortVal);
  };

  const handleSortAnswer = () => {
    const sortVal = sortAnswer === 'dsc' ? 'asc' : 'dsc';
    setSortAnswer(sortVal);
  };

  const handleAnsweredFilter = () => {
    const filterVal = answeredFilter === 'true' ? 'false' : 'true';
    setAnsweredFilter(filterVal);
  };

  const handleClearSorting = () => {
    setSortDate('');
    setSortAnswer('');
    setAnsweredFilter('');
  };

  return (
    <Container>
      <QuestionBoard title="Questions" />
      <SortWrapper>
        <Button title="Sort by question date" onClick={handleSortDate} />
        <Button title="Sort by answers count" onClick={handleSortAnswer} />
        <Button title="Filter by answers count" onClick={handleAnsweredFilter} />
        <Button title="Clear sorting and filter" onClick={handleClearSorting} />
      </SortWrapper>

      <CardWrapper>
        {data &&
          data.map((question: Question) => (
            <QuestionCard
              key={question._id}
              questionId={question._id}
              title={question.title}
              answerCount={question.answersCount}
              username={question.username}
              createdAt={date(question.createdAt)}
            />
          ))}
      </CardWrapper>
    </Container>
  );
};

export default Home;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  gap: 8px;
  width: 50%;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  gap: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
