import { Brown } from '../../const/styles';
import styled from 'styled-components';

type ButtonProps = {
  onClick?: () => void;
  title: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ onClick, title, type }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {title}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  font-size: 20px;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  outline: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  color: ${Brown};

`;
