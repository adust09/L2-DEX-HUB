import { ethers } from "ethers";
import * as zksync from "zksync";

import MNEMONIC from process.env.MNEMONIC

const syncProvider = await zksync.getDefaultProvider("ropsten");
const ethersProvider = ethers.getDefaultProvider("ropsten");

const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
const syncWallet = zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

export default function getServerSideProps(){

const withdrawButton = () => {
    const withdrawETH = await syncWallet.withdrawFromSyncToEthereum({
        ethAddress: ethWallet.ethAddress,
        token: "ETH",
        amount: ethers.utils.parseEther("0.998"),
    });
    return <button onClick={withdrawETH}>withdraw ETH from zkSync</button>
}}

export default withdrawButton