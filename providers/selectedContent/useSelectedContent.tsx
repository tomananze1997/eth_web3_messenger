import { SelectedContentContext } from './SelectedContentContext';
import { useContext } from 'react';

export const useSelectedContent = () => {
  const {
    activeInfoContent,
    activeChatContent,
    setActiveInfoContent,
    setActiveChatContent
  } = useContext(SelectedContentContext);

  return [
    activeInfoContent,
    activeChatContent,
    setActiveInfoContent,
    setActiveChatContent
  ] as const;
};
