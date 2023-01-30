import type { FC, ReactNode } from 'react';

type LayoutTypes = {
  children: ReactNode;
};

export const Layout: FC<LayoutTypes> = ({ children }) => (
  <>
    <main
      className={'flex h-screen flex-col bg-slate-900 font-nunito text-white'}
    >
      {children}
    </main>
  </>
);
