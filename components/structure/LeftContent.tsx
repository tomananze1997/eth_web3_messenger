import { ChatDiv, UserIcon } from 'components';
import { useWeb3Provider } from 'providers';
import type { FC } from 'react';
import type { OtherUserType } from 'types';

export const LeftContent: FC = () => {
  const titleStyles =
    'mx-auto m-1 p-1 text-center text-xl font-bold shadow-2xl';
  const [currentUser, userChats, allUsers] = useWeb3Provider();

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
                  <UserIcon key={user.id} user={user} otherStyles={'m-1'} />
                ) : null
              )}
            </div>
          </div>

          <div>
            <h1 className={titleStyles}>All your chats</h1>
            <div className={'h-80 overflow-y-auto p-1'}>
              {userChats.map((chat) => (
                <ChatDiv key={chat.id} chat={chat} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
