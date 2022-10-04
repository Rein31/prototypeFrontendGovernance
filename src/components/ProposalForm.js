import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

function ProposalForm({ createProposal, proposalDesc, SetProposalDesc }) {
    return (
        <div className="ui eight wide column">
            <h1>Create Proposal</h1>
            <form className="ui form">
                <div className="field">
                    <label>Proposal Description</label>
                    <textarea rows="2"></textarea>
                </div>
                <button className="ui button">Create Proposal</button>
            </form>
        </div>
    );
}

export default ProposalForm;
