import { useState } from 'react';
import { ConnectMetamaskButton } from './ConnectMetamaskButton'

const Article = (props) => {
    const [Accounts, setAccounts] = useState('connect');
    const publishArticle = async () => {

        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            Accounts = newAccounts;
            console.log(accounts);

            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);

            const signer = provider.getSigner(0);
            console.log(signer);

        } catch (error) {
            console.error(error);
        }
    };
    setAccounts(Accounts)

    return (
        <div>
            <ConnectMetamaskButton Accounts={Accounts} onClick={publishArticle} />
        </div>
    );
};
export default Article;