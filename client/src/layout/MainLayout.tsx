import { ReactNode, useContext } from 'react';

import NavBar from '../components/NavBar/NavBar';
import { UserContext } from '../context/UserContext';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { getDecodedUser } = useContext(UserContext);
  //can get userId and username from this object
  const user = getDecodedUser();
  return (
    <>
      <NavBar username={user ? user.username : ''} />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
