import React from 'react'
import Web3Container from '../lib/Web3Container'
import AdminPage from './admin'
import NotWhitelisted from './notWhitelistedAccount'
import Whitelisted from './whitelistedAccount'

/**
 * class for Dapp
 */
class Dapp extends React.Component {
  render() {
    return (
      //TODO: hardcore to transition to AdminPage for now.  This is to be determined by account type
      <>
      <h1>My App</h1>
      <div>
         Under Construction...
      </div>
      </>
    )
  }
}

export default () => (
  <Web3Container
    render={({ web3, contract}) => (
      <Dapp />
    )}
  />
)