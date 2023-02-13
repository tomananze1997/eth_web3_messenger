import type { Context } from 'react';
import { createContext } from 'react';

type DarkModeContextTypes = {
  theme: string;
  changeTheme: () => void;
};

export const DarkModeContext: Context<DarkModeContextTypes> =
  createContext<DarkModeContextTypes>({
    theme: 'light',
    changeTheme: () => ''
  });
