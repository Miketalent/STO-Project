import Link from 'next/link'

export default function AdminPage() {
    return (
      <>
        <div>
          <h1>Admin Page</h1>  
          <p>Manage tokens, accounts, and documents</p>
        </div>
        <div>
            <button className="button_sunray" onClick={()=>{window.location.href = "/admin/accounts"}}>Manage Accounts</button>
            <button className="button_sunray" onClick={()=>{window.location.href = "/admin/documents"}}>Manage Documents</button>
            <button className="button_sunray" onClick={()=>{window.location.href = "/admin/transactions"}}>Manage Transactions</button>
        </div>
        <div>
          <Link href='/dapp'>Dapp</Link>
        </div>
        <div>
          <Link href='/'>Home</Link>
        </div>
      </>
    )
  }