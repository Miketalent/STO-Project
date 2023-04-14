import { ethers } from 'ethers';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { IDocument, ISetDocument } from '../../interfaces/documents/IDocuments';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const initialPageProp: ISetDocument = {
  documentHash: "",
  documentUrl: "",
  documentName: "",
}

export default function SetDocument() {
  const [pageProp, setPageProp] = useState<ISetDocument>(initialPageProp);

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
    functionName: "setDocument",
    args: [pageProp.documentName, pageProp.documentUrl, pageProp.documentHash, {gasLimit: 1300000, value: 0}],
    enabled: Boolean(pageProp.documentName),
  })

  // eslint-disable-next-line no-var
  var { data, isLoading, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    write?.()
  }, [pageProp])

  const executeSetDocument = (formData) => {
    const {documentName, documentContent, documentUrl} = formData

    setPageProp({
      documentName: ethers.utils.formatBytes32String(documentName),
      documentHash: ethers.utils.formatBytes32String(documentContent),
      documentUrl: documentUrl
    })

    // write?.()
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
      <form onSubmit={handleSubmit(executeSetDocument)}>
        <input {...register('documentName')} type="text" name="documentName" placeholder='document name' />
        <input {...register('documentUrl')} type="text" name="documentUrl" placeholder='document url' />
        <input {...register('documentContent')} type="text" name="documentContent" placeholder='document content'/>
        <br/>
        <button type="submit" placeholder="address">Set Document</button>
      </form>
    </>
  )
}
