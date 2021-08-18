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
      <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
        <h1 className="mb-4 text-green-500 text-3xl">sample</h1>
        <p className="mb-2 text-center"> uuuum </p>
        <button className="btn-blue">Let's Start!!</button>
      </section>
    )
  }
}