import classNames from 'classnames';
import { CustomButton } from 'components';
import { contractClass } from 'const';
import type {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  KeyboardEvent,
  LegacyRef,
  SetStateAction
} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import type { MessageResponse } from 'types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type ChangeMessageModalTypes = {
  innerRef: LegacyRef<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: MessageResponse;
};

export const ChangeMessageModal: FC<ChangeMessageModalTypes> = ({
  innerRef,
  isOpen,
  setIsOpen,
  message
}) => {
  const [textareaValue, setTextareaValue] = useState<string>(message.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { config } = usePrepareContractWrite({
    address:
      message.id && textareaValue !== '' && message.text !== textareaValue
        ? contractClass.GOERLI_ADDRESS
        : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.CHANGE_MESSAGE,
    args: [message.id, textareaValue]
  });

  const { write } = useContractWrite(config);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();

      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight <= 220) {
        textareaRef.current.style.height = scrollHeight + 'px';
      } else {
        textareaRef.current.style.height = 220 + 'px';
      }
    }
  }, [textareaRef, textareaValue]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (textareaValue === '') return;

    write && write();

    setTextareaValue('');
    setIsOpen(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.code == 'Enter' &&
      !e.shiftKey &&
      textareaValue !== '' &&
      message.id !== undefined &&
      message.text !== textareaValue
    ) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <div
        ref={innerRef}
        className={classNames(
          'fixed top-1/2 left-1/2 z-50 flex h-fit w-96 -translate-y-1/2 -translate-x-1/2 flex-col rounded-xl bg-white bg-slate-400 p-5 shadow-2xl shadow-black dark:bg-slate-900',
          {
            'hidden ': !isOpen
          }
        )}
      >
        <MdClose
          className={'absolute right-1 top-1 cursor-pointer'}
          onClick={() => setIsOpen(!isOpen)}
        />

        <form
          onSubmit={handleSubmit}
          className={'relative mx-auto flex w-5/6 flex-col'}
          ref={formRef}
        >
          <textarea
            value={textareaValue}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setTextareaValue(event.target.value)
            }
            placeholder={'Aa...'}
            className={
              'relative my-2 w-full resize-none overflow-hidden rounded-xl py-0.5 px-2 pr-8 text-black focus:outline-none'
            }
            rows={1}
            ref={textareaRef}
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) =>
              handleKeyPress(event)
            }
          />
          <CustomButton
            disabled={
              textareaValue === '' ||
              message.id === undefined ||
              message.text === textareaValue
            }
            otherStyles={'bg-green-300 dark:bg-green-700'}
          >
            Change message
          </CustomButton>
        </form>
      </div>
    </>
  );
};
