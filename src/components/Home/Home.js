import React from 'react';
import { Container, Image } from 'react-bootstrap';
const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<h1>Lryical!</h1>
			<Image
				rounded
				fluid
				src='https://st.hzcdn.com/simgs/3411b2400464e127_4-7286/home-design.jpg'
			/>
		</Container>
	);
};
export default Home;