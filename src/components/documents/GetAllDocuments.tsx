import { useState } from 'react';
import { useContractRead } from 'wagmi';
import { IGetAllDocuments } from '../../interfaces/documents/IDocuments';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const initialPageProp: IGetAllDocuments = {
  isFetchAllDocuments: false,
  allDocuments: [],
}

export default function GetAllDocuments() {
  const [pageProp, setPageProp] = useState<IGetAllDocuments>(initialPageProp);
  const tokensContract = {
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
  }

  const {data, isError, isLoading} = useContractRead({
    ...tokensContract,
    functionName: 'getAllDocuments',
    enabled: pageProp.isFetchAllDocuments,
    onError(error) {
      console.log('Error fetching onchain data', error)
    },
    onSettled(data) {
      console.log(data)
      setPageProp({
        ...pageProp,
        allDocuments: data as string[]
      })
    },
  })

  const fetchAllDocuments = () => {
    setPageProp({
      ...pageProp,
      isFetchAllDocuments: true
    })
  }

  if(isLoading) {
    return (<>Loading...</>)
  }

  return (
  <>
    <div>
      <button className="buttun_sunray" onClick={fetchAllDocuments}>Get All Documents</button>
      <br/>
      {
        pageProp.allDocuments.map((document, index) => {
            return index+1 + '. ' + document
      })
      }
    </div>
  </>)
}