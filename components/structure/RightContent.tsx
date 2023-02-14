import Switch from '@mui/material/Switch';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { CustomButton, SelectedContent } from 'components';
import { contractClass } from 'const';
import { useIsConnected } from 'hooks';
import { useDarkModeContext } from 'providers';
import type { ChangeEvent, FC, FormEvent } from 'react';
import React, { useState } from 'react';
import { FaSun } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

export const RightContent: FC = () => {
  const [theme, toggleTheme] = useDarkModeContext();
  const [inputValue, setInputValue] = useState<string>('');

  const { isConnected, userExists } = useIsConnected();

  const { config } = usePrepareContractWrite({
    address:
      isConnected && !userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.CREATE_USER,
    enabled: isConnected && !userExists,
    args: [inputValue]
  });

  const { write } = useContractWrite(config);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') return;

    write && write();

    setInputValue('');
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
                  className={'relative mx-auto flex w-4/5 flex-col pt-40'}
                  onSubmit={handleSubmit}
                >
                  {inputValue === '' && (
                    <span
                      className={
                        'absolute bottom-24 left-2 text-center text-red-500'
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
                  <CustomButton
                    disabled={inputValue === ''}
                    otherStyles={'bg-red-500'}
                  >
                    Submit Username
                  </CustomButton>
                </form>
              ) : (
                <SelectedContent />
              )}
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};
