import React, { useState } from 'react'
import getWeb3 from './getWeb3'
import getContract from './getContract'
import contractDefinition from '../data/contracts/ERC1400.json'
import { useAccount } from 'wagmi'

export default class Web3Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {web3: null, contract: null};
  }
  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const contract = await getContract(web3, contractDefinition)
      //const accounts = await web3.eth.getAccounts()
      this.setState({web3: web3, contract: contract})
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  } 

  render () {
    const { web3, contract } = this.state
    return this.props.render({ web3, contract })
  }
}
