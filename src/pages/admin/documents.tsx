import React, { useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi';
import GetAllDocuments from '../../components/documents/GetAllDocuments';
import GetDocument from '../../components/documents/GetDocument';
import SetDocument from '../../components/documents/SetDocument';
import RemoveDocument from '../../components/documents/RemoveDocument';

export default function ManageDocumentsPage(props) {
  const { address, connector, isConnected } = useAccount()
  const [balance, setBalance] = useState()

  return (
      <div>
        <h1>Manage Documents</h1>
        <div>
          <SetDocument/>
        </div>
        <div>
          <br/>
          <RemoveDocument/>
        </div>
        <div>
          <br/>
          <GetDocument/>
        </div>
        <div>
          <br/>
          <GetAllDocuments/>
        </div>
        <div></div>
        <div>
          <br/>
          <Link href='/'>Home</Link>
        </div>  
        <div>
          <Link href='/dapp'>Dapp</Link>
        </div>
      </div>
  )
}
