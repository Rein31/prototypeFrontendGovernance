import React from 'react'

function Navbar({ connectMetamask }) {
	return (
		<div className='ui fixed inverted menu' style={{ height: '60px' }}>
			<div className='ui container'>
				<a href='/' className='header item'>
					<img className='logo' src='../logo192.png' alt="logo" />
					Talaxeum
				</a>
			</div>
			<div className='right menu'>
				<div className='item'>
					<button
						style={{
							cursor: 'pointer',
							borderRadius: '30px',
							height: '40px',
							width: '150px',
							alignItems: 'center',
							backgroundColor: '#16775D',
							color: '#EFEFEF',
							border: 'none',
						}}
						onClick={() => {
							connectMetamask()
						}}
					>
						Connect to Wallet
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
