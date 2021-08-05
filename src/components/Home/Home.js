import React from 'react';
import { Container, Image } from 'react-bootstrap';
import jiggylogo from '../../jiggylogo.png';
import fuzzy from '../../fuzzy.png';
import music from '../../musicnote.png';
import monster from '../../Monster2.png';
const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
				{/* <p><img className="fuzzy-logo" src={fuzzy}/></p>
				<p><img className="jiggy-logo" src={jiggylogo} /></p> */}
				{/* <img className="jiggy-spinner" src={jiggy}/> */}
				<Container>
					<div><img className="music-logo" src={music}/></div>
					<Image
						rounded
						fluid
						src={monster}
					/>
					
				</Container>
		</Container>

	);
	// className='p-5 border rounded-3 bg-light'
};
export default Home;