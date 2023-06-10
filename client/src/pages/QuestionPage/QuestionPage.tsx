import { useContext, useState } from 'react';
import { useDeleteAnswer, useRateAnswer } from '../../hooks/answer';
import { useDeleteQuestion, useQuestion } from '../../hooks/question';
import { useNavigate, useParams } from 'react-router-dom';

import AddAnswerForm from './AddAnswerForm';
import AddQuestionForm from '../AddQuestion/AddQuestionForm';
import { BsArrowDownCircle } from 'react-icons/bs';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { BsArrowUpCircle } from 'react-icons/bs';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { HOME_PATH } from '../../routes/consts';
import { UserContext } from '../../context/UserContext';
import { date } from '../../utils/date';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const QuestionPage = () => {
  const { questionId } = useParams();

  const { data: questionData } = useQuestion(questionId ? questionId : '');
  console.log(questionData);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editedAnswers, setEditedAnswers] = useState([]);

  const navigate = useNavigate();
  const { mutateAsync: deleteAnswer } = useDeleteAnswer();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const { mutateAsync: rateAnswer } = useRateAnswer();
  const { getDecodedUser } = useContext(UserContext);
  const user = getDecodedUser();
  const userId = user ? user.userId : null;

  const handleDeleteAnswer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Answer?')) {
      deleteAnswer(id)
        .then(() => {
          toast.success('Selected answer was deleted succesfully!');
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Post?')) {
      deleteQuestion(id)
        .then(() => {
          navigate(HOME_PATH);
          toast.success('Selected post was deleted succesfully!');
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEditAnswer = (id: string) => {
    const answerIsEdited = editedAnswers.find((answerId) => answerId === id);
    const newEditedArr = answerIsEdited ? editedAnswers.filter((answerId) => answerId !== id) : [...editedAnswers, id];
    setEditedAnswers(newEditedArr);
  };

  return (
    <Container>
      {questionData && (
        <div>
          <Wrapper>
            <QuestionTitle>{questionData.title}</QuestionTitle>

            <TextField>{questionData.question}</TextField>

            {editQuestion && (
              <AddQuestionForm title={questionData.title} question={questionData.question} id={questionData._id} />
            )}

            <UserInfo>
              {userId === questionData.userId && (
                <BtnContainer>
                  <StyledBtn onClick={() => setEditQuestion(!editQuestion)}>
                    {editQuestion ? 'Cancel editing' : 'Edit question'}
                  </StyledBtn>
                  <StyledBtn onClick={() => handleDeleteQuestion(questionData._id)}>Delete post</StyledBtn>
                </BtnContainer>
              )}
              {questionData.updatedAt && <Username>Edited: {date(questionData.updatedAt)}</Username>}

              <Username>
                Posted by: {questionData.username} at:
                {date(questionData.createdAt)}
              </Username>
            </UserInfo>
          </Wrapper>

          <div>
            <InfoText>Total answers: {questionData.answersCount}</InfoText>
          </div>

          {questionData.answers.map((item) => (
            <AnswerWrapper key={item._id}>
              <AnswerContainer>
                <IconsWrapper>
                  {item.liked === 1 ? (
                    <BsArrowUpCircleFill onClick={() => rateAnswer({ answerId: item._id, rating: 1 })} />
                  ) : (
                    <BsArrowUpCircle onClick={() => rateAnswer({ answerId: item._id, rating: 1 })} />
                  )}

                  <RatingCount>{item.rating}</RatingCount>
                  {item.liked === -1 ? (
                    <BsArrowDownCircleFill onClick={() => rateAnswer({ answerId: item._id, rating: -1 })} />
                  ) : (
                    <BsArrowDownCircle onClick={() => rateAnswer({ answerId: item._id, rating: -1 })} />
                  )}
                </IconsWrapper>

                <TextField>{item.answer}</TextField>
              </AnswerContainer>
              {editedAnswers.find((editedAnswer) => editedAnswer === item._id) && (
                <AddAnswerForm answer={item.answer} answerId={item._id} questionId={questionData._id} />
              )}

              <UserInfo>
                {userId === item.userId && (
                  <BtnContainer>
                    <StyledBtn onClick={() => handleEditAnswer(item._id)}>
                      {editedAnswers.find((editedAnswer) => editedAnswer === item._id)
                        ? 'Cancel editing'
                        : 'Edit answer'}
                    </StyledBtn>
                    <StyledBtn onClick={() => handleDeleteAnswer(item._id)}>Delete answer</StyledBtn>
                  </BtnContainer>
                )}

                <Username>
                  Posted by: {item.username} at: {date(item.createdAt)}
                </Username>
              </UserInfo>
            </AnswerWrapper>
          ))}
        </div>
      )}

      <InfoText>Know how to solve this problem? </InfoText>
      <AddAnswerForm questionId={questionId ? questionId : ''} />
    </Container>
  );
};

export default QuestionPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  width: 700px;
`;

const AnswerWrapper = styled.div`
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const QuestionTitle = styled.p`
  text-transform: uppercase;
  font-size: 24px;
  padding: 16px;
`;

const TextField = styled.div`
  font-size: 24px;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  max-width: 550px;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;
const Username = styled.p`
  font-size: 16px;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledBtn = styled.button`
  border: none;
  background-color: inherit;

  font-size: 16px;
  cursor: pointer;
`;

const InfoText = styled.p`
  font-size: 24px;
  padding: 24px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    font-size: 30px;
    cursor: pointer;
  }
`;

const RatingCount = styled.div`
  font-size: 24px;
  margin-left: 8px;
`;

const AnswerContainer = styled.div`
  display: flex;
`;
