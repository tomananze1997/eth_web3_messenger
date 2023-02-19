import classNames from 'classnames';
import { CustomButton, UserIcon } from 'components';
import { contractClass } from 'const';
import type {
  ChangeEvent,
  Dispatch,
  FC,
  LegacyRef,
  SetStateAction
} from 'react';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import type { OtherUserType, UserType } from 'types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

type NewChatModalTypes = {
  innerRef: LegacyRef<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  allUsers: OtherUserType[];
  currentUser: UserType;
};

export const NewChatModal: FC<NewChatModalTypes> = ({
  innerRef,
  isOpen,
  setIsOpen,
  allUsers,
  currentUser
}) => {
  const userAreaStyle = 'mx-auto h-1/3 w-4/5 overflow-y-auto bg-slate-100 ';
  const [availableUsers, setAvailableUsers] =
    useState<OtherUserType[]>(allUsers);
  const [selectedUsers, setSelectedUsers] = useState<OtherUserType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([]);

  const { config } = usePrepareContractWrite({
    address: inputValue !== '' ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.CREATE_CHAT,
    args: [inputValue, selectedUsersId]
  });

  const { write } = useContractWrite(config);

  const handleAddUser = (id: number): void => {
    let newAvailableUsers: OtherUserType[] = [];
    const newSelectedUsers: OtherUserType[] = selectedUsers;
    const newSelectedUsersId: number[] = selectedUsersId;

    newAvailableUsers = availableUsers.filter(
      (user: OtherUserType) => user.id !== id
    );

    const selectedElement = allUsers.find(
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

  const handleRemoveUser = (id: number): void => {
    const newAvailableUsers: OtherUserType[] = availableUsers;
    let newSelectedUsers: OtherUserType[] = selectedUsers;
    let newSelectedUsersId: number[] = selectedUsersId;

    newSelectedUsers = selectedUsers.filter(
      (user: OtherUserType) => user.id !== id
    );

    newSelectedUsersId = selectedUsersId.filter(
      (userId: number) => userId !== id
    );

    const selectedElement = allUsers.find(
      (user: OtherUserType) => user.id === id
    );

    selectedElement && newAvailableUsers.push(selectedElement);

    setAvailableUsers(newAvailableUsers);
    setSelectedUsers(newSelectedUsers);
    setSelectedUsersId(newSelectedUsersId);
  };

  const handleClick = (): void => {
    if (inputValue === '') return;

    write?.();

    setInputValue('');
    setSelectedUsers([]);
    setSelectedUsersId([]);
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={innerRef}
        className={classNames(
          'fixed top-1/2 left-1/2 z-50 flex h-96 w-96 -translate-y-1/2 -translate-x-1/2 flex-col rounded-xl bg-white bg-slate-400 p-5 shadow-2xl shadow-black dark:bg-slate-900',
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
          {availableUsers.map((user: OtherUserType) =>
            user.userAddress !== currentUser?.userAddress ? (
              <span key={user.id} onClick={() => handleAddUser(user.id)}>
                <UserIcon user={user} otherStyles={'m-1'} />
              </span>
            ) : null
          )}
        </div>

        <h2>Selected users:</h2>
        <div className={userAreaStyle}>
          {selectedUsers.map((user: OtherUserType) =>
            user.userAddress !== currentUser?.userAddress ? (
              <span key={user.id} onClick={() => handleRemoveUser(user.id)}>
                <UserIcon user={user} otherStyles={'m-1'} />
              </span>
            ) : null
          )}
        </div>
        <input
          type='text'
          value={inputValue}
          placeholder={'Chat name...'}
          className={classNames(
            ' mt-3 w-full rounded-xl py-0.5 px-2 pr-8 text-black focus:outline-none',
            { 'border-2 border-red-500 ': inputValue === '' }
          )}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
        />
        <CustomButton
          disabled={inputValue === ''}
          onClick={handleClick}
          otherStyles={'bg-green-300 dark:bg-green-700'}
        >
          Create new chat
        </CustomButton>
      </div>
    </>
  );
};
