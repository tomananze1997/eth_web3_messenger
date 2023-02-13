import type BigNumber from 'bignumber.js';
import type BN from 'bn.js';
import type {
  EventData,
  EventResponse,
  PromiEvent,
  TransactionReceipt,
  Web3ContractContext
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;

  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;

  estimateGas(options: EstimateGasOptions): Promise<number>;

  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;

  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;

  call(options: CallOptions): Promise<TCallReturn>;

  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;

  encodeABI(): string;
}

export type MethodReturnContext = MethodPayableReturnContext;

export type ContractContext = Web3ContractContext<
  MessengerContractType,
  MessengerContractTypeMethodNames,
  MessengerContractTypeEventsContext,
  MessengerContractTypeEvents
>;
export type MessengerContractTypeEvents =
  | 'ChatsChanged'
  | 'MessagesChanged'
  | 'UsersChanged'
  | 'newChatEvent'
  | 'newMessageEvent';

export interface MessengerContractTypeEventsContext {
  ChatsChanged(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;

  MessagesChanged(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;

  UsersChanged(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;

  newChatEvent(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;

  newMessageEvent(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}

export type MessengerContractTypeMethodNames =
  | 'doesUserExist'
  | 'createUser'
  | 'getAllUsers'
  | 'createChat'
  | 'addUsersToChat'
  | 'getChat'
  | 'getAllUserChats'
  | 'getAllUsersInChat'
  | 'leaveChat'
  | 'createMessage'
  | 'changeMessage'
  | 'getAllMessagesInChat'
  | 'deleteMessage';

export interface NewChatEventEventEmittedResponse {
  senderAddress: string;
  senderUsername: string;
  chatName: string;
}

export interface NewMessageEventEventEmittedResponse {
  senderAddress: string;
  senderUsername: string;
  message: string;
}

export interface UserResponse {
  id: string;
  chatsId: string[];
  username: string;
  userAddress: string;
}

export interface ChatResponse {
  id: string;
  chatName: string;
  usersId: string[];
  messagesId: string[];
}

export interface OwnerResponse {
  id: string;
  chatsId: string[];
  username: string;
  userAddress: string;
}

export interface MessageResponse {
  id: string;
  owner: OwnerResponse;
  text: string;
  changedAt: string;
  isChanged: boolean;
}

export interface MessengerContractType {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  doesUserExist(): MethodConstantReturnContext<boolean>;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param username Type: string, Indexed: false
   */
  createUser(username: string): MethodReturnContext;

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllUsers(): MethodConstantReturnContext<UserResponse[]>;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chatName Type: string, Indexed: false
   */
  createChat(chatName: string): MethodReturnContext;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   * @param newUsersId Type: uint256[], Indexed: false
   */
  addUsersToChat(chatId: string, newUsersId: string[]): MethodReturnContext;

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   */
  getChat(chatId: string): MethodConstantReturnContext<ChatResponse>;

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllUserChats(): MethodConstantReturnContext<ChatResponse[]>;

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   */
  getAllUsersInChat(
    chatId: string
  ): MethodConstantReturnContext<UserResponse[]>;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   */
  leaveChat(chatId: string): MethodReturnContext;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   * @param text Type: string, Indexed: false
   */
  createMessage(chatId: string, text: string): MethodReturnContext;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param messageId Type: uint256, Indexed: false
   * @param text Type: string, Indexed: false
   */
  changeMessage(messageId: string, text: string): MethodReturnContext;

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chatId Type: uint256, Indexed: false
   */
  getAllMessagesInChat(
    chatId: string
  ): MethodConstantReturnContext<MessageResponse[]>;

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param messageId Type: uint256, Indexed: false
   */
  deleteMessage(messageId: string): MethodReturnContext;
}
