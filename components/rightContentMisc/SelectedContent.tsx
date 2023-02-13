import { useSelectedContent, useWeb3Provider } from 'providers';
import { FaUserAlt } from 'react-icons/fa';
import type { UserType } from 'types';

export const SelectedContent = () => {
  const titleStyles =
    'mx-auto m-1 p-1 text-center text-xl font-bold shadow-2xl';
  const secondTitleStyles = 'ml-2 m-1 p-1 text-lg font-bold ';
  const thirdTitleStyles = 'ml-2 m-1 p-1 text-base font-bold ';

  const [currentUser] = useWeb3Provider();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeContent, _, setActiveInfoContent] = useSelectedContent();

  return (
    <>
      {activeContent ? (
        <div className={'break-all '}>
          {Object.hasOwn(activeContent, 'chats') &&
          (activeContent as UserType).userAddress ===
            currentUser?.userAddress ? (
            <div>
              <h1 className={titleStyles}>Home</h1>
              <h2 className={secondTitleStyles}>Your username:</h2>
              <p className={'text-sm'}>{activeContent.username}</p>
              <h2 className={secondTitleStyles}>Your address:</h2>
              <span className={'text-sm'}>{activeContent.userAddress}</span>
            </div>
          ) : Object.hasOwn(activeContent, 'lightColor') ? (
            <div>
              <FaUserAlt onClick={() => setActiveInfoContent(currentUser)} />
              <h1 className={titleStyles}>Selected User info</h1>
              <h2 className={secondTitleStyles}>User username:</h2>
              <p className={'text-sm'}>{activeContent.username}</p>
              <h2 className={secondTitleStyles}>User address:</h2>
              <span className={'text-sm'}>{activeContent.userAddress}</span>
            </div>
          ) : (
            <div>
              <FaUserAlt onClick={() => setActiveInfoContent(currentUser)} />
              <h1 className={titleStyles}>Selected Chat info</h1>
              <h2 className={secondTitleStyles}>User username:</h2>
              <p className={'text-sm'}>{activeContent.username}</p>
              <h2 className={thirdTitleStyles}>Number of users in chat:</h2>
              <span className={'text-sm'}>{activeContent.usersId.length}</span>
              <h2 className={thirdTitleStyles}>Number of messages in chat:</h2>
              <span className={'text-sm'}>
                {activeContent.messagesId.length}
              </span>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};
