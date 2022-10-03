import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

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
    // {
    //     id: 2,
    //     proposer: "Bramsurya",
    //     description: "Should we mint a token?",
    // },
];

function ProposalCard({ contract }) {
    // const [againstVotes, setAgainstVotes] = useState(0);
    // const [forVotes, setForVotes] = useState(0);
    // const [abstainVotes, setAbstainVotes] = useState(0);
    // const [state, setState] = useState("");
    const [proposals, setProposals] = useState(initialProposals);

    // const proposalId = "44782053061302158253479573181125706781099996506491438126989206048620935604903";

    console.log(contract);

    async function getProposalDetails() {
        try {
            const newProposals = [...proposals];
            for (let idx in newProposals) {
                let proposalId = newProposals[idx].id;
                const { againstVotes, forVotes, abstainVotes } = await contract.proposalVotes(
                    ethers.BigNumber.from(proposalId)
                );
                const state = await contract.state(ethers.BigNumber.from(proposalId));

                newProposals[idx].againstVotes = againstVotes.toString();
                newProposals[idx].forVotes = forVotes.toString();
                newProposals[idx].abstainVotes = abstainVotes.toString();
                newProposals[idx].state = states[state];
            }
            setProposals(newProposals);
            console.log("Get Proposal Details");
            // setAgainstVotes(againstVotes.toString());
            // setForVotes(forVotes.toString());
            // setAbstainVotes(abstainVotes.toString());
            // setState(states[state]);
        } catch (e) {
            console.error(e);
        }
    }

    async function voteFor(id) {
        try {
            await contract.castVote(ethers.BigNumber.from(id), 1);
        } catch (e) {
            console.error(e);
        }
    }

    async function voteAgainst(id) {
        try {
            await contract.castVote(ethers.BigNumber.from(id), 0);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (contract) {
            getProposalDetails();
        }
    }, [contract]);

    const proposalDetail = proposals.map(
        ({ id, proposer, description, againstVotes, forVotes, abstainVotes, state }) => {
            return (
                <div className="card" key={id}>
                    <div className="content">
                        <div className="header">{description}</div>
                        <div
                            className="meta"
                            style={{
                                textOverflow: "ellipsis",
                                width: "200px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
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
        }
    );

    return (
        <div>
            <h1 style={{ alignItems: "center", paddingTop: "70px" }}>Proposal list</h1>
            <div className="ui divider"></div>
            <div className="ui three cards">{proposalDetail}</div>
        </div>
    );
}

export default ProposalCard;
