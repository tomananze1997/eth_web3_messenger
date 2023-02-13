import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import type { ChatType, OtherUserType, UserType } from 'types';

type SelectedContentContextTypes = {
  activeInfoContent: OtherUserType | ChatType | UserType | null;
  activeChatContent: ChatType | null;
  setActiveInfoContent: Dispatch<
    SetStateAction<OtherUserType | ChatType | UserType | null>
  >;
  setActiveChatContent: Dispatch<SetStateAction<ChatType | null>>;
};

export const SelectedContentContext: Context<SelectedContentContextTypes> =
  createContext<SelectedContentContextTypes>({
    activeInfoContent: null,
    activeChatContent: null,
    setActiveInfoContent: () => [],
    setActiveChatContent: () => []
  });
