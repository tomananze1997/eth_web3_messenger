export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [],
    name: 'ChatsChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'MessagesChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UsersChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'senderAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'senderUsername',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'chatName',
        type: 'string'
      }
    ],
    name: 'newChatEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'senderAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'senderUsername',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string'
      }
    ],
    name: 'newMessageEvent',
    type: 'event'
  },
  {
    inputs: [],
    name: 'doesUserExist',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string'
      }
    ],
    name: 'createUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllUsers',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'chatsId',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'username',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address'
          }
        ],
        internalType: 'struct Messenger.User[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'chatName',
        type: 'string'
      }
    ],
    name: 'createChat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: 'newUsersId',
        type: 'uint256[]'
      }
    ],
    name: 'addUsersToChat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      }
    ],
    name: 'getChat',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'chatName',
            type: 'string'
          },
          {
            internalType: 'uint256[]',
            name: 'usersId',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'messagesId',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct Messenger.Chat',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'getAllUserChats',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'chatName',
            type: 'string'
          },
          {
            internalType: 'uint256[]',
            name: 'usersId',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'messagesId',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct Messenger.Chat[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      }
    ],
    name: 'getAllUsersInChat',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'chatsId',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'username',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address'
          }
        ],
        internalType: 'struct Messenger.User[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      }
    ],
    name: 'leaveChat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'text',
        type: 'string'
      }
    ],
    name: 'createMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'messageId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'text',
        type: 'string'
      }
    ],
    name: 'changeMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chatId',
        type: 'uint256'
      }
    ],
    name: 'getAllMessagesInChat',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
              },
              {
                internalType: 'uint256[]',
                name: 'chatsId',
                type: 'uint256[]'
              },
              {
                internalType: 'string',
                name: 'username',
                type: 'string'
              },
              {
                internalType: 'address',
                name: 'userAddress',
                type: 'address'
              }
            ],
            internalType: 'struct Messenger.User',
            name: 'owner',
            type: 'tuple'
          },
          {
            internalType: 'string',
            name: 'text',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'changedAt',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isChanged',
            type: 'bool'
          }
        ],
        internalType: 'struct Messenger.Message[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'messageId',
        type: 'uint256'
      }
    ],
    name: 'deleteMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export const GANACHE_CONTRACT_ADDRESS =
  '0xdC0d208aF3Bc2F46C40083B0e8c430e30857df31';
export const GOERLI_CONTRACT_ADDRESS =
  '0xdC0d208aF3Bc2F46C40083B0e8c430e30857df31';

//EVENTS
export const USERS_CHANGED = 'UsersChanged';
export const CHATS_CHANGED = 'ChatsChanged';
export const MESSAGES_CHANGED = 'MessagesChanged';
export const NEW_MESSAGE_EVENT = 'newMessageEvent';
export const NEW_CHAT_EVENT = 'newChatEvent';

//USERS
export const DOES_USER_EXIST = 'doesUserExist';
export const CREATE_USER = 'createUser';
export const GET_ALL_USERS = 'getAllUsers';

//CHATS
export const CREATE_CHAT = 'createChat';
export const ADD_USERS_TO_CHAT = 'addUsersToChat';
export const GET_CHAT = 'getChat';
export const GET_ALL_USER_CHATS = 'getAllUserChats';
export const GET_ALL_USERS_IN_CHAT = 'getAllUsersInChat';
export const LEAVE_CHAT = 'leaveChat';

//MESSAGES
export const CREATE_MESSAGE = 'createMessage';
export const CHANGE_MESSAGE = 'changeMessage';
export const GET_ALL_MESSAGES_IN_CHAT = 'getAllMessagesInChat';
export const DELETE_MESSAGE = 'deleteMessage';
