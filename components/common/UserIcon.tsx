import classNames from 'classnames';
import { useDarkModeContext, useSelectedContent } from 'providers';
import type { FC } from 'react';
import type { OtherUserType } from 'types';

type UserIconTypes = {
  user: OtherUserType;
  otherStyles?: string;
};

export const UserIcon: FC<UserIconTypes> = ({ user, otherStyles }) => {
  const [theme] = useDarkModeContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, setActiveInfoContent] = useSelectedContent();

  const handleClick = () => {
    setActiveInfoContent(user);
  };

  return (
    <>
      <span
        onClick={handleClick}
        style={{
          background: `${theme === 'light' ? user.lightColor : user.darkColor}`
        }}
        className={classNames(
          'inline-block h-7 w-7 cursor-pointer rounded-full text-center text-xs font-bold leading-7 hover:scale-105 sm:h-8 sm:w-8 sm:text-sm sm:leading-8 sm:hover:scale-110 lg:h-9 lg:w-9 lg:text-base lg:leading-9',
          otherStyles
        )}
      >
        {user.username.slice(0, 1).toUpperCase()}
      </span>
      <div />
    </>
  );
};
