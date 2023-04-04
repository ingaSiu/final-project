import LoginForm from './LoginForm';
import cats from '../../assets/cats.png';
import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <div>
          <img src={cats} alt="Picture of cats" />
        </div>
        <Details>
          <PageTitle>Login here!</PageTitle>
          <LoginForm />
        </Details>
      </Wrapper>
    </Container>
  );
};

export default Login;
const Wrapper = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 90vh;
`;
const PageTitle = styled.p`
  text-align: center;

  font-size: 40px;
  font-weight: 600;
`;

const Details = styled.div`
  padding: 50px;
`;
