import * as zksync from "zksync";
import Layout from '../pages/components/Layout'
import { Wallet, Contract, utils, ethers } from 'ethers'
import zkswapABI from '../zkswap.ABI.json'

export default function OutsideUsageExample() {
  const MNEMONIC = '';
  let ABI = zkswapABI;

  const ethersProvider = ethers.getDefaultProvider("ropsten");
  console.log("📡:ethersProvider = ", ethersProvider)

  const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
  console.log("💰:ethWalletAddress = ", ethWallet.address);

  const contract = new Contract('0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467', ABI, ethWallet)
  console.log("📃:contractAddress = ", contract.address);

  const withdrawETH = async () => {

    const syncProvider = await zksync.getDefaultProvider("ropsten");
    const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

    const withdraw =
      await
        syncWallet.withdrawFromSyncToEthereum({
          ethAddress: ethWallet.address,
          token: "ETH",
          amount: ethers.utils.parseEther("0.001"),
        });

    console.log("withdraw=", withdraw);

    console.log(await withdraw.awaitReceipt());
    console.log(await withdraw.awaitVerifyReceipt());
  }


  async function depositETH() {
    const tx = await contract.depositETH(ethWallet.address, {
      value: utils.parseEther('0.1')
    })
    console.log("tx=", tx);
    return tx
  }

  return (
    <><Layout>
    </Layout><>
        <div>
          <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
            <h1 className="mb-4 text-green-500 text-3xl">zkSync</h1>
            <button className="btn-blue" onClick={withdrawETH}> withdraw ETH</button>

            <h1 className="mb-4 text-green-500 text-3xl">ZKSwap</h1>
            <button className="btn-blue" onClick={depositETH}> Deposit ETH</button>
          </section>
        </div>
      </></>
  )
}