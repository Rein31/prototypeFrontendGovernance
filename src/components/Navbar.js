import React from "react";

function Navbar({ connectMetamask }) {
    return (
        <div className="ui inverted borderless menu">
            <a href="/" className="item">
                <img className="logo" src="../logo192.png" alt="logo" />
                Talaxeum
            </a>
            <div className="right menu">
                <div className="item">
                    <div className="ui primary button" onClick={() => connectMetamask()}>
                        Connect to Metamask
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
