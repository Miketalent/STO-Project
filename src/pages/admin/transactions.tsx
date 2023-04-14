import React from 'react'
import Link from 'next/link'
import IssueToken from '../../components/token/issueToken';
import TransferToken from '../../components/token/transferToken';
import SetTxHash from '../../components/requests/setIssuedTxHash';

const ManageTransactionsPage = () => {

  return (
      <div>
        <h1>Manage Transactions</h1>
        <div>
          <IssueToken />
        </div>
        <div>
          <TransferToken />
        </div>
        <br></br>
        <div>
            <SetTxHash />
        </div>
        <div>
          <Link href='/'>Home</Link>
        </div>
        <div>
          <Link href='/dapp'>Dapp</Link>
        </div>
      </div>
  )
}

export default ManageTransactionsPage