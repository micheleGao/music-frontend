import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import ReactPlayer from "react-player";
import EditReview from '../EditReview/EditReview';
import WriteReview from '../WriteReview/WriteReview';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

export default function ArtistsDetails({ userInfo, loggedIn, _handleChange, _updateReviews, _handleDelete }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
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
				src={artists.photo_url}
				roundedCircle
				width="250px"
				height="286px"
			/>
			<Accordion  className="accordion" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Reviews</Accordion.Header>
					<Accordion.Body>
						<WriteReview _updateReviews={_updateReviews} _handleChange={_handleChange} getArtistsDetail={getArtistsDetail} />
						{!artists.reviews.length && <p>No reviews just yet</p>}
						{loggedIn && <p></p>}
						{artists.reviews.length > 0 &&
							artists.reviews.map((review) => {
								return (
									<Container
										className='p-5 border rounded-3 bg-light'
										key={review.id}>
										<h1>{review.title}</h1>
										<small>{review.body}</small>
										<EditReview _handleChange={_handleChange} reviewId={review.id} _updateReviews={_updateReviews} getArtistsDetail={getArtistsDetail} _handleDelete={_handleDelete} />
									</Container>

								);
							})}

					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Container>
				<>
					<Button className="press-me" variant="primary" onClick={handleShow}>
						Songs
					</Button>

					<Offcanvas show={show} onHide={handleClose}>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>Songs</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<h2>{artists.name}'s Songs</h2>
							{!artists.songs.length && <p>No songs just yet</p>}
							{artists.songs.length > 0 &&
								artists.songs.map((song) => {
									return (
										<Container className="song-content"
											className='p-2 border rounded-2 bg-light'
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

						</Offcanvas.Body>
					</Offcanvas>
				</>
			</Container>
		</Container>
	)
}