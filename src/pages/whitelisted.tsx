import React from 'react'
import Link from 'next/link'
import RedeemToken from '../components/token/redeemToken';
import TransferToken from '../components/token/transferToken';
import GetTokenBalance from '../components/token/getTokenBalance';

const WhitelistedAccountPage = () => {

  return (
      <div>
        <h1>My Account</h1>
        <div>
          <GetTokenBalance />
        </div>
        <div>
          TODO: request to buy token interface goes here
        </div>
        <div>
          <RedeemToken />
        </div>
        <div>
          <TransferToken />
        </div>
        <br></br>
        <div></div>
        <div>
          <Link href='/'>Home</Link>
        </div>
        <div>
          <Link href='/dapp'>Dapp</Link>
        </div>
      </div>
  )
}

export default WhitelistedAccountPage