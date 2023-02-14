import { ChatSelectedContent } from './ChatSelectedContent';
import { OtherUserSelectedContent } from './OtherUserSelectedContent';
import { UserSelectedContent } from './UserSelectedContent';
import { useSelectedContent, useWeb3Provider } from 'providers';
import type { FC } from 'react';
import type { UserType } from 'types';
import type { OtherUserType } from 'types';
import type { ChatType } from 'types';

export const SelectedContent: FC = () => {
  const titleStyles =
    'mx-auto m-1 p-1 text-center text-xl font-bold lg:text-2xl';
  const secondTitleStyles = 'ml-2 m-1 p-1 text-lg font-bold lg:text-xl ';
  const thirdTitleStyles = 'ml-2 m-1 p-1 text-base font-bold lg:text-lg';
  const contentStyles =
    'rounded-xl bg-blue-200 p-2 shadow-2xl dark:bg-slate-900';
  const iconStyles =
    'absolute top-1/2 -translate-y-1/2 text-sm text-black dark:text-blue-charcoal-50 sm:text-base lg:text-xl';
  const textStyles = 'text-sm xl:text-base';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, _, allUsers] = useWeb3Provider();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeInfoContent, __, setActiveInfoContent] = useSelectedContent();

  return (
    <>
      {activeInfoContent ? (
        <div className={'break-all'}>
          {Object.hasOwn(activeInfoContent, 'chats') &&
          (activeInfoContent as UserType).userAddress ===
            currentUser?.userAddress ? (
            <UserSelectedContent
              user={activeInfoContent as UserType}
              titleStyles={titleStyles}
              secondTitleStyles={secondTitleStyles}
              contentStyles={contentStyles}
              textStyles={textStyles}
            />
          ) : Object.hasOwn(activeInfoContent, 'lightColor') ? (
            <OtherUserSelectedContent
              user={activeInfoContent as OtherUserType}
              currentUser={currentUser}
              titleStyles={titleStyles}
              secondTitleStyles={secondTitleStyles}
              setActiveInfoContent={setActiveInfoContent}
              contentStyles={contentStyles}
              iconStyles={iconStyles}
              textStyles={textStyles}
            />
          ) : (
            <ChatSelectedContent
              chat={activeInfoContent as ChatType}
              currentUser={currentUser}
              allUsers={allUsers}
              titleStyles={titleStyles}
              secondTitleStyles={secondTitleStyles}
              thirdTitleStyles={thirdTitleStyles}
              setActiveInfoContent={setActiveInfoContent}
              contentStyles={contentStyles}
              iconStyles={iconStyles}
              textStyles={textStyles}
            />
          )}
        </div>
      ) : null}
    </>
  );
};
