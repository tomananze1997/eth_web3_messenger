import { SelectedContentContext } from './SelectedContentContext';
import { useWeb3Provider } from 'providers';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { ChatType, OtherUserType, UserType } from 'types';

type SelectedContentProviderTypes = {
  children: React.ReactNode;
};

export const SelectedContentProvider: FC<SelectedContentProviderTypes> = ({
  children
}) => {
  const [currentUser] = useWeb3Provider();

  const [activeInfoContent, setActiveInfoContent] = useState<
    OtherUserType | ChatType | UserType | null
  >(null);
  const [activeChatContent, setActiveChatContent] = useState<ChatType | null>(
    null
  );

  useEffect(() => {
    setActiveInfoContent(currentUser);
  }, [currentUser]);

  return (
    <SelectedContentContext.Provider
      value={{
        activeInfoContent,
        activeChatContent,
        setActiveInfoContent,
        setActiveChatContent
      }}
    >
      {children}
    </SelectedContentContext.Provider>
  );
};
