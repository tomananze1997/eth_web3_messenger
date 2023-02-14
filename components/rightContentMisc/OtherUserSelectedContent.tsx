import { IconButton, Tooltip } from '@mui/material';
import type { FC, SetStateAction } from 'react';
import type { Dispatch } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import type { ChatType, OtherUserType, UserType } from 'types';

type OtherUserSelectedContentTypes = {
  user: OtherUserType | UserType | ChatType;
  currentUser: UserType | null;
  titleStyles: string;
  secondTitleStyles: string;
  contentStyles: string;
  iconStyles: string;
  textStyles: string;
  setActiveInfoContent: Dispatch<
    SetStateAction<OtherUserType | ChatType | UserType | null>
  >;
};

export const OtherUserSelectedContent: FC<OtherUserSelectedContentTypes> = ({
  user,
  currentUser,
  titleStyles,
  secondTitleStyles,
  contentStyles,
  iconStyles,
  textStyles,
  setActiveInfoContent
}) => (
  <>
    <div>
      <div className={'relative'}>
        <Tooltip title={'Home'}>
          <IconButton
            onClick={() => setActiveInfoContent(currentUser)}
            className={iconStyles}
          >
            <FaUserAlt />
          </IconButton>
        </Tooltip>
        <h1 className={titleStyles}>User info</h1>
      </div>
      <div className={contentStyles}>
        <h2 className={secondTitleStyles}>User username:</h2>
        <p className={textStyles}>{user.username}</p>
        <h2 className={secondTitleStyles}>User address:</h2>
        <span className={textStyles}>{user.userAddress}</span>
      </div>
    </div>
  </>
);
