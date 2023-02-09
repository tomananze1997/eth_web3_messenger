import type { ChatType } from './chat-type';

export interface UserType {
  id: string;
  chats: ChatType[];
  username: string;
  userAddress: string;
}
