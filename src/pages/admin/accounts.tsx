import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useContract, useContractRead, useContractWrite, usePrepareContractWrite, useProvider, useWaitForTransaction } from "wagmi";
import ERC1400TokensValidatorABI from '../../lib/abi/ERC1400TokensValidator.abi.json'
import Link from 'next/link'

interface WhitelistState {
  targetAddress: string;
  validForWhitelist: boolean;
  toWhitelist: boolean
}

const initialWhitelist: WhitelistState = {
  targetAddress: "",
  validForWhitelist: false,
  toWhitelist: true
}

const Accounts = () => {
  const [whitelistState, setWhitelistState] = useState<WhitelistState>(initialWhitelist);

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });

  /** INTERNAL FUNCTION DECLARATION */
  const whitelistAddress = (formData) => {
    const {targetAddress} = formData

    // validate address
    if(!ethers.utils.isAddress(targetAddress)) return alert("invalid address");

    setWhitelistState({
      targetAddress: targetAddress,
      validForWhitelist: false,
      toWhitelist: true
    })
  }

  // Check if account has been whitelisted
  const tokensValidatorContract = {
    address: process.env.NEXT_PUBLIC_TOKENS_VALIDATOR_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensValidatorABI,
  }

  // eslint-disable-next-line no-var
  var {data, isError, isLoading } = useContractRead({
    ...tokensValidatorContract,
    functionName: 'isAllowlisted',
    args: [process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS, whitelistState.targetAddress],
    enabled: true,
    onError(error) {
      console.log('Error fetching role', error)
    },
    onSettled(data) {
      if(data) {
        alert(`address ${whitelistState.targetAddress} is whitelisted! Removing now..`);
      } else {
        alert(`address ${whitelistState.targetAddress} is Not Whitelisted! Adding now..`);
      }

      setWhitelistState({
        ...whitelistState,
        validForWhitelist: true,
        toWhitelist: data ? false : true
      })

      //write?.()

      setWhitelistState(initialWhitelist)
    },
  })

  /** Whitelist user */
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_VALIDATOR_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensValidatorABI,
    functionName: whitelistState.toWhitelist ? 'addAllowlisted' : 'removeAllowlisted',
    args: [process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS, whitelistState.targetAddress, {gasLimit: 1300000, value: 0}],
    enabled: whitelistState.validForWhitelist,
  })

  // eslint-disable-next-line no-var
  var { data, isLoading, isSuccess, write } = useContractWrite(config)

  // useEffect(() => {
  //   write?.()
  // }, [whitelistState.targetAddress])

  // eslint-disable-next-line no-var
  var { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  })

  if(isLoading) {
    return (<>Loading...</>)
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(whitelistAddress)}>
          <input {...register('targetAddress')} type="text" name="targetAddress" />
          <button type="submit" placeholder="address">Whitelist/DeWhitelist address</button>
        </form>
      </div>
      <div>
          <Link href='../accounts'>My Account</Link>
        </div>
        <div>
          <Link href='/'>Home</Link>
        </div>
    </>
  )
}

export default Accounts;
