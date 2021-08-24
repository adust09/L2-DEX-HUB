import { useState } from "react";
import { ethers } from 'ethers';

export default function ConnectWallet(props) {
    const [Accounts, setAccounts] = useState("connect");
    console.log(Accounts);

    async function ConnectMetamask() {
        console.log("2", Accounts);

        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            let accounts = newAccounts;
            setAccounts({ accounts })
            console.log(accounts);
            console.log("3", Accounts);


            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);

            const signer = provider.getSigner(0);
            console.log(signer);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={() => { ConnectMetamask }}>wallet</button>
        </div>
    );
};