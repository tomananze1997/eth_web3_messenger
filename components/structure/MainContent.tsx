import classNames from 'classnames';
import { Message, NewMessage, Title } from 'components';
import type { FC } from 'react';

type MainContentTypes = {
  otherStyles?: string;
};
export const MainContent: FC<MainContentTypes> = ({ otherStyles }) => (
  <>
    <div className={classNames(otherStyles, 'flex h-full flex-col')}>
      <Title />
      <div className={'m-10 flex h-4/5 flex-col rounded-xl bg-slate-800 p-1'}>
        <div className={'overflow-y-auto'}>
          <Message />
          <Message />
          <Message isOwner={true} />
        </div>
        <NewMessage />
      </div>
    </div>
  </>
);
