import Switch from '@mui/material/Switch';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { contractClass } from 'const';
import { useIsConnected } from 'hooks';
import { useDarkModeContext } from 'providers';
import type { ChangeEvent, FC, FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { FaSun } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite
} from 'wagmi';

export const UsersContent: FC = () => {
  const [theme, toggleTheme] = useDarkModeContext();
  const [inputValue, setInputValue] = useState<string>('');

  const { isConnected, userExists } = useIsConnected();

  const userExistsResponse = useContractRead({
    address: isConnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.DOES_USER_EXIST
  });

  const currentUserResponse = useContractRead({
    address: isConnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.GET_CURRENT_USER
  });

  const AllUserResponse = useContractRead({
    address: isConnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.GET_ALL_USERS
  });

  const { config } = usePrepareContractWrite({
    address: isConnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.CREATE_USER,
    args: [inputValue]
  });

  const { write, error } = useContractWrite(config);

  useEffect(() => {
    console.log(userExistsResponse.data);
    console.log(currentUserResponse.data);
    console.log(AllUserResponse.data);
  }, [userExistsResponse.data, currentUserResponse.data, AllUserResponse.data]);

  useEffect(() => {
    error && alert(`username ${inputValue} is already taken!`);

    setInputValue('');
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    write && write();

    setInputValue('');
    location.reload(); //todo implement rerender functionality in useEffect
  };

  return (
    <>
      <section
        className={
          'flex h-full w-full flex-col break-words pt-10 shadow-2xl dark:bg-slate-800'
        }
      >
        <div
          className={
            'mx-auto text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base'
          }
        >
          <ConnectButton accountStatus='avatar' showBalance={true} />
        </div>
        <div className={'mx-auto'}>
          <Switch
            icon={
              <FaSun
                className={
                  '-translate-y-0.5 -translate-x-1 text-2xl text-black'
                }
              />
            }
            checkedIcon={
              <MdDarkMode className={' -translate-y-0.5 text-2xl'} />
            }
            color={'default'}
            className={'w-14'}
            onClick={toggleTheme}
          />
          <span
            className={classNames(
              'text-sm sm:text-base md:text-sm lg:text-base',
              {
                'opacity-50': theme === 'light'
              }
            )}
          >
            Dark mode is {theme === 'dark' ? 'on' : 'off'}
          </span>
        </div>
        <div className={'pt-3.5'}>
          {isConnected ? (
            <>
              {!userExists ? (
                <form
                  className={'relative mx-auto flex w-4/5 flex-col pt-20'}
                  onSubmit={handleSubmit}
                >
                  {inputValue === '' && (
                    <span
                      className={
                        'absolute top-2 left-2 text-center text-red-500'
                      }
                    >
                      You must choose your username, before using Blockchain
                      Messenger!
                    </span>
                  )}
                  <input
                    type='text'
                    value={inputValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setInputValue(event.target.value)
                    }
                    placeholder={'Username...'}
                    className={classNames(
                      ' w-full rounded-xl py-0.5 px-2 pr-8 text-black focus:outline-none',
                      { 'border-2 border-red-500 ': inputValue === '' }
                    )}
                  />
                  <button
                    disabled={inputValue === ''}
                    className={
                      'mx-auto mt-4 rounded-xl bg-red-500 py-1 px-2 font-bold hover:opacity-90 active:scale-95 active:opacity-80 disabled:opacity-50'
                    }
                  >
                    Submit Username
                  </button>
                </form>
              ) : (
                <h1> Test </h1>
              )}
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};
