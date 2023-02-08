import { useEffect, useState } from 'react';

const getWindowWidth = (): number => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width } = window;

    return width;
  } else {
    return 0;
  }
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = (): void => {
    setWindowWidth(getWindowWidth());
  };

  return [windowWidth];
};
