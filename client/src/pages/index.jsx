import React from 'react'
import { eth } from '../../web3/provider'


export default class IndexPage extends React.Component {

  async Metamask() {
    try {
      await ethereum.enable() // Prompt user to let our DApp access their addresses

      const addresses = await eth.getAccounts() // Get user's ETH addresses
      console.log(addresses)

      const balance = await eth.getBalance(addresses[0])
      console.log(balance)

    } catch (err) {
      console.error("User denied access to their ETH addresses!")
    }
  }

  render() {
    return (
      <h1>hello world!</h1>
    )
  }

}