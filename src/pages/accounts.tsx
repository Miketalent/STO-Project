import React, { useState } from 'react'
import AdminPage from './admin'
import NotWhitelisted from './notwhitelisted'
import Whitelisted from './whitelisted'
import { useAccount, useContractReads } from 'wagmi'
import ERC1400TokensValidatorABI from '../lib/abi/ERC1400TokensValidator.abi.json'

interface Role {
  isAdmin: boolean;
  isWhitelisted: boolean;
}

export default function Accounts() {
  const { address, connector, isConnected } = useAccount()
  const [roleData, setRoleData] = useState<Role>();
  let roleView = <>Loading Account...</>

  const tokensValidatorContract = {
    address: process.env.NEXT_PUBLIC_TOKENS_VALIDATOR_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensValidatorABI,
  }

  // Check user role
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...tokensValidatorContract,
        functionName: 'isAllowlisted',
        args: [process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS, address]
      },
      {
        ...tokensValidatorContract,
        functionName: 'isAllowlistAdmin',
        args: [process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS, address]
      }
    ],

    onError(error) {
      console.log('Error fetching role', error)
    },

    onSuccess(data) {
      const isWhitelisted = data[0] as boolean;
      const isAdmin = data[1] as boolean;

      setRoleData({
        isAdmin: isAdmin,
        isWhitelisted: isWhitelisted
      })
    },
  })

  if (isLoading) {
    roleView = <>Loading Account...</>  
  }

  if(roleData && roleData.isAdmin) {
    roleView = <AdminPage/>
  } else if(roleData && roleData.isWhitelisted) {
    roleView = <Whitelisted/>
  } else {
    roleView = <NotWhitelisted/>
  }

  return (
    <>
      <div>
        {roleView}
      </div>
    </>
  )
}
