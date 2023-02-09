import type { UserType } from './user-type';

export interface MessageType {
  id: string;
  owner: UserType;
  text: string;
  changedAt: string;
  isChanged: boolean;
}
