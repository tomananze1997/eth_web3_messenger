import { DarkModeContext } from './DarkModeContext';
import { useContext } from 'react';

export const useDarkModeContext = () => {
  const { theme, changeTheme } = useContext(DarkModeContext);

  return [theme, changeTheme] as const;
};
