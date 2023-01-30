import classNames from 'classnames';
import { useShortenedString } from 'hooks';
import type { FC } from 'react';

type TitleTypes = {
  chatTitle?: string;
};

export const Title: FC<TitleTypes> = ({
  chatTitle = 'Choose/create new chat'
}) => {
  const titleStyles = 'p-1 text-xl font-bold';
  return (
    <>
      <div className={'mx-auto mt-1 rounded-xl bg-slate-800 p-1 text-center'}>
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
