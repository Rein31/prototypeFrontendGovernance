import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

const abi = require("../abi/MyGovernor.json");

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

const proposals = [
    {
        id: "44782053061302158253479573181125706781099996506491438126989206048620935604903",
        proposer: "Bramsurya",
        description: "Should we make a new motorcycle?",
    },
    // {
    //     id: 2,
    //     proposer: "Bramsurya",
    //     description: "Should we mint a token?",
    // },
];

function ProposalCard() {
    const [againstVotes, setAgainstVotes] = useState(0);
    const [forVotes, setForVotes] = useState(0);
    const [abstainVotes, setAbstainVotes] = useState(0);
    const [state, setState] = useState("");

    let contract_address = "0x85094B1936bD7287C9444FaA09dCa0B257993832";
    let api_key = "27f016de92b44287880cb460930b8151";

    let provider = new ethers.providers.InfuraProvider("goerli", api_key);

    const governance_contract = new ethers.Contract(contract_address, abi["abi"], provider);

    console.log(governance_contract);

    async function getProposalDetails(id) {
        try {
            const { againstVotes, forVotes, abstainVotes } = await governance_contract.proposalVotes(
                ethers.BigNumber.from(id)
            );
            const state = await governance_contract.state(ethers.BigNumber.from(id));

            setAgainstVotes(againstVotes.toString());
            setForVotes(forVotes.toString());
            setAbstainVotes(abstainVotes.toString());
            setState(states[state]);

            console.log(againstVotes.toString(), forVotes.toString(), abstainVotes.toString(), state.toString());
        } catch (e) {
            console.error(e);
        }
    }

    async function voteFor(id) {
        try {
            await governance_contract.castVote(ethers.BigNumber.from(id), 1);
        } catch (e) {
            console.error(e);
        }
    }

    async function voteAgainst(id) {
        try {
            await governance_contract.castVote(ethers.BigNumber.from(id), 0);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (governance_contract) {
        }
    }, [state]);

    const proposalDetail = proposals.map(({ id, proposer, description }) => {
        getProposalDetails(id);
        return (
            <div className="card" key={id}>
                <div className="content">
                    <div className="header">{description}</div>
                    <div
                        className="meta"
                        style={{ textOverflow: "ellipsis", width: "200px", overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                        Proposal Id: {id}
                    </div>
                    <div>Status : {state}</div>
                    <div className="description">
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>For</th>
                                    <th>Against</th>
                                    <th>Abstain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="for">{forVotes}</td>
                                    <td data-label="against">{againstVotes}</td>
                                    <td data-label="abstain">{abstainVotes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button" onClick={() => voteFor(id)}>
                            For
                        </div>
                        <div className="ui basic red button" onClick={() => voteAgainst(id)}>
                            Against
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <h1 style={{ alignItems: "center", paddingTop: "70px" }}>Proposal list</h1>
            <div className="ui divider"></div>
            <div className="ui three cards">{proposalDetail}</div>
        </div>
    );
}

export default ProposalCard;
