import * as zksync from "zksync";
import Layout from '../pages/components/Layout'
import { Contract, utils, ethers } from 'ethers'
import zkswapABI from '../zkswap.ABI.json'

export default function OutsideUsageExample() {
  const MNEMONIC = 'potato response theme height bundle toy mushroom squeeze circle name obvious cruise';
  let ABI = zkswapABI;

  const ethersProvider = ethers.getDefaultProvider("ropsten");
  console.log("📡:ethersProvider = ", ethersProvider)

  const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
  console.log("💰:ethWalletAddress = ", ethWallet.address);

  const contract = new Contract('0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467', ABI, ethWallet)
  console.log("📃:contractAddress = ", contract.address);

  async function withdrawETH() {

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

  async function zkSyncToZKSwap() {

    withdrawETH();
    depositETH();
  }

  const [amount,setAmount] = useState(0)
  console.log("amount=", amount)


  return (
    <><Layout>
    </Layout><>
        <div>
          <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
            {/* <h1 className="mb-4 text-green-500 text-3xl">zkSync → ZKSwap</h1>
            <button className="btn-blue" onClick={zkSyncToZKSwap}>exchange</button> */}
            <form onSubmit={zkSyncToZKSwap}>
              <div className="flex flex-col rounded-lg overflow-hidden sm:flex-row">
                {/* <label htmlFor="amount"></label> */}
                <input className="py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" type="text" amount="amount" placeholder="Amount" />
                <input className="py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" type="text" onChange={(e) => setAmount(e.target.value)} />

                <button className="py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600" type="submit" onClick ={setAmount(amount)}>Exchange</button>
              </div>
            </form>
          </section>
        </div>
      </></>
  )
}