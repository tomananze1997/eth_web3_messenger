import type { Context } from 'react';
import { createContext } from 'react';
import type { ChatType, OtherUserType, UserType } from 'types';

type Web3ContextTypes = {
  currentUser: UserType | null;
  userChats: ChatType[] | [];
  allUsers: OtherUserType[] | [];
};

export const Web3Context: Context<Web3ContextTypes> =
  createContext<Web3ContextTypes>({
    currentUser: null,
    userChats: [],
    allUsers: []
  });
