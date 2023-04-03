import NavBar from '../components/NavBar/NavBar';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
