import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

type CustomButtonTypes = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  otherStyles?: string;
  overwriteStyles?: boolean;
};

export const CustomButton: FC<CustomButtonTypes> = ({
  children,
  onClick,
  disabled,
  otherStyles,
  overwriteStyles = false
}) => (
  <>
    <button
      disabled={disabled && disabled}
      onClick={onClick && onClick}
      className={classNames(
        {
          'mx-auto mt-4 rounded-xl py-1 px-2 font-bold hover:opacity-90 active:scale-95 active:opacity-80 disabled:opacity-50':
            !overwriteStyles
        },
        otherStyles
      )}
    >
      {children}
    </button>
  </>
);
