import classNames from 'classnames';
import { useIsConnected, useShortenedString } from 'hooks';
import type { FC } from 'react';

type TitleTypes = {
  chatTitle?: string;
};

export const Title: FC<TitleTypes> = ({
  chatTitle = 'Choose/create new chat'
}) => {
  const titleStyles =
    'mx-auto m-1 p-1 text-center text-2xl font-bold xl:text-3xl';
  const secondTitleStyles = 'ml-2 m-1 p-1 text-lg font-bold lg:text-xl';
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
            'my-2 border-b border-neutral-400'
          )}
        >
          Blockchain Messenger
        </h1>
        <h2 className={classNames(secondTitleStyles)}>
          {useShortenedString(chatTitle, 22)}
        </h2>
      </div>
    </>
  );
};
