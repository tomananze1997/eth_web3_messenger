import classNames from 'classnames';
import type { FC } from 'react';
import type { MessageResponse } from 'types';

type MessageTypes = {
  message?: MessageResponse;
  isOwner?: boolean;
};
export const Message: FC<MessageTypes> = ({ message, isOwner = false }) => (
  <>
    <div
      className={classNames(
        'm-0.5 my-1 max-w-4/5 break-words rounded-2xl py-0.5 px-2 text-xs',
        { 'ml-auto bg-blue-50 dark:bg-blue-500': isOwner },
        { 'mr-auto bg-blue-200  dark:bg-blue-700': !isOwner }
      )}
    >
      {message?.text}
    </div>
  </>
);
