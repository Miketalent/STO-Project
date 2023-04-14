import { Web3Button, Web3Modal, Web3NetworkSwitch } from '@web3modal/react'
import CustomButton from '../components/CustomButton'
import ThemeControls from '../components/ThemeControls'
import Link from "next/link"
import { ethereumClient, projectId } from './_app'
import UserSignUp from '../components/requests/userSignUp'
import UserSignIn from '../components/requests/userSignIn'

export default function HomePage() {
  return (
    <>
      <div>
        <h1>Home</h1>
        <p>Note that Web3 is not loaded for this page.</p>
        <div><Link href='/dapp'>My Dapp</Link></div>
        <div><Link href='/accounts'>My Account Info</Link></div>
      </div>

      <h2>Buttons</h2>
      <div className="container">
        {/* Use predefined button  */}
        <Web3Button icon="show" label="Connect Wallet" balance="show" />

        {/* Use custom button */}
        <CustomButton />

        {/* <Web3NetworkSwitch /> */}
      </div>

      <h2>Sign Up</h2>
      <div>
        <UserSignUp />
      </div>

      <h2>Log In</h2>
      <div>
        <UserSignIn />
      </div>

      <ThemeControls />

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}
