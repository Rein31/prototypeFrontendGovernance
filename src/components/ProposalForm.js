import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

function ProposalForm() {
    return (
        <div className="ui eight wide column">
            <h1>Create Proposal</h1>
            <form className="ui form">
                <div className="field">
                    <label>Proposal Name</label>
                    <input type="text" name="proposal-name" placeholder="Name" />
                </div>
                <div className="field">
                    <label>Proposal Description</label>
                    <input type="text" name="proposal-desc" placeholder="Description" />
                </div>
                <button className="ui button">Create Proposal</button>
            </form>
        </div>
    );
}

export default ProposalForm;
