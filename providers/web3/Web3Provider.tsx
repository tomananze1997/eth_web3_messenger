import { Web3Context } from './Web3Context';
import { contractClass } from 'const';
import { BigNumber } from 'ethers';
import { useIsConnected } from 'hooks';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import type {
  ChatResponse,
  ChatType,
  OtherUserType,
  UserResponse,
  UserType
} from 'types';
import { useContractEvent, useContractRead } from 'wagmi';

type useWeb3ProviderTypes = {
  children: React.ReactNode;
};

export const Web3Provider: FC<useWeb3ProviderTypes> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userChats, setUserChats] = useState<ChatType[]>([]);
  const [allUsers, setAllUsers] = useState<OtherUserType[]>([]);

  const { currentUserAddress, isConnected, userExists } = useIsConnected();

  const currentUserResponse = useContractRead({
    address:
      isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    enabled: isConnected && userExists,
    functionName: contractClass.GET_CURRENT_USER,
    overrides: { from: currentUserAddress }
  });

  const allUsersResponse = useContractRead({
    address:
      isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    enabled: isConnected && userExists,
    functionName: contractClass.GET_ALL_USERS,
    overrides: { from: currentUserAddress }
  });

  const allUserChatsResponse = useContractRead({
    address:
      isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    enabled: isConnected && userExists,
    functionName: contractClass.GET_ALL_USER_CHATS,
    overrides: { from: currentUserAddress }
  });

  useContractEvent({
    address:
      isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    eventName: contractClass.USERS_CHANGED,
    listener() {
      currentUserResponse.refetch();
      allUsersResponse.refetch();
      allUserChatsResponse.refetch();
    }
  });

  useContractEvent({
    address:
      isConnected && userExists ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    eventName: contractClass.CHATS_CHANGED,
    listener() {
      currentUserResponse.refetch();
      allUsersResponse.refetch();
      allUserChatsResponse.refetch();
    }
  });

  useEffect(() => {
    if (isConnected && userExists) {
      setAllUsersArray();
      setUserChatsArray(); //must be behind setAllUsersArray!!
      setCurrentUserArray(); //must be behind setUserChatsArray!!
    } else {
      setCurrentUser(null);
      setUserChats([]);
      setAllUsers([]);
    }
  }, [
    currentUserResponse.data,
    allUsersResponse.data,
    allUserChatsResponse.data,
    currentUserAddress
  ]);

  const setAllUsersArray = (): void => {
    const newUsersArray: OtherUserType[] = [];
    let newUsersResponseArray: UserResponse[] = [];

    if (
      allUsersResponse.data &&
      !allUsersResponse.isLoading &&
      !allUsersResponse.isError
    ) {
      newUsersResponseArray = allUsersResponse.data as UserResponse[];

      if (newUsersResponseArray.length > 0) {
        newUsersResponseArray.forEach((user: UserResponse) => {
          const newChatsId = user.chatsId.map((chat: string) =>
            BigNumber.from(chat).toNumber()
          );

          newUsersArray.push({
            ...user,
            id: BigNumber.from(user.id).toNumber(),
            chatsId: newChatsId,
            darkColor: getDarkColor(),
            lightColor: getLightColor()
          });
        });
      }
    }

    setAllUsers(newUsersArray);
  };

  const setUserChatsArray = (): void => {
    const newUserChats: ChatType[] = [];
    let newChatsResponseArray: ChatResponse[] = [];

    if (
      allUserChatsResponse.data &&
      !allUserChatsResponse.isLoading &&
      !allUserChatsResponse.isError
    ) {
      newChatsResponseArray = allUserChatsResponse.data as ChatResponse[];

      if (newChatsResponseArray.length > 0) {
        newChatsResponseArray.forEach((chat: ChatResponse) => {
          const newUsers: OtherUserType[] = [];

          allUsers.forEach((user: OtherUserType) =>
            chat.usersId.forEach((userId: string) => {
              if (BigNumber.from(userId).toNumber() == user.id) {
                newUsers.push(user);
              }
            })
          );

          const newMessagesId = chat.messagesId.map((element: string) =>
            BigNumber.from(element).toNumber()
          );

          newUserChats.push({
            ...chat,
            id: BigNumber.from(chat.id).toNumber(),
            users: newUsers,
            messagesId: newMessagesId
          });
        });
      }
    }

    setUserChats(newUserChats);
  };

  const setCurrentUserArray = (): void => {
    let newUser: UserType | null = null;

    if (
      currentUserResponse.data &&
      !currentUserResponse.isLoading &&
      !currentUserResponse.isError
    ) {
      const { id, username, userAddress } =
        currentUserResponse.data as UserResponse;

      newUser = {
        id: BigNumber.from(id).toNumber(),
        darkColor: getDarkColor(),
        lightColor: getLightColor(),
        chats: userChats,
        username: username,
        userAddress: userAddress
      };
    }

    setCurrentUser(newUser);
  };

  const getDarkColor = (): string => {
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }

    return color;
  };

  const getLightColor = (): string => {
    const letters = 'BCDEF'.split('');
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
  };

  return (
    <Web3Context.Provider
      value={{
        currentUser,
        userChats,
        allUsers
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
