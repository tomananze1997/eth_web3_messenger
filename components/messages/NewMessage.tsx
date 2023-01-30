import classNames from 'classnames';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

export const NewMessage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInputValue('');
  };

  return (
    <>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className={'group relative mx-auto mt-auto flex w-5/6'}
      >
        <input
          value={inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
          className={
            'group-focus:text-blue my-2 w-full rounded-xl py-0.5 px-2 pr-7 text-black focus:outline-none'
          }
          type='text'
          placeholder={'Aa...'}
        />
        <button
          disabled={inputValue === '' ? true : false}
          className={classNames(
            'absolute top-1/2 right-2 -translate-y-2/4 text-xl text-black',
            {
              'text-blue-500': inputValue !== ''
            }
          )}
        >
          <AiOutlineSend />
        </button>
      </form>
    </>
  );
};
