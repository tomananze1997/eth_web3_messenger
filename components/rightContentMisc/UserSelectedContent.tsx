import type { FC } from 'react';
import type { ChatType, OtherUserType, UserType } from 'types';

type UserSelectedContentTypes = {
  user: OtherUserType | UserType | ChatType;
  titleStyles: string;
  secondTitleStyles: string;
  contentStyles: string;
  textStyles: string;
};

export const UserSelectedContent: FC<UserSelectedContentTypes> = ({
  user,
  titleStyles,
  secondTitleStyles,
  contentStyles,
  textStyles
}) => (
  <>
    <div>
      <h1 className={titleStyles}>Home</h1>
      <div className={contentStyles}>
        <h2 className={secondTitleStyles}>Your username:</h2>
        <p className={textStyles}>{user.username}</p>
        <h2 className={secondTitleStyles}>Your address:</h2>
        <span className={textStyles}>{user.userAddress}</span>
      </div>
    </div>
  </>
);
