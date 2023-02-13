import classNames from 'classnames';
import { LeftContent, MainContent, RightContent } from 'components';
import { useIsConnected, useWindowWidth } from 'hooks';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MdChat, MdClose, MdManageAccounts } from 'react-icons/md';

const Home: NextPage = () => {
  const leftIconStyle =
    'absolute z-40 cursor-pointer text-3xl transition duration-200 ease-in-out sm:text-4xl';
  const rightIconStyle =
    'absolute z-40 cursor-pointer text-3xl transition duration-200 ease-in-out sm:text-4xl right-0';
  const sliderStyle =
    'fixed z-30 h-full w-190px bg-slate-200 transition duration-200 ease-in-out sm:w-250px';
  const sideSlidersMedia = 'md:w-8/12 lg:w-6/12 xl:w-4/12';
  const mainScreenWhenSliders =
    'absolute top-0 bottom-0 left-0 right-0 z-10 block hidden bg-black bg-opacity-40';

  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [windowWidth] = useWindowWidth();
  const { isConnected, userExists } = useIsConnected();

  useEffect(() => {
    if (!isConnected || !userExists) {
      setRightActive(true);
      setLeftActive(false);
    }
  }, [isConnected, userExists]);

  const handleLeftClick = (): void => {
    setLeftActive(!leftActive);
    setRightActive(false);
  };

  const handleRightClick = (): void => {
    setRightActive(!rightActive);
    setLeftActive(false);
  };

  return (
    <>
      <div className={'flex h-full'}>
        {windowWidth && windowWidth <= 768 ? (
          <>
            {isConnected && userExists && (
              <>
                <MdChat
                  onClick={handleLeftClick}
                  className={classNames(leftIconStyle, {
                    'translate-x-160px opacity-0 sm:translate-x-214px ':
                      leftActive
                  })}
                />
                <MdClose
                  onClick={handleLeftClick}
                  className={classNames(leftIconStyle, 'opacity-0', {
                    'translate-x-160px opacity-100 sm:translate-x-214px':
                      leftActive
                  })}
                />
              </>
            )}
            <div
              className={classNames(sliderStyle, {
                '-translate-x-190px sm:-translate-x-250px': !leftActive
              })}
            >
              <LeftContent />
            </div>

            <div
              className={classNames(mainScreenWhenSliders, {
                '!block': leftActive
              })}
            />
          </>
        ) : (
          <>
            <div className={sideSlidersMedia}>
              <LeftContent />
            </div>
          </>
        )}

        <MainContent />

        {windowWidth && windowWidth <= 768 ? (
          <>
            {isConnected && userExists && (
              <>
                <MdManageAccounts
                  onClick={handleRightClick}
                  className={classNames(rightIconStyle, {
                    '-translate-x-160px opacity-0 sm:-translate-x-214px':
                      rightActive
                  })}
                />
                <MdClose
                  onClick={handleRightClick}
                  className={classNames(rightIconStyle, 'opacity-0', {
                    '-translate-x-160px opacity-100 sm:-translate-x-214px':
                      rightActive
                  })}
                />
              </>
            )}
            <div
              className={classNames(sliderStyle, 'right-0', {
                'translate-x-190px sm:translate-x-250px': !rightActive
              })}
            >
              <RightContent />
            </div>

            <div
              className={classNames(mainScreenWhenSliders, {
                '!block': rightActive
              })}
            />
          </>
        ) : (
          <>
            <div className={sideSlidersMedia}>
              <RightContent />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
