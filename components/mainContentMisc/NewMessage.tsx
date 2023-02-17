import { CustomButton } from 'components';
import { contractClass } from 'const';
import type { ChangeEvent, FC, FormEvent, KeyboardEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type NewMessageTypes = {
  scrollToBottom: () => void;
  chatId?: number;
};

export const NewMessage: FC<NewMessageTypes> = ({ scrollToBottom, chatId }) => {
  const [textareaValue, setTextareaValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { config } = usePrepareContractWrite({
    address: chatId !== undefined ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.CREATE_MESSAGE,
    enabled: chatId !== undefined,
    args: [chatId, textareaValue]
  });

  const { write } = useContractWrite(config);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      scrollToBottom();

      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;

      if (scrollHeight <= 148) {
        textareaRef.current.style.height = scrollHeight + 'px';
      } else {
        textareaRef.current.style.height = 148 + 'px';
      }
    }
  }, [textareaRef, textareaValue, scrollToBottom]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (textareaValue === '') return;

    write && write();

    setTextareaValue('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={'relative mx-auto flex w-5/6'}
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
          disabled={textareaValue === '' || chatId === undefined}
          overwriteStyles={true}
          otherStyles={
            'absolute bottom-0.5 right-2 -translate-y-2/4 text-xl text-blue-500 disabled:text-black'
          }
        >
          <AiOutlineSend />
        </CustomButton>
      </form>
    </>
  );
};
