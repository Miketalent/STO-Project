import React, { useState } from 'react';
import { useContractRead, useAccount } from 'wagmi';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'


const GetTokenBalance = () => {
  const [tokenBalance, setTokenBalance] = useState();
  const { address, connector, isConnected } = useAccount()

  const tokensContract = {
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
  }

  const {data, isError, isLoading} = useContractRead({
    ...tokensContract,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: true,
    onError(error) {
      console.log('Error fetching balance', error)
    },
    onSettled(data) {
        console.log(data)
        setTokenBalance(data? data.toString() : 0)
    },
  })
  
  return (
    <>
    <div>
      My Token Balance: {tokenBalance}<br></br>
    </div>
    </>
  );
};

export default GetTokenBalance;
