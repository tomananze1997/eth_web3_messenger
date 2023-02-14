import { DeletedMessage, Message, NewMessage, Title } from 'components';
import { contractClass } from 'const';
import { useIsConnected } from 'hooks';
import { useSelectedContent } from 'providers';
import type { FC } from 'react';
import { useRef } from 'react';
import type { MessageResponse } from 'types';
import { useContractRead } from 'wagmi';

export const MainContent: FC = () => {
  const lastDivRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, activeChatContent] = useSelectedContent();
  const { currentUserAddress } = useIsConnected();

  const { data, isLoading, isError } = useContractRead({
    address: activeChatContent ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.GET_ALL_MESSAGES_IN_CHAT,
    args: [activeChatContent?.id],
    overrides: { from: currentUserAddress }
  });

  const scrollToBottom = (): void => {
    lastDivRef.current && lastDivRef.current.scrollIntoView();
  };

  return (
    <>
      <div className={'flex h-full w-full flex-col lg:mx-12 xl:mx-28'}>
        <Title
          chatTitle={activeChatContent ? activeChatContent.chatName : undefined}
        />
        <div
          className={
            'mx-6 my-2 flex h-4/5 flex-col rounded-xl p-1 shadow-2xl dark:bg-slate-800'
          }
        >
          <div
            className={'snap-end overflow-y-auto px-3'}
            ref={scrollSectionRef}
          >
            {!isLoading && !isError && data && Array.isArray(data)
              ? data.map((message: MessageResponse, index: number) =>
                  message.owner.userAddress === currentUserAddress ? (
                    <Message
                      key={message.id}
                      isOwner={true}
                      message={message}
                    />
                  ) : message.owner.userAddress ===
                    '0x0000000000000000000000000000000000000000' ? (
                    <>
                      <DeletedMessage key={index} />
                    </>
                  ) : (
                    <Message key={message.id} message={message} />
                  )
                )
              : null}
            <div ref={lastDivRef} />
          </div>
          <div className={'mt-auto '}>
            <NewMessage
              scrollToBottom={scrollToBottom}
              chatId={activeChatContent?.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};
