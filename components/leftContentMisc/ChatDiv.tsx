import classNames from 'classnames';
import { useShortenedString, useWindowWidth } from 'hooks';
import type { FC } from 'react';
import type { ChatType } from 'types';

type ChatDivTypes = {
  chat: ChatType;
  otherStyles?: string;
};

export const ChatDiv: FC<ChatDivTypes> = ({ chat, otherStyles }) => {
  const [windowWidth] = useWindowWidth();

  return (
    <>
      <div
        className={classNames(
          'm-1 flex cursor-pointer rounded-xl bg-blue-200 p-2 shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-300 dark:bg-slate-900',
          otherStyles
        )}
      >
        <h2 className={'xl:text-lg'}>{useShortenedString(chat.chatName, 9)}</h2>
        {(640 < windowWidth && windowWidth < 768) || 1100 < windowWidth ? (
          <div className={'ml-auto mr-3 w-1/2 text-xs opacity-50'}>
            <p>
              Users:
              <span className={'font-bold'}>
                {' '}
                {chat.users.length < 99 ? chat.users.length : '99+'}
              </span>
            </p>
            <p>
              Messages:
              <span className={'font-bold'}>
                {' '}
                {chat.messagesId.length < 99 ? chat.messagesId.length : '99+'}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};
