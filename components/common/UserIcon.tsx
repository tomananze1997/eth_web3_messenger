import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames';
import { useDarkModeContext } from 'providers';
import type { FC } from 'react';
import type { OtherUserType } from 'types';

type UserIconTypes = {
  user: OtherUserType;
  otherStyles?: string;
};

export const UserIcon: FC<UserIconTypes> = ({ user, otherStyles }) => {
  const [theme] = useDarkModeContext();

  return (
    <>
      <Tooltip title={user.username}>
        <span
          style={{
            background: `${
              theme === 'light' ? user.lightColor : user.darkColor
            }`
          }}
          className={classNames(
            'inline-block h-7 w-7 cursor-pointer rounded-full text-center text-xs font-bold leading-7 hover:scale-105 hover:opacity-80 sm:h-8 sm:w-8 sm:text-sm sm:leading-8 sm:hover:scale-110 lg:h-9 lg:w-9 lg:text-base lg:leading-9',
            otherStyles
          )}
        >
          {user.username.slice(0, 1).toUpperCase()}
        </span>
      </Tooltip>
    </>
  );
};
