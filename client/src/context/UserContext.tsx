import { PropsWithChildren, createContext } from 'react';

import { LOGIN_PATH } from '../routes/consts';
import { SESSION_KEY } from '../settings';
import jwt from 'jwt-decode';
import { useLocalStorage } from '../hooks/localStorage';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext<{
  user: string | null;
  setUser: any;
  isLoggedIn: boolean;
  handleLogOut: () => void;
  getDecodedUser: () => DecodedUser | null;
}>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogOut: () => {},
  getDecodedUser: () => {
    return null;
  },
});

export type DecodedUser = {
  userId: string;
  username: string;
  // Add other properties if applicable
};
const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage(SESSION_KEY, null);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogOut = () => {
    setUser(null);
    navigate(LOGIN_PATH);
  };

  const getDecodedUser = (): DecodedUser | null => {
    try {
      if (!user) {
        return null;
      }
      const jwtDecoded = jwt(user) as DecodedUser;
      console.log('user info is:');
      console.log(jwtDecoded);
      return jwtDecoded;
    } catch (error) {
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, handleLogOut, getDecodedUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
