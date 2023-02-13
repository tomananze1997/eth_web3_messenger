import { contractClass } from 'const';
import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';

export const useIsConnected = () => {
  const { address, isDisconnected } = useAccount();

  const { data, isLoading } = useContractRead({
    address: !isDisconnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.DOES_USER_EXIST,
    overrides: { from: address }
  });

  useEffect(() => {
    !isLoading && console.log('Does user exist: ', data);
  }, [address, data]);

  return {
    currentUserAddress: address,
    isConnected: !isDisconnected,
    userExists: data === true && !isLoading
  };
};
