import React from 'react';
import { Container, Image } from 'react-bootstrap';
import monster from '../../Monster2.png';
const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<Image
				className="logo-monster"
				rounded
				fluid
				width="600px"
				src={monster}
			/>
		</Container>
	);
};
export default Home;