import { contractClass } from 'const';
import { useEffect } from 'react';
import { useAccount, useContractEvent, useContractRead } from 'wagmi';

export const useIsConnected = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data, isLoading, refetch } = useContractRead({
    address: !isDisconnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.DOES_USER_EXIST,
    overrides: { from: address }
  });

  useContractEvent({
    address:
      !isDisconnected && !isConnecting
        ? contractClass.GOERLI_ADDRESS
        : undefined,
    abi: contractClass.ABI,
    eventName: contractClass.USERS_CHANGED,
    listener() {
      refetch();
    }
  });

  useEffect(() => {
    refetch();
  }, [address]);

  return {
    currentUserAddress: address,
    isConnected: !isDisconnected && !isConnecting,
    userExists: data === true && !isLoading
  };
};
