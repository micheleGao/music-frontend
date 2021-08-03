import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image, Button, Card, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import ReactPlayer from "react-player";
import EditReview from '../EditReview/EditReview';
import WriteReview from '../WriteReview/WriteReview';

export default function ArtistsDetails({ userInfo, loggedIn, _handleChange, _updateReviews}) {
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

	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<div className='d-flex justify-content-between'>
				<h2>{artists.name}</h2>
				<small>{artists.nationality}</small>
			</div>
			<Image
				// rounded
				// fluid
				src={artists.photo_url}
				roundedCircle
				width="250px"
				height="286px"
			/>
			<h2>Reviews</h2>
			<WriteReview _updateReviews={_updateReviews}  _handleChange={_handleChange}/>
			{!artists.reviews.length && <p>No reviews just yet</p>}
			{loggedIn && <p>Write a review</p>}
			{artists.reviews.length > 0 &&
				artists.reviews.map((review) => {
					return (
						<Container
							className='p-5 border rounded-3 bg-light'
							key={review.id}>
							<h1>{review.title}</h1>
							<small>{review.body}</small>
							{/* <div>
								<Button variant='secondary'>Edit</Button>
								<Button variant='danger'>Delete</Button>
							</div> */}
							<EditReview _handleChange={_handleChange} _updateReviews={_updateReviews}/>
							{/* <InputGroup className="mb-3">
								<DropdownButton
									variant="outline-secondary"
									title="Dropdown"
									id="input-group-dropdown-1"
								>
									<Dropdown.Item href={`/reviews/${id}/edit`}>Edit Review</Dropdown.Item>
									<Dropdown.Item href={`/reviews/${id}/edit`}>Delete the review</Dropdown.Item>
								</DropdownButton>
	
							</InputGroup> */}

						</Container>

					);
				})}

			<h2>Songs</h2>
			{!artists.songs.length && <p>No songs just yet</p>}
			{artists.songs.length > 0 &&
				artists.songs.map((song) => {
					return (
						<Container
							className='p-5 border rounded-3 bg-light'
							key={song.id}>
							<h1>{song.title}</h1>
							<small>{song.album}</small>
							<Container className="player-wrapper">
								<ReactPlayer
									className="react-player"
									width='19rem'
									height='13rem'
									url={song.play_url}
								/>
							</Container>
						</Container>

					);
				})}
		</Container>
	)
}