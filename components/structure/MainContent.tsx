import classNames from 'classnames';
import { Message, NewMessage, Title } from 'components';
import type { FC } from 'react';
import { useRef } from 'react';

type MainContentTypes = {
  otherStyles?: string;
};
export const MainContent: FC<MainContentTypes> = ({ otherStyles }) => {
  const lastDivRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    lastDivRef.current && lastDivRef.current.scrollIntoView();
  };

  return (
    <>
      <div className={classNames(otherStyles, 'flex h-full flex-col')}>
        <Title />
        <div
          className={
            'mx-6 my-2 flex h-4/5 flex-col rounded-xl p-1 shadow-2xl dark:bg-slate-800'
          }
        >
          <div className={'snap-end overflow-y-auto'} ref={scrollSectionRef}>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message isOwner={true} />
            <div ref={lastDivRef} />
          </div>
          <div className={'mt-auto '}>
            <NewMessage scrollToBottom={scrollToBottom} />
          </div>
        </div>
      </div>
    </>
  );
};
