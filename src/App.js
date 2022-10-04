import { Interface, parseEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProposalCard from "./components/ProposalCard";
import ProposalForm from "./components/ProposalForm";
import { ethers } from "ethers";

const abi = require("./abi/MyGovernor.json");
const tokenAbi = require("./abi/Token.json");

const states = {
    0: "Pending",
    1: "Active",
    2: "Canceled",
    3: "Defeated",
    4: "Succeeded",
    5: "Queued",
    6: "Expired",
    7: "Executed",
};

const initialProposals = [
    {
        id: "44782053061302158253479573181125706781099996506491438126989206048620935604903",
        proposer: "Bramsurya",
        description: "Should we make a new motorcycle?",
        againstVotes: "0",
        forVotes: "0",
        abstainVotes: "0",
        state: "Loading...",
    },
];

export default function App() {
    const [contract, setContract] = useState();
    const [provider, setProvider] = useState();
    const [proposalDesc, setProposalDesc] = useState("");
    const [proposals, setProposals] = useState(initialProposals);
    const [loading, setLoading] = useState(false);

    const token_address = "0x912A80A5A5747bCF41E75Fdf4Fe74cC41A4739ef";
    const iface = new Interface(tokenAbi["abi"]);

    async function connectMetamask() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // metamask requires requesting a permission to connect users account
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const contract_address = "0x85094B1936bD7287C9444FaA09dCa0B257993832";

        const governance_contract = new ethers.Contract(contract_address, abi["abi"], signer);

        setProvider(provider);
        setContract(governance_contract);

        console.log("Account Address : ", await signer.getAddress());
    }

    async function createProposal(e) {
        e.preventDefault();
        console.log("Create Proposal");
        if (contract) {
            try {
                setLoading(true);

                const encodedFunc = iface.encodeFunctionData("mint", [
                    "0x3300e4565046f33661A2b03BF182be9a0CAC1A05",
                    parseEther("10.0"),
                ]);
                const tx = await contract.propose([token_address], [0], [encodedFunc], proposalDesc);
                const receipt = await tx.wait();
                console.log(receipt);

                setLoading(false);

                const proposalId = receipt.events[0].args.proposalId;

                let newProposal = {
                    id: proposalId.toString(),
                    description: proposalDesc,
                    againstVotes: "0",
                    forVotes: "0",
                    abstainVotes: "0",
                    state: "Loading...",
                };

                setProposals((proposals) => [...proposals, newProposal]);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className="ui container">
            <Navbar connectMetamask={connectMetamask} />
            <div className="ui sixteen column grid">
                <ProposalForm
                    createProposal={createProposal}
                    proposalDesc={proposalDesc}
                    setProposalDesc={setProposalDesc}
                />
                <ProposalCard
                    contract={contract}
                    states={states}
                    proposals={proposals}
                    setProposals={setProposals}
                    loading={loading}
                />
            </div>
        </div>
    );
}
