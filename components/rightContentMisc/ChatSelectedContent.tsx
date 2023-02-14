import { AddUsersToChatModal } from './AddUsersToChatModal';
import { IconButton, Tooltip } from '@mui/material';
import { CustomButton, UserIcon } from 'components';
import { contractClass } from 'const';
import { useOnClickOutside } from 'hooks';
import type { FC, SetStateAction } from 'react';
import type { Dispatch } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import type { ChatType, OtherUserType, UserType } from 'types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type ChatSelectedContentTypes = {
  chat: ChatType;
  currentUser: UserType | null;
  allUsers: OtherUserType[];
  titleStyles: string;
  secondTitleStyles: string;
  thirdTitleStyles: string;
  contentStyles: string;
  iconStyles: string;
  textStyles: string;
  setActiveInfoContent: Dispatch<
    SetStateAction<OtherUserType | ChatType | UserType | null>
  >;
};

export const ChatSelectedContent: FC<ChatSelectedContentTypes> = ({
  chat,
  currentUser,
  allUsers,
  titleStyles,
  secondTitleStyles,
  thirdTitleStyles,
  contentStyles,
  iconStyles,
  textStyles,
  setActiveInfoContent
}) => {
  const availableUsers: OtherUserType[] = useMemo(() => [], []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const addUsersModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(addUsersModalRef, () => setIsModalOpen(false));

  const { config } = usePrepareContractWrite({
    address: chat.id ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.LEAVE_CHAT,
    args: [chat?.id]
  });

  const { write } = useContractWrite(config);

  const prepareAvailableUsersArray = useCallback((): void => {
    allUsers.forEach((user: OtherUserType) => {
      const isUserInChat: boolean = chat.users.some(
        (chatUser: OtherUserType) => chatUser.id === user.id
      );

      const isCurrentUser: boolean = currentUser?.id === user.id;

      const isUserAlreadyInArray: boolean = availableUsers.some(
        (availableUsers: OtherUserType) => availableUsers.id === user.id
      );

      if (!isUserInChat && !isCurrentUser && !isUserAlreadyInArray) {
        availableUsers.push(user);
      }
    });
  }, [allUsers, availableUsers, chat.users, currentUser?.id]);

  useEffect(() => {
    prepareAvailableUsersArray();
  }, [allUsers, prepareAvailableUsersArray]);

  return (
    <>
      <div className={'flex flex-col'}>
        <div className={'relative'}>
          <Tooltip title={'Home'}>
            <IconButton
              onClick={() => setActiveInfoContent(currentUser)}
              className={iconStyles}
            >
              <FaUserAlt />
            </IconButton>
          </Tooltip>
          <h1 className={titleStyles}>Chat info</h1>
        </div>
        <div className={contentStyles}>
          <h2 className={secondTitleStyles}>Chat name:</h2>
          <p className={textStyles}>{chat.chatName}</p>
          <h2 className={thirdTitleStyles}>Number of messages:</h2>
          <span className={textStyles}>{chat.messagesId.length}</span>
        </div>
        <h2 className={thirdTitleStyles}>Users in chat:</h2>
        <div
          className={
            'flex h-20 flex-wrap justify-start overflow-y-auto rounded-xl bg-blue-200 p-1 shadow-2xl dark:bg-slate-900 '
          }
        >
          {chat.users.map((user: OtherUserType) => (
            <UserIcon key={user.id} user={user} otherStyles={'m-1'} />
          ))}
        </div>
        <CustomButton
          onClick={() => setIsModalOpen(!isModalOpen)}
          otherStyles={'bg-green-300 dark:bg-green-700'}
        >
          Add users
        </CustomButton>
        <AddUsersToChatModal
          innerRef={addUsersModalRef}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          otherUsers={availableUsers}
          chatId={chat.id}
        />
        <CustomButton
          onClick={() => write?.()}
          otherStyles={'bg-red-300 dark:bg-red-700'}
        >
          Leave chat
        </CustomButton>
      </div>
    </>
  );
};
