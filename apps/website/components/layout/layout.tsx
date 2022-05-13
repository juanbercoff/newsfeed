//import AccountTopBar from './account-top-bar';
import { ReactNode } from 'react';
import TopBar from '../top-bar/top-bar';

type AccountLayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: AccountLayoutProps) => {
  return (
    <>
      <TopBar />
      <div className="mt-[70px] w-full justify-center flex bg-slate-50 min-h-screen">
        <div className="max-w-2xl sm:max-w-3xl w-full">{children}</div>
      </div>
    </>
  );
};

export default Layout;
