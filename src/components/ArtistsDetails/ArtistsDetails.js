import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';

export default function ArtistsDetails({ userInfo, loggedIn }) {
	const [artists, setArtists] = useState(null);
	const { id } = useParams()
	const getArtistsDetail = async () => {
		try {
			const response = await fetch(`http://localhost:8000/artists/${id}`);
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				setArtists(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getArtistsDetail();
	}, []);

	if (!artists) {
		return null;
	}
	console.log(artists.songs.length)
	console.log(artists.songs[1])

	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<div className='d-flex justify-content-between'>
				<h2>{artists.name}</h2>
				<small>{artists.nationality}</small>
			</div>
			<Image
				rounded
				fluid
				src={artists.photo_url}
			/>
			{/* <Link
				to={`songs/${artists.id}`}
				style={{ color: 'black', textDecoration: 'none' }}>Checkout my music</Link> */}
			{/* <h2>Songs</h2>
				{!artists.songs.length && <p>No songs just yet</p>}
			{artists.songs.length > 0 &&
				artists.songs.map((song) => {
					
					return (
						<Container
							className='p-5 border rounded-3 bg-light'
							key={song.id}>
							<small>{song.title}</small>
							<small>{song.album}</small>
							<small>{song.play_url}</small>
						</Container>
					
					);
				})}  */}
		</Container>
	)
}