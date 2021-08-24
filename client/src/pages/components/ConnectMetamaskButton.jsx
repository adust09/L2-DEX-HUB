const ConnectMetamaskButton = (props) => {
    return (
        <button onClick = {() => props.onClick()}>
            {props.Accounts.isMetamaskInstalled ? 'Connect Metamask' : 'Install Metamask'}
        </button>
    );
}

export default ConnectMetamaskButton;