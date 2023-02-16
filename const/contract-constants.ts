export const contractClass = {
  ABI: [
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
      name: 'getCurrentUser',
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
          internalType: 'struct Messenger.User',
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
        },
        {
          internalType: 'uint256[]',
          name: 'newUsersId',
          type: 'uint256[]'
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
  ],
  GANACHE_ADDRESS: '',
  GOERLI_ADDRESS: '0x359f571B2209E5c0292284B1Fedbb951113304E5',

  //EVENTS
  USERS_CHANGED: 'UsersChanged',
  CHATS_CHANGED: 'ChatsChanged',
  MESSAGES_CHANGED: 'MessagesChanged',

  //USERS
  DOES_USER_EXIST: 'doesUserExist',
  CREATE_USER: 'createUser',
  GET_CURRENT_USER: 'getCurrentUser',
  GET_ALL_USERS: 'getAllUsers',

  //CHATS
  CREATE_CHAT: 'createChat',
  ADD_USERS_TO_CHAT: 'addUsersToChat',
  GET_ALL_USER_CHATS: 'getAllUserChats',
  LEAVE_CHAT: 'leaveChat',

  //MESSAGES
  CREATE_MESSAGE: 'createMessage',
  CHANGE_MESSAGE: 'changeMessage',
  GET_ALL_MESSAGES_IN_CHAT: 'getAllMessagesInChat',
  DELETE_MESSAGE: 'deleteMessage'
};
