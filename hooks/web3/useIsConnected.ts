import { contractClass } from 'const';
import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';

export const useIsConnected = () => {
  const { address, isDisconnected } = useAccount();

  const { data, isLoading } = useContractRead({
    address: !isDisconnected ? contractClass.GOERLI_ADDRESS : undefined,
    abi: contractClass.ABI,
    functionName: contractClass.DOES_USER_EXIST
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    console.log(data);
  }, [address, data]);

  return {
    currentUserAddress: address,
    isConnected: !isDisconnected,
    userExists: data === true && !isLoading
  };
};
