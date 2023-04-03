import { PropsWithChildren, createContext } from 'react';

import { LOGIN_PATH } from '../routes/consts';
import { SESSION_KEY } from '../settings';
import { useLocalStorage } from '../hooks/localStorage';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext<{
  user: string | null;
  setUser: any;
  isLoggedIn: boolean;
  handleLogOut: () => void;
}>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  handleLogOut: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage(SESSION_KEY, null);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogOut = () => {
    setUser(null);
    navigate(LOGIN_PATH);
  };

  return <UserContext.Provider value={{ user, isLoggedIn, setUser, handleLogOut }}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
