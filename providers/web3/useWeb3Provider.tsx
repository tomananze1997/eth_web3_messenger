import { Web3Context } from './Web3Context';
import { useContext } from 'react';

export const useWeb3Provider = () => {
  const { currentUser, userChats, allUsers } = useContext(Web3Context);

  return [currentUser, userChats, allUsers] as const;
};
