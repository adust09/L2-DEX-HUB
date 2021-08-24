const ConnectMetamaskButton = (props) => {
    return (
        <button className="btn-blue" onClick={() => props.onClick()}>
            address:{props.Accounts}
        </button>
    );
}

export default ConnectMetamaskButton;