import { DarkModeContext } from './DarkModeContext';
import { useLocalStorage } from 'hooks';
import type { FC } from 'react';
import React, { useEffect } from 'react';

type DarkModeProviderTypes = {
  children: React.ReactNode;
};

export const DarkModeProvider: FC<DarkModeProviderTypes> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(
    () => () => {
      const theme = window.localStorage.getItem('theme');

      setTheme(theme === ('light' || 'dark') ? theme : 'light');
    },
    []
  );

  return (
    <DarkModeContext.Provider
      value={{
        theme,
        changeTheme
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
