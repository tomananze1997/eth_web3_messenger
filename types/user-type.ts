import type { ChatType } from './chat-type';

export interface UserType {
  id: number;
  lightColor: string;
  darkColor: string;
  chats: ChatType[];
  username: string;
  userAddress: string;
}

export interface OtherUserType {
  id: number;
  lightColor: string;
  darkColor: string;
  chatsId: number[];
  username: string;
  userAddress: string;
}
