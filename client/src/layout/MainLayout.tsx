import { DecodedUser, UserContext } from '../context/UserContext';
import { ReactNode, useContext } from 'react';

import NavBar from '../components/NavBar/NavBar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { getDecodedUser } = useContext(UserContext);
  //can get userId and username from this object
  const user: DecodedUser | null = getDecodedUser();
  return (
    <>
      <NavBar username={user ? user.username : ''} />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
