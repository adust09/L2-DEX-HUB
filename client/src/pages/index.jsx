import Layout from '../pages/components/Layout'
import { Contract, utils, ethers } from 'ethers'
import zkswapABI from '../zkswap.ABI.json'
import * as zksync from "zksync"


export default function OutsideUsageExample() {

  // var MNEMONIC = "";
  // const ethersProvider = ethers.getDefaultProvider("ropsten");
  // const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);

  // const withdrawETH = async () => {

  //   const syncProvider = await zksync.getDefaultProvider("ropsten");
  //   const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

  //   const withdraw =
  //     await
  //       syncWallet.withdrawFromSyncToEthereum({
  //         ethAddress: ethWallet.address,
  //         token: "ETH",
  //         amount: ethers.utils.parseEther("0.001"),
  //       });
  // }


  // async function depositETH() {
  //   let ABI = zkswapABI;
  //   let ZKSwapContract = '0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467'
  //   const contract = new Contract(ZKSwapContract, ABI, ethWallet)
  //   const tx = await contract.depositETH(ethWallet.address, {
  //     value: utils.parseEther('0.1')
  //   })
  //   return tx
  // }

  return (
    <><Layout>
    </Layout><>
        <div>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">

          </div>
          {/* <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
            <h1 className="mb-4 text-green-500 text-3xl">zkSync</h1>
            <button className="btn-blue" onClick={withdrawETH}> withdraw ETH</button>

            <h1 className="mb-4 text-green-500 text-3xl">ZKSwap</h1>
            <button className="btn-blue" onClick={depositETH}> Deposit ETH</button>
          </section> */}
        </div>
      </></>
  )
}