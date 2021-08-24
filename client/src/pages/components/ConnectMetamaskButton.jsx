export default function ConnectMetamaskButton(props) {
    return (
        <button className="btn-blue" onClick={() => props.onClick()}>
            address:{props.Accounts}
        </button>
    );
}