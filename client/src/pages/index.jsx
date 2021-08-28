import Layout from '../pages/components/Layout'

export default function OutsideUsageExample() {

  var MNEMONIC = "potato response theme height bundle toy mushroom squeeze circle name obvious cruise";
  const ethersProvider = ethers.getDefaultProvider("ropsten");
  const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);

  async function withdrawETH(amount) {

    const syncProvider = await zksync.getDefaultProvider("ropsten");
    const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

    const withdraw =
      await
        syncWallet.withdrawFromSyncToEthereum({
          ethAddress: ethWallet.address,
          token: "ETH",
          amount: ethers.utils.parseEther(amount),
        });
  }


  async function depositETH(amount) {
    let ABI = zkswapABI;
    let ZKSwapContract = '0x010254cd670aCbb632A1c23a26Abe570Ab2Bc467'
    const contract = new Contract(ZKSwapContract, ABI, ethWallet)
    const tx = await contract.depositETH(ethWallet.address, {
      value: utils.parseEther(amount)
    })
    return tx
  }

  async function zkSyncToZKSwap() {
    event.preventDefault();
    console.log("hello1");
    console.log("amount = ", event.target.amount.value);
    const amount = event.target.amount.value
    withdrawETH(amount);
    depositETH(amount);
  }

  return (
    <><Layout>
    </Layout><>
      </></>
  )
}