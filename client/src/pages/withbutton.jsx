import { ethers } from "ethers";
import * as zksync from "zksync";

export default function OutsideUsageExample() {
    const MNEMONIC = process.env.MNEMONIC


    const withdrawETH = async () => {
        const syncProvider = await zksync.getDefaultProvider("ropsten");
        console.log("syncProvider=",syncProvider)

        const ethersProvider = ethers.getDefaultProvider("ropsten");
        console.log("ethersProvider=" ,ethersProvider)

        // const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
        const ethWallet = ethers.Wallet.createRandom().connect(ethersProvider);
        console.log("ethWalletAddress=",ethWallet.address);

        const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);
        console.log("syncWalletAddress=", syncWallet.address);

        withdraw =
            await
                syncWallet.withdrawFromSyncToEthereum({
                    ethAddress: ethWallet.ethAddress,
                    token: "ETH",
                    amount: ethers.utils.parseEther("0.998"),
                });
                await withdraw.awaitVerifyReceipt();
                console.log(withdraw.txHash);
    }

    return (
        <div>
            <div>
            </div>
            <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
                <h1 className="mb-4 text-green-500 text-3xl">sample</h1>
                <p className="mb-2 text-center"> zkSYnc </p>
                <button className="btn-blue" onClick={withdrawETH}> withdraw ETH</button>
            </section>
        </div>
    )
}