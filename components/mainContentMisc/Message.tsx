import { ChangeMessageModal } from './ChangeMessageModal';
import classNames from 'classnames';
import { contractClass } from 'const';
import { BigNumber } from 'ethers';
import { useShortenedString } from 'hooks';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { AiFillDelete, AiOutlineMessage } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import type { MessageResponse } from 'types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type MessageTypes = {
  message?: MessageResponse;
  isOwner?: boolean;
};
export const Message: FC<MessageTypes> = ({ message, isOwner = false }) => {
  const [isSelected, setSelected] = useState<boolean>(false);
  const [isChangeChatOpen, setIsChangeChatOpen] = useState<boolean>(false);
  const changeChatModalRef = useRef<HTMLDivElement>(null);
  const buttonIconStyles = `transition-all duration-75 max-w-xs -translate-y-5 inline-flex mr-2 ${
    !isSelected ? 'max-w-0' : ''
  }`;
  const iconStyles =
    'text-sm text-black dark:text-blue-charcoal-50 sm:text-base';
  const spanStyles =
    'text-xxs xl:text-xs text-neutral-400 dark:text-neutral-500 italic';
  const importantSpanStyles = 'text-neutral-600 dark:text-neutral-100';

  const { config } = usePrepareContractWrite({
    address: isOwner ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.DELETE_MESSAGE,
    enabled: isOwner,
    args: [message?.id]
  });

  const deleteMessage = useContractWrite(config);

  const renderDate = (date: string | undefined): string => {
    if (date == undefined) return '';

    const fullStringDate = new Date(BigNumber.from(date).toNumber() * 1000);
    const fullStringToday = new Date();

    if (
      fullStringDate.toLocaleDateString() ==
      fullStringToday.toLocaleDateString()
    ) {
      //if today
      return fullStringDate.toLocaleTimeString();
    } else {
      //if yesterday
      return fullStringDate.toLocaleDateString();
    }
  };

  return (
    <>
      <div
        className={classNames(
          'm-0.5 w-fit max-w-4/5 break-all py-1 ease-in-out lg:max-w-3/5',
          { 'ml-auto': isOwner },
          { 'mr-auto': !isOwner }
        )}
      >
        <div
          className={classNames(
            'max-h-0 max-w-full overflow-hidden duration-200 ease-in-out',
            {
              'max-h-8 ': isSelected
            },
            { 'text-right': isOwner },
            { 'text-left': !isOwner }
          )}
        >
          <span className={spanStyles}>
            {message?.isChanged && (
              <span className={importantSpanStyles}>Changed at: </span>
            )}
            {renderDate(message?.changedAt)}
          </span>
          <span className={classNames(spanStyles, 'mr-1 ml-3 xl:ml-6 xl:mr-2')}>
            {useShortenedString(message?.owner.username as string, 9)}
          </span>
        </div>

        {isOwner && (
          <div
            className={classNames('absolute duration-75 ease-in-out', {
              '-translate-x-full ': isSelected
            })}
          >
            <button
              data-tooltip-id='change-message'
              className={buttonIconStyles}
              disabled={isChangeChatOpen}
              onClick={() => setIsChangeChatOpen(!isChangeChatOpen)}
            >
              <AiOutlineMessage
                className={classNames(
                  iconStyles,
                  'hover:text-green-400 dark:hover:text-green-700'
                )}
              />
            </button>
            <Tooltip id={'change-message'} content={'Change message'} />
            <button
              data-tooltip-id='delete-message'
              className={buttonIconStyles}
              onClick={() => deleteMessage.write?.()}
            >
              <AiFillDelete
                className={classNames(
                  iconStyles,
                  'hover:text-red-400 dark:hover:text-red-700'
                )}
              />
            </button>
            <Tooltip id={'delete-message'} content={'Delete message'} />
          </div>
        )}

        {isOwner && isChangeChatOpen && (
          <ChangeMessageModal
            innerRef={changeChatModalRef}
            isOpen={isChangeChatOpen}
            setIsOpen={setIsChangeChatOpen}
            message={message as MessageResponse}
          />
        )}
        <p
          onClick={() => setSelected(!isSelected)}
          className={classNames(
            'relative z-10 max-w-fit cursor-pointer rounded-2xl py-0.5 px-2 text-xs hover:scale-105 xl:text-sm ',
            { 'ml-auto bg-blue-charcoal-50 dark:bg-blue-500': isOwner },
            { 'mr-auto bg-blue-charcoal-100 dark:bg-blue-700': !isOwner },
            { 'scale-105 ': isSelected }
          )}
        >
          {message?.text}
        </p>
        {message?.isChanged && (
          <p
            className={classNames(
              spanStyles,
              importantSpanStyles,
              { 'text-right': isOwner },
              { 'text-left': !isOwner }
            )}
          >
            Message has been changed!
          </p>
        )}
      </div>
    </>
  );
};
