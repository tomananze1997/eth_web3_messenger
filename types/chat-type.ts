import type { OtherUserType } from './user-type';

export interface ChatType {
  id: number;
  chatName: string;
  users: OtherUserType[];
  messagesId: number[];
}
