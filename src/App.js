import React from 'react'
import Navbar from './components/Navbar'
import ProposalCard from './components/ProposalCard'

import { ethers } from 'ethers'

let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

export default function App() {

  const connectMetamask = async () => {
    // metamask requires requesting a permission to connect users account
    await provider.send('eth_requestAccounts', [])
  
    signer = await provider.getSigner()
  
    console.log('Account Address : ', await signer.getAddress())
  }

	return (
		<div>
			<Navbar connectMetamask={connectMetamask} />
			<div className='ui main container'>
				<ProposalCard />
			</div>
		</div>
	)
}
