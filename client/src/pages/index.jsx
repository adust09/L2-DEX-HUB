import * as zksync from "zksync";
import Layout from '../pages/components/Layout'
import { Contract, utils, ethers } from 'ethers'
import zkswapABI from '../zkswap.ABI.json'

export default function OutsideUsageExample() {
  const MNEMONIC = 'potato response theme height bundle toy mushroom squeeze circle name obvious cruise';
  let ABI = zkswapABI;

  const ethersProvider = ethers.getDefaultProvider("ropsten");

  const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);

  const contract = new Contract('0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467', ABI, ethWallet)

  async function withdrawETH() {
    console.log("hello2");

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
    console.log("hello3");

    const tx = await contract.depositETH(ethWallet.address, {
      value: utils.parseEther('0.1')
    })
    console.log("tx=", tx);
    return tx
  }

  async function zkSyncToZKSwap() {
    event.preventDefault();
    console.log("hello1");
    console.log("amount = ", event.target.amount.value);
    withdrawETH(amount);
    depositETH(amount);
  }

  return (
    <><Layout>
    </Layout><>
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
      </></>
  )
}