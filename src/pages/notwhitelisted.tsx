import Link from 'next/link'

export default function NotWhitelistedPage() {
    return (
      <>
        <div>
          <h1>Not Whitelisted Account</h1>  
          <p>This account is currently not on whitelist. Please apply for whitelist.</p>
        </div>
        <div>
            <button className="button_sunray" onClick={()=>{}}>Request whitelist</button>
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