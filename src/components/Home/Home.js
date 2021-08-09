import React from 'react';
import { Container, Image } from 'react-bootstrap';
import music from '../../musicnote.png';
import monster from '../../Monster2.png';
const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
				<Container>
					<div className="parent">
						<div className="music-logo-container">
							<img className="music-logo" src={music}/>
						</div>
						<Image
							rounded
							fluid
							src={monster}
						/>
					</div>
				</Container>
		</Container>

	);
	
};
export default Home;