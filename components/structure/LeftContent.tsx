import { IconButton, Tooltip } from '@mui/material';
import { ChatDiv, NewChatModal, UserIcon } from 'components';
import { useOnClickOutside } from 'hooks';
import { useSelectedContent, useWeb3Provider } from 'providers';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import type { OtherUserType } from 'types';

export const LeftContent: FC = () => {
  const titleStyles =
    'mx-auto m-1 p-1 text-center text-xl font-bold lg:text-2xl';
  const [isNewChatOpen, setIsNewChatOpen] = useState<boolean>(false);
  const newChatModalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, setActiveInfoContent, setActiveChatContent] =
    useSelectedContent();
  const [currentUser, userChats, allUsers] = useWeb3Provider();
  useOnClickOutside(newChatModalRef, () => setIsNewChatOpen(false));

  return (
    <>
      <section
        className={
          'h-full w-full break-words pt-24 shadow-2xl dark:bg-slate-800 '
        }
      >
        <div>
          <div>
            <h1 className={titleStyles}>All users in App</h1>
            <div
              className={
                'flex h-20 flex-wrap justify-start overflow-y-auto rounded-xl bg-blue-200 p-1 shadow-2xl dark:bg-slate-900 '
              }
            >
              {allUsers.map((user: OtherUserType) =>
                user.userAddress !== currentUser?.userAddress ? (
                  <span
                    key={user.id}
                    onClick={() => setActiveInfoContent(user)}
                  >
                    <UserIcon user={user} otherStyles={'m-1'} />
                  </span>
                ) : null
              )}
            </div>
          </div>

          <div>
            <div className={'relative'}>
              <h1 className={titleStyles}>All your chats</h1>
              {currentUser && (
                <Tooltip title={'Add Chat'}>
                  <IconButton
                    disabled={isNewChatOpen}
                    onClick={() => setIsNewChatOpen(!isNewChatOpen)}
                    className={
                      'absolute top-1/2 -translate-y-1/2 text-sm text-black dark:text-blue-charcoal-50 sm:text-base lg:text-xl'
                    }
                  >
                    <FaPlusSquare />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            {isNewChatOpen && currentUser && (
              <NewChatModal
                innerRef={newChatModalRef}
                isOpen={isNewChatOpen}
                setIsOpen={setIsNewChatOpen}
                allUsers={allUsers}
                currentUser={currentUser}
              />
            )}
            <div className={'h-80 overflow-y-auto p-1'}>
              {userChats.map((chat) => (
                <span
                  key={chat.id}
                  onClick={() => {
                    setActiveChatContent(chat);
                    setActiveInfoContent(chat);
                  }}
                >
                  <ChatDiv chat={chat} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
