import classNames from 'classnames';
import type { FC } from 'react';

type MessageType = {
  isOwner?: boolean;
};
export const Message: FC<MessageType> = ({ isOwner = false }) => (
  <>
    <div
      className={classNames(
        'm-0.5 my-1 max-w-4/5 break-words rounded-2xl py-0.5 px-2 text-xs',
        { 'ml-auto bg-blue-50 dark:bg-blue-500': isOwner },
        { 'mr-auto bg-blue-200  dark:bg-blue-700': !isOwner }
      )}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
      ducimus, exercitationem expedita explicabo in inventore iure laborum
      placeat possimus, quae quia quidem repellat reprehenderit. Consequuntur
      doloribus error maiores minus obcaecati?
    </div>
  </>
);
