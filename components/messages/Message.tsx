import classNames from 'classnames';
import type { FC } from 'react';

type MessageType = {
  isOwner?: boolean;
};
export const Message: FC<MessageType> = ({ isOwner = false }) => (
  <>
    <div
      className={classNames(
        'm-0.5 max-w-4/5 break-words rounded-2xl bg-slate-600 py-0.5 px-2 text-xs',
        { 'ml-auto': isOwner },
        { 'mr-auto': !isOwner }
      )}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
      ducimus, exercitationem expedita explicabo in inventore iure laborum
      placeat possimus, quae quia quidem repellat reprehenderit. Consequuntur
      doloribus error maiores minus obcaecati?
    </div>
  </>
);
