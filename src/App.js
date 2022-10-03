import React, { useState } from "react";

import Navbar from "./components/Navbar";
import ProposalCard from "./components/ProposalCard";
import ProposalForm from "./components/ProposalForm";
import { ethers } from "ethers";

const abi = require("./abi/MyGovernor.json");

export default function App() {
    const [contract, setContract] = useState();

    const connectMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // metamask requires requesting a permission to connect users account
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const contract_address = "0x85094B1936bD7287C9444FaA09dCa0B257993832";

        const governance_contract = new ethers.Contract(contract_address, abi["abi"], signer);

        setContract(governance_contract);

        console.log("Account Address : ", await signer.getAddress());
    };

    return (
        <div className="ui main container">
            <Navbar connectMetamask={connectMetamask} />
            <div className="ui sixteen column grid">
                <ProposalForm />
                <ProposalCard contract={contract} />
            </div>
        </div>
    );
}
