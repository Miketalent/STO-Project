import { ethers } from 'ethers';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { IDocument, IRemoveDocument } from '../../interfaces/documents/IDocuments';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const initialPageProp: IRemoveDocument = {
  documentName: "",
}

export default function RemoveDocument() {
  const [pageProp, setPageProp] = useState<IRemoveDocument>(initialPageProp);

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
    functionName: "removeDocument",
    args: [pageProp.documentName, {gasLimit: 1300000, value: 0}],
    enabled: Boolean(pageProp.documentName),
  })

  // eslint-disable-next-line no-var
  var { data, isLoading, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    write?.()
  }, [pageProp])

  const executeRemoveDocument = (formData) => {
    const {documentName} = formData

    setPageProp({
      documentName: ethers.utils.formatBytes32String(documentName),
    })
  }

  // eslint-disable-next-line no-var
  var { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  })

  if(isLoading) {
    return (<>Loading...</>)
  }
  
  return(
    <>
      <form onSubmit={handleSubmit(executeRemoveDocument)}>
        <input {...register('documentName')} type="text" name="documentName" placeholder='document name to be removed' />
        <br/>
        <button type="submit" placeholder="address">Remove Document</button>
      </form>
    </>
  )
}
