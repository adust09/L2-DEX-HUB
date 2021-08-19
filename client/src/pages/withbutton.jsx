import { ethers } from "ethers";
import * as zksync from "zksync";

export default function OutsideUsageExample() {
    const MNEMONIC = process.env.MNEMONIC


    const withdrawETH= async () => {
        const syncProvider = await zksync.getDefaultProvider("ropsten");
        const ethersProvider = ethers.getDefaultProvider("ropsten");

        const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
        const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

        withdraw =
            await
                syncWallet.withdrawFromSyncToEthereum({
                    ethAddress: ethWallet.ethAddress,
                    token: "ETH",
                    amount: ethers.utils.parseEther("0.998"),
                });
    }


    return (
        <div>
            <div>
                <button onClick={withdrawETH}>manual fetch</button>
            </div>
        </div>
    )
}