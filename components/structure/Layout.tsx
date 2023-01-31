import classNames from 'classnames';
import { useDarkModeContext } from 'providers';
import type { FC, ReactNode } from 'react';

type LayoutTypes = {
  children: ReactNode;
};

export const Layout: FC<LayoutTypes> = ({ children }) => {
  const [theme] = useDarkModeContext();

  return (
    <>
      <main className={classNames({ dark: theme === 'dark' }, 'h-screen')}>
        <div
          className={
            'flex h-full flex-col bg-blue-100 font-nunito text-blue-charcoal-900 dark:bg-slate-900 dark:text-blue-charcoal-50'
          }
        >
          {children}
        </div>
      </main>
    </>
  );
};
