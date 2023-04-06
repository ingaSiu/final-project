import RegisterForm from './RegisterForm';
import cats from '../../assets/cats.png';
import styled from 'styled-components';

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Details>
          <PageTitle>Create Account</PageTitle>
          <RegisterForm />
        </Details>
        <div>
          <img src={cats} alt="Picture of cats" />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Register;

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
