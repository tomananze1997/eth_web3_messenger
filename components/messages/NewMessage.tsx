import classNames from 'classnames';
import type { ChangeEvent, FC, FormEvent, KeyboardEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

type NewMessageTypes = {
  scrollToBottom: () => void;
};

export const NewMessage: FC<NewMessageTypes> = ({ scrollToBottom }) => {
  const [textareaValue, setTextareaValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
  }, [textareaRef, textareaValue]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (textareaValue === '') return;

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
            'relative my-2 w-full overflow-hidden rounded-xl py-0.5 px-2 pr-8 text-black focus:outline-none'
          }
          rows={1}
          ref={textareaRef}
          onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) =>
            handleKeyPress(event)
          }
        />
        <button
          disabled={textareaValue === ''}
          className={classNames(
            'absolute bottom-0.5 right-2 -translate-y-2/4 text-xl text-black',
            {
              'text-blue-500': textareaValue !== ''
            }
          )}
        >
          <AiOutlineSend />
        </button>
      </form>
    </>
  );
};
