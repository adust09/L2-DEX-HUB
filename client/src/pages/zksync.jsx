import { ethers } from "ethers";
import * as zksync from "zksync";


export default function OutsideUsageExample() {
    const MNEMONIC = ""


    const withdrawETH = async () => {

        const syncProvider = await zksync.getDefaultProvider("ropsten");
        console.log("syncProvider=", syncProvider)

        const ethersProvider = ethers.getDefaultProvider("ropsten");
        console.log("ethersProvider=", ethersProvider)

        const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
        console.log("ethWalletAddress=", ethWallet.address);

        const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);
        console.log("syncWalletAddress=", syncWallet.address);

        const withdraw =
            await
                syncWallet.withdrawFromSyncToEthereum({
                    ethAddress: ethWallet.address,
                    token: "ETH",
                    amount: ethers.utils.parseEther("0.001"),
                });


        console.log("withdraw.txHash=", withdraw.txHash);
        console.log({ withdraw });

        console.log(await withdraw.awaitReceipt());
        console.log(await withdraw.awaitVerifyReceipt());
    }

    return (
        <div>
            <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
                <h1 className="mb-4 text-green-500 text-3xl">sample</h1>
                <p className="mb-2 text-center"> zkSync </p>
                <button className="btn-blue" onClick={withdrawETH}> withdraw ETH</button>
            </section>
        </div>
    )
}