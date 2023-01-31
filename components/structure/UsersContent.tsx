import Switch from '@mui/material/Switch';
import classNames from 'classnames';
import { useDarkModeContext } from 'providers';
import type { FC } from 'react';
import { FaSun } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';

export const UsersContent: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, toggleTheme] = useDarkModeContext();
  return (
    <>
      <section
        className={
          'flex h-full w-full flex-col break-words pt-10 shadow-2xl dark:bg-slate-800'
        }
      >
        <div className={'mx-auto'}>
          <Switch
            icon={
              <FaSun
                className={
                  '-translate-y-0.5 -translate-x-1 text-2xl text-black'
                }
              />
            }
            checkedIcon={
              <MdDarkMode className={' -translate-y-0.5 text-2xl'} />
            }
            color={'default'}
            className={'w-14'}
            onClick={toggleTheme}
          />
          <span
            className={classNames(
              'text-sm sm:text-base md:text-sm lg:text-base',
              {
                'opacity-50': theme === 'light'
              }
            )}
          >
            Dark mode is {theme === 'dark' ? 'on' : 'off'}
          </span>
        </div>
        <div className={'pt-3.5'} />
        <h1> Test </h1>
      </section>
    </>
  );
};
