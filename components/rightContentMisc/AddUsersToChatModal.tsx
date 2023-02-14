import classNames from 'classnames';
import { UserIcon } from 'components';
import { contractClass } from 'const';
import type { Dispatch, FC, LegacyRef, SetStateAction } from 'react';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import type { OtherUserType } from 'types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type AddUsersToChatModalTypes = {
  innerRef: LegacyRef<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  otherUsers: OtherUserType[];
  chatId: number;
};

export const AddUsersToChatModal: FC<AddUsersToChatModalTypes> = ({
  innerRef,
  isOpen,
  setIsOpen,
  otherUsers,
  chatId
}) => {
  const userAreaStyle = 'mx-auto h-1/3 w-4/5 overflow-y-auto bg-slate-100 ';

  const [availableUsers, setAvailableUsers] =
    useState<OtherUserType[]>(otherUsers);
  const [selectedUsers, setSelectedUsers] = useState<OtherUserType[]>([]);
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([]);

  const { config } = usePrepareContractWrite({
    address:
      selectedUsersId.length > 0 ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.ADD_USERS_TO_CHAT,
    args: [chatId, selectedUsersId]
  });

  const { write } = useContractWrite(config);

  const handleAddUser = (id: number) => {
    let newAvailableUsers: OtherUserType[] = [];
    const newSelectedUsers: OtherUserType[] = selectedUsers;
    const newSelectedUsersId: number[] = selectedUsersId;

    newAvailableUsers = availableUsers.filter(
      (user: OtherUserType) => user.id !== id
    );

    const selectedElement = otherUsers.find(
      (user: OtherUserType) => user.id === id
    );

    if (selectedElement) {
      newSelectedUsers.push(selectedElement);
      newSelectedUsersId.push(selectedElement.id);
    }

    setAvailableUsers(newAvailableUsers);
    setSelectedUsers(newSelectedUsers);
    setSelectedUsersId(newSelectedUsersId);
  };

  const handleRemoveUser = (id: number) => {
    const newAvailableUsers: OtherUserType[] = [];
    let newSelectedUsers: OtherUserType[] = selectedUsers;
    let newSelectedUsersId: number[] = selectedUsersId;

    newSelectedUsers = selectedUsers.filter(
      (user: OtherUserType) => user.id !== id
    );

    newSelectedUsersId = selectedUsersId.filter(
      (userId: number) => userId !== id
    );

    const selectedElement = otherUsers.find(
      (user: OtherUserType) => user.id === id
    );

    selectedElement && newAvailableUsers.push(selectedElement);

    setAvailableUsers(newAvailableUsers);
    setSelectedUsers(newSelectedUsers);
    setSelectedUsersId(newSelectedUsersId);
  };

  const handleClick = () => {
    write?.();

    setSelectedUsers([]);
    setSelectedUsersId([]);
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={innerRef}
        className={classNames(
          'fixed top-1/2 left-1/2 flex h-96 w-96 -translate-y-1/2 -translate-x-1/2 flex-col rounded-xl bg-white bg-slate-400 p-5 shadow-2xl shadow-black dark:bg-slate-900',
          {
            'hidden ': !isOpen
          }
        )}
      >
        <MdClose
          className={'absolute right-1 top-1 cursor-pointer'}
          onClick={() => setIsOpen(!isOpen)}
        />
        <h2>Available users:</h2>
        <div className={userAreaStyle}>
          {availableUsers.map((user: OtherUserType) => (
            <span key={user.id} onClick={() => handleAddUser(user.id)}>
              <UserIcon user={user} otherStyles={'m-1'} />
            </span>
          ))}
        </div>

        <h2>Selected users:</h2>
        <div
          className={classNames(userAreaStyle, {
            'border-2 border-red-500 ': selectedUsers.length === 0
          })}
        >
          {selectedUsers.map((user: OtherUserType) => (
            <span key={user.id} onClick={() => handleRemoveUser(user.id)}>
              <UserIcon user={user} otherStyles={'m-1'} />
            </span>
          ))}
        </div>

        <button
          className={
            'mx-auto mt-4 rounded-xl bg-green-300 py-1 px-2 font-bold hover:opacity-90 active:scale-95 active:opacity-80 disabled:opacity-50 dark:bg-green-700'
          }
          onClick={handleClick}
          disabled={selectedUsersId.length === 0}
        >
          Add users to chat
        </button>
      </div>
    </>
  );
};
