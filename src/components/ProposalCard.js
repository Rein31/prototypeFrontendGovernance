import React, { useState } from "react";
import { ethers } from "ethers";
const abi = require("../abi/MyGovernor.json");

const proposals = [
  {
    id: 1,
    title: "Should we make a new motorcycle?",
    author: "Bramsurya",
    description: "this is proposal number 1",
  },
  {
    id: 2,
    title: "Should we mint a token?",
    author: "Bramsurya",
    description: "this is proposal number 2",
  },
];

function ProposalCard() {
  const [forVotes, setForVotes] = useState(0);
  const [againstVotes, setAgainstVotes] = useState(0);
  const [abstainVotes, setAbstainVotes] = useState(0);
  const [voteState, setVoteState] = useState(0);

  let proposalId =
    "44782053061302158253479573181125706781099996506491438126989206048620935604903";
  let contract_address = "0x85094B1936bD7287C9444FaA09dCa0B257993832";
  let api_key = "27f016de92b44287880cb460930b8151";

  let provider = new ethers.providers.InfuraProvider("goerli", api_key);

  const contract = new ethers.Contract(contract_address, abi["abi"], provider);

  console.log(contract);

  async function getter() {
    try {
        const { againstVotes, forVotes, abstainVotes } = await contract.proposalVotes(ethers.BigNumber.from(proposalId));
        setAgainstVotes(againstVotes.toString());
        setForVotes(forVotes.toString());
        setAbstainVotes(abstainVotes.toString());

        const state = await contract.state(ethers.BigNumber.from(proposalId));
        setVoteState(state);

        let name = await contract.name();
        console.log(name);
    } catch (e) {
        console.log(e.message);
    }
    
    
}

  const proposalDetail = proposals.map(({ id, title, author, description }) => {
    return (
      <div className="card" key={id}>
        <div className="content">
          <div className="header">{title}</div>
          <div className="meta">{id}</div>
          <div>{voteState}</div>
          <div><button onClick={() => getter()}>ClickMe</button></div>
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
                  <td data-label="Name">{forVotes}</td>
                  <td data-label="Age">{againstVotes}</td>
                  <td data-label="Job">{abstainVotes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div className="ui basic green button">Approve</div>
            <div className="ui basic red button">Reject</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 style={{ alignItems: "center", paddingTop: "70px" }}>
        Proposal list
      </h1>
      <div className="ui divider"></div>
      <div className="ui three cards">{proposalDetail}</div>
    </div>
  );
}

export default ProposalCard;
