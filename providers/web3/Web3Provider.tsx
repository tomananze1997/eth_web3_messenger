// import { contractClass } from 'const';
// import { useIsConnected } from 'hooks';
// import type { FC } from 'react';
// import {  useState } from 'react';
// import type { UserResponse, UserType } from 'types';
// import { useContractEvent, useContractRead } from 'wagmi';
//
// export const Web3Provider: FC = () => {
//   const [currentUser, setCurrentUser] = useState<UserType | null>(null);
//   const [allUsers, setAllUsers] = useState<UserResponse | null>(null);
//
//   const { currentUserAddress, isConnected, userExists } = useIsConnected();
//
//   const currentUserResponse = useContractRead({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     functionName: contractClass.GET_CURRENT_USER
//   });
//
//   const allUsersResponse = useContractRead({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     functionName: contractClass.GET_ALL_USERS
//   });
//
//   const allUserChats = useContractRead({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     functionName: contractClass.GET_ALL_USER_CHATS
//   });
//
//   const allUsersInChat = useContractRead({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     functionName: contractClass.GET_ALL_USERS_IN_CHAT
//   });
//
//   const allMessagesInChat = useContractRead({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     functionName: contractClass.GET_ALL_MESSAGES_IN_CHAT
//   });
//
//   useContractEvent({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     eventName: contractClass.USERS_CHANGED,
//     listener() {
//       console.log('User has changed');
//     }
//   });
//
//   useContractEvent({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     eventName: contractClass.CHATS_CHANGED,
//     listener() {
//       console.log('Chats has changed');
//     }
//   });
//
//   useContractEvent({
//     address:
//       isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
//     abi: contractClass.ABI,
//     eventName: contractClass.MESSAGES_CHANGED,
//     listener() {
//       console.log('Messages has changed');
//     }
//   });
//
// };
