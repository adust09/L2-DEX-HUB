import * as zksync from "zksync";
import Layout from '../pages/components/Layout'
import { Wallet, Contract, utils, ethers } from 'ethers'
import zkswapABI from '../zkswap.ABI.json'

export default function OutsideUsageExample() {
  const MNEMONIC = process.env.MNEMONIC;

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


  let ABI = zkswapABI;

  //normal
  const wallet = new Wallet('0x2D1Ac1CA744da293c5AcceAe25BE8DCd71168241')
  const contract = new Contract('0x8ECa806Aecc86CE90Da803b080Ca4E3A9b8097ad', ABI, wallet)

  // fixed
  // const MNEMONIC = process.env.MNEMONIC;
  // const ethersProvider = ethers.getDefaultProvider("ropsten");
  // const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
  // const contract = new Contract('0x8ECa806Aecc86CE90Da803b080Ca4E3A9b8097ad', ABI, wallet)

  // async function depositETH(amount) {
  //   const tx = await contract.depositETH(Wallet, {
  //     value: utils.parseEther(amount)
  //   })
  //   return tx
  // }

  return (
    <><Layout>
    </Layout><>
        <div>
          <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
            <h1 className="mb-4 text-green-500 text-3xl">zkSync</h1>
            <button className="btn-blue" onClick={withdrawETH}> withdraw ETH</button>

            <h1 className="mb-4 text-green-500 text-3xl">ZKSwap</h1>
            {/* <button className="btn-blue" onClick={depositETH('0.5')}> Deposit ETH</button> */}
            <button className="btn-blue" onClick={console.log("yap")}> Deposit ETH</button>
          </section>
        </div>
      </></>
  )
}