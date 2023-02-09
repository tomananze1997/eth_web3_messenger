import type { MessageType } from './message-type';
import type { UserType } from './user-type';

export interface ChatType {
  id: string;
  chatName: string;
  users: UserType[];
  messages: MessageType[];
}
