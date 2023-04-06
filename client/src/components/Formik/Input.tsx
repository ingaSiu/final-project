import { Brown, Purple } from '../../const/styles';

import styled from 'styled-components';

const Input = (props: any) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  font-size: 16px;
  border-radius: 4px;
  color: ${Brown};
  border: 1px solid ${Purple};
  padding: 10px 14px;
  outline: none;
  width: 100%;
`;
