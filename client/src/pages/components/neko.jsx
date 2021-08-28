import { useState } from "react";
import {  ethers } from 'ethers'
import ConnectMetamaskButton from '../components/ConnectMetamaskButton';
import { useUserSigner } from "../../hooks/UserSignerExample";
import detectEthereumProvider from '@metamask/detect-provider';


export default function ConnectWallet(props) {

    const [Accounts, setAccounts] = useState("Connect Metamask");

    const [injectedProvider, setInjectedProvider] = useState();
    console.log("injectedProvider", injectedProvider);

    const ethersProvider = ethers.getDefaultProvider("ropsten");
    console.log("ethersProvider = ", ethersProvider);

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

        const provider = await detectEthereumProvider();
        console.log("provider = ", provider);

        setInjectedProvider(new ethers.providers.Web3Provider(provider));
        console.log("injectedProvider = ", injectedProvider);

        const userSigner = useUserSigner(injectedProvider, ethersProvider);
        console.log("userSigner = ", userSigner);
    };

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
        </div>
    );
};