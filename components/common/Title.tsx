import classNames from 'classnames';
import { useIsConnected, useShortenedString } from 'hooks';
import type { FC } from 'react';

type TitleTypes = {
  chatTitle?: string;
};

export const Title: FC<TitleTypes> = ({
  chatTitle = 'Choose/create new chat'
}) => {
  const titleStyles = 'p-1 text-xl font-bold';
  const { isConnected, userExists } = useIsConnected();

  chatTitle = isConnected
    ? userExists
      ? chatTitle
      : 'Choose username!'
    : userExists
    ? 'Connect wallet!'
    : 'Choose username!';

  return (
    <>
      <div
        className={
          'mx-auto mt-1 rounded-xl p-1 text-center shadow-2xl dark:bg-slate-800'
        }
      >
        <h1
          className={classNames(
            titleStyles,
            'my-2 border-b border-neutral-400 text-2xl '
          )}
        >
          Blockchain Messenger
        </h1>
        <h2 className={classNames(titleStyles)}>
          {useShortenedString(chatTitle, 22)}
        </h2>
      </div>
    </>
  );
};
