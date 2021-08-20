import { Wallet, Contract, utils } from 'ethers'

export default function zkswap() {

    const contract = new Contract('0x8ECa806Aecc86CE90Da803b080Ca4E3A9b8097ad', ABI, wallet)
    const wallet = new Wallet('0x1c1a49fea9a4ede1dc8e582639f498d41fa3c4a9e2ab2b9d740a4a3ec14e1cbf')

    async function depositETH(amount) {
        const tx = await contract.depositETH(wallet.address, {
            value: utils.parse(amount)
        })
        return tx
    }

    // deposit 1 ETH
    depositETH('1').then(console.log)
    return (
        <div>
            <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
                <h1 className="mb-4 text-green-500 text-3xl">sample</h1>
                <p className="mb-2 text-center"> ZKSwap </p>
                <button className="btn-blue" onClick={depositETH}> Deposit ETH</button>
            </section>
        </div>
    )
}
