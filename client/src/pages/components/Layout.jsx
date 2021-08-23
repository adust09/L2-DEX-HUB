const { ethers } = require("ethers");

export default function Layout({ children }) {

    const connectWallet = async () => {
        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            let accounts = newAccounts;
            console.log(accounts);

            //provider(Metamask)を設定
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);
            //signerの設定
            const signer = provider.getSigner(0);
            console.log(signer);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js"></script>
            <header className="text-gray-100 bg-gray-900 body-font shadow w-full">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <a className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Home</a>
                    </nav>
                    <a
                        className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                        <span className="ml-3 text-xl">L2 DEX HUB</span>
                    </a>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <button className="btn-blue" onClick={connectWallet}>
                            Connect Wallet
                        </button>

                    </div>
                </div>
            </header>
        </>
    )
}