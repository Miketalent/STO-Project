import { ethers } from 'ethers';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useState } from 'react';
import { useContractRead } from 'wagmi';
import { IDocument, IGetDocument } from '../../interfaces/documents/IDocuments';
import ERC1400TokensABI from '../../lib/abi/ERC1400.abi.json'

const initialPageProp: IGetDocument = {
  documentName: "",
  documentData: {} as IDocument
}

export default function GetDocument() {
  const [pageProp, setPageProp] = useState<IGetDocument>(initialPageProp);
  const tokensContract = {
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC1400TokensABI,
  }

  const {data, isError, isLoading} = useContractRead({
    ...tokensContract,
    functionName: 'getDocument',
    args: [pageProp.documentName ? ethers.utils.formatBytes32String(pageProp.documentName) : ""],
    enabled: Boolean(pageProp.documentName),
    onError(error) {
      console.log('Error fetching onchain data', error)
      setPageProp({
        ...pageProp,
        documentName: "",
      })
      return alert("Document not found");
    },
    onSuccess(data) {
      console.log(data)
      if(data) { 
        const tempDocumentData: IDocument = {
          docUri: data[0],
          docHash: data[1],
          docTimestamp: data[2].toNumber(),
        }
        setPageProp({
          documentName: "",
          documentData: tempDocumentData
        })
      }
    },
  })

  const fetchDocument = () => {
    const name = prompt("Please enter document name:")
    if(name == "") return;

    setPageProp({
      ...pageProp,
      documentName: name,
    })
  }

  if(isLoading) {
    return (<>Loading...</>)
  }

  return (
  <>
    <button className="buttun_sunray" onClick={fetchDocument}>Get Document</button>
    {pageProp.documentData.docUri ? 
      <div>
        <p>Document Uri: {pageProp.documentData.docUri}</p>
        <p>Document Hash: {pageProp.documentData.docHash}</p>
        <p>Document Timestamp: {pageProp.documentData.docTimestamp}</p>
      </div>
    : <div></div>}
  </>)
}
