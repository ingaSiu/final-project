import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from '../../routes/consts';

import Button from '../Button/Button';
import { FaCat } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const { handleLogOut, isLoggedIn } = useContext(UserContext);
  return (
    <Wrapper>
      <ItemsContainer>
        <IconContainer onClick={() => navigate(HOME_PATH)}>
          <FaCat />
          Cat<IconText>Overflow</IconText>
        </IconContainer>
      </ItemsContainer>

      {!isLoggedIn && (
        <ItemsContainer>
          <Button title="Login" onClick={() => navigate(LOGIN_PATH)} />
          <Button title="Sign up" onClick={() => navigate(REGISTER_PATH)} />
        </ItemsContainer>
      )}
      {isLoggedIn && (
        <>
          <ItemsContainerUser>
            <Greeting>Hello user</Greeting>
          </ItemsContainerUser>
          <BtnWrapper>
            <Button title="Log out" onClick={handleLogOut} />
          </BtnWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  padding: 5px;
  border-bottom: 1px solid grey;
`;

const ItemsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ItemsContainerUser = styled.div`
  border: 1px solid black;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  font-size: 30px;
  cursor: pointer;
`;

const Greeting = styled.p`
  font-size: 30px;
`;

const BtnWrapper = styled.div`
  /* margin-bottom: 15px; */
`;

const IconText = styled.span`
  font-weight: 700;
`;
