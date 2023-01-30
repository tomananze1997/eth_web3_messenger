import type { Context } from 'react';
import { createContext } from 'react';

type DarkModeContextType = {
  theme: string;
  changeTheme: () => void;
};

export const DarkModeContext: Context<DarkModeContextType> = createContext({
  theme: 'light',
  changeTheme: () => '' as any
});
