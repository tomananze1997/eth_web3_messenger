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
        'm-0.5 my-1 w-fit max-w-4/5 cursor-pointer break-words rounded-2xl py-0.5 px-2 text-xs duration-500 ease-in-out hover:scale-105 lg:max-w-3/5 xl:text-sm',
        { 'ml-auto bg-blue-charcoal-50 dark:bg-blue-500': isOwner },
        { 'mr-auto bg-blue-charcoal-100  dark:bg-blue-700': !isOwner }
      )}
    >
      {message?.text}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium
      adipisci dignissimos doloremque in molestias quia rem reprehenderit
      voluptatem voluptatum? Ad animi aut dolor ea fugiat neque officiis quis
      quisquam?
    </div>
  </>
);
