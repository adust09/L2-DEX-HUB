import React from "react";
import ConnectWallet from "./ConnectWallet";

export default function Layout({ children }) {

    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js"></script>
            <ConnectWallet />
        </>
    )
}