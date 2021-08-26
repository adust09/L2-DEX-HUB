import { useState } from "react";
import ConnectMetamaskButton from '../components/ConnectMetamaskButton';
import { Contract, utils, ethers } from 'ethers'
import zkswapABI from '../../zkswap.ABI.json'
import * as zksync from "zksync"

export default function ConnectWallet(props) {
    const [Accounts, setAccounts] = useState("Connect Metamask");
    const ethersProvider = ethers.getDefaultProvider("ropsten");

    var MNEMONIC = process.env.MNEMONIC;
    const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
    console.log("Accounts = ", Accounts);

    async function ConnectMetamask() {

        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            let accounts = newAccounts;
            setAccounts(accounts[0]);
            console.log("Accounts = ", Accounts);

        } catch (error) {
            console.error(error);
        }
        getBalases();
    };

    async function getBalases() {
        const address = Accounts;
        console.log("address = ", address);
        const zkSyncUrl = "https://api.zks.app/v2/3/account/0x2D1Ac1CA744da293c5AcceAe25BE8DCd71168241/balances";
        const response = await fetch(zkSyncUrl);
        const data = await response.json();
        console.log("data = ", data);
    };

    async function withdrawETH() {

        const syncProvider = await zksync.getDefaultProvider("ropsten");
        const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

        const withdraw =
            await
                syncWallet.withdrawFromSyncToEthereum({
                    ethAddress: ethWallet.address,
                    token: "ETH",
                    amount: ethers.utils.parseEther("0.001"),
                });
    }

    async function depositETH() {
        let ABI = zkswapABI;
        let ZKSwapContract = '0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467'
        const contract = new Contract(ZKSwapContract, ABI, ethWallet)
        const tx = await contract.depositETH(ethWallet.address, {
            value: utils.parseEther('0.1')
        })
        return tx
    }

    async function zkSyncToZKSwap() {
        event.preventDefault();
        console.log("amount = ", event.target.amount.value);

        withdrawETH();
        depositETH();
    }

    return (
        <div>
            <header className="text-gray-100 bg-gray-900 body-font shadow w-full">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <a className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600"></a>
                    </nav>
                    <a
                        className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                        <span className="ml-3 text-xl">L2 DEX HUB</span>
                    </a>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <ConnectMetamaskButton Accounts={Accounts} onClick={() => { ConnectMetamask(); }}></ConnectMetamaskButton>

                    </div>
                </div>
            </header>

            <div>
                <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
                    <form onSubmit={zkSyncToZKSwap}>
                        <div className="flex flex-col rounded-lg overflow-hidden sm:flex-row">
                            <label htmlFor="amount"></label>
                            <input className="py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" id="amount" type="text" amount="amount" placeholder="Amount" />
                            <button className="py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600" type="submit" >Exchange</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};