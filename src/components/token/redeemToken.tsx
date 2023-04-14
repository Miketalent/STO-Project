import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const RedeemToken = () => {
  const [redeemAmount, setRedeemAmount] = useState(0)
  const [otherNote, setOtherNote] = useState("")
  const { address, connector, isConnected } = useAccount()

  const { handleSubmit, register} = useForm({
    mode: 'onSubmit',
  });

  /** INTERNAL FUNCTION DECLARATION */
  const getFormData = (formData) => {
    const {amount, note} = formData
    setRedeemAmount(amount)
    setOtherNote(ethers.utils.formatBytes32String(note))
  }

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
    functionName: 'redeem',
    args: [redeemAmount, otherNote, {gasLimit: 1300000, value: 0}],
    enabled: false,
  })

  // eslint-disable-next-line no-var
  var { data, isLoading, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    write?.()
  }, [redeemAmount, otherNote])

  // eslint-disable-next-line no-var
  var { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  })

  if(isLoading) {
    return (<>redeeming...</>)
  }

  if(isSuccess) {
    alert("success")
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit(getFormData)}>
        <div>
            <label>Enter token amount to redeem: </label>
            <input {...register('amount')} type="number" placeholder='enter token amount'/>
        </div>
        <div>
            <label>Enter any other notes: </label>
            <input {...register('note')} type="text" placeholder='enter any other notes'/>
            <button type="submit">Redeem</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default RedeemToken;
