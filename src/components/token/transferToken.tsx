import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const TransferToken = () => {
  const [transferAmount, setTransferAmount] = useState(0)
  const [toAddress, setToAddress] = useState("")
  const { address, connector, isConnected } = useAccount()

  const { handleSubmit, register} = useForm({
    mode: 'onSubmit',
  });

  /** INTERNAL FUNCTION DECLARATION */
  const getFormData = (formData) => {
    const {address, amount} = formData
    setToAddress(address)
    setTransferAmount(amount)
  }

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
    functionName: 'transfer',
    args: [toAddress as `${string}`, transferAmount, {gasLimit: 1300000, value: 0}],
    enabled: false,
  })

  // eslint-disable-next-line no-var
  var { data, isLoading, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    write?.()
  }, [toAddress, transferAmount])

  // eslint-disable-next-line no-var
  var { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  })

  if(isLoading) {
    return (<>Transferring...</>)
  }

  if(isSuccess) {
    alert("success")
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit(getFormData)}>
        <div>
            <label>Enter address to transfer to: </label>
            <input {...register('address')} type="text" placeholder='enter receiver address'/>
        </div>
        <div>
            <label>Enter token amount to Transfer: </label>
            <input {...register('amount')} type="number" placeholder='enter token amount'/>
            <button type="submit">Transfer</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default TransferToken;
