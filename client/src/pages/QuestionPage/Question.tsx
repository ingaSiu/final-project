import styled from 'styled-components';

type QuestionProps = {
  title: string;
  username: string | undefined;
  question: string;
  createdAt: number | undefined;
};

const Question = ({ title, question, username, createdAt }: QuestionProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <QuestionText>{question}</QuestionText>
      <UserInfo>
        <Username>{username}</Username>
        <CreatedAt>{createdAt}</CreatedAt>
      </UserInfo>
    </Wrapper>
  );
};

export default Question;

const Wrapper = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
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
