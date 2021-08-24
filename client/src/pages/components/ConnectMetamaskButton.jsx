export default function ConnectMetamaskButton(pops) {
    return (
        <button className="btn-blue" onClick={() => props.onClick()}>
            address:{props.Accounts}
        </button>
    );
}