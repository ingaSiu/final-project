import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from '../../routes/consts';

import Button from '../Button/Button';
import { FaCat } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type NavbarProps = {
  username: string;
};

const NavBar = ({ username }: NavbarProps) => {
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
            <Greeting>Hello, {username}</Greeting>

            <Button title="Log out" onClick={handleLogOut} />
          </ItemsContainerUser>
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
  justify-content: center;
`;

const ItemsContainerUser = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-around;
  width: 30%;
`;

const IconContainer = styled.div`
  display: flex;
  font-size: 30px;
  cursor: pointer;
`;

const Greeting = styled.p`
  font-size: 30px;
`;

const IconText = styled.span`
  font-weight: 700;
`;
