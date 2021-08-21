import { Wallet, Contract, utils, ethers } from 'ethers'
import Web3 from 'web3'
import zkswapABI from '../zkswap.ABI.json'
const Web3EthAbi = require('web3-eth-abi');
import Layout from '../pages/components/Layout'
import MNEMONIC from '../zkswap.ABI.json'

export default function zkswap() {

    let ABI = zkswapABI;

    //normal
    const wallet = new Wallet('0x2D1Ac1CA744da293c5AcceAe25BE8DCd71168241')
    const contract = new Contract('0x8ECa806Aecc86CE90Da803b080Ca4E3A9b8097ad', ABI, wallet)

    // fixed
    // const MNEMONIC = process.env.MNEMONIC;
    // const ethersProvider = ethers.getDefaultProvider("ropsten");
    // const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
    // const contract = new Contract('0x8ECa806Aecc86CE90Da803b080Ca4E3A9b8097ad', ABI, wallet)


    async function depositETH(amount) {
        const tx = await contract.depositETH(Wallet, {
            value: utils.parseEther(amount)
        })
        return tx
    }

    return (
        <><Layout>
        </Layout><>
                <div>
                    <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
                        <h1 className="mb-4 text-green-500 text-3xl">sample</h1>
                        <button className="btn-blue" onClick={depositETH('0.5')}> Deposit ETH</button>
                    </section>
                </div>
            </></>
    )
}