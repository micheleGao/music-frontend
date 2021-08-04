import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

export default function Artists({ userInfo, loggedIn }) {
    const [artists, setArtists] = useState([]);
    const { id } = useParams()
    const getArtistsIndex = async () => {
        try {
            const response = await fetch(`http://localhost:8000/artists/`);
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
        getArtistsIndex();
    }, []);

    console.log(artists)

    if (artists.length <= 0) {
        return "loading..."
    }

    return (
        <Container>
            <h1>Artists</h1>
			<CardGroup>
            <Row md={2} md={2} lg={3} className="g-2">
					{artists && artists.map((artist) => {
						return (
							<Col md={2} md={2} md={3} key={artist.id}>
								<Link
									to={`artists/${artist.id}`}
									style={{ color: 'black', textDecoration: 'none' }}>
									<Card>
										{/* <Card.Img
											variant='top'
											src={artist.photo_url}
										/> */}
                                        <Image src={artist.photo_url} width="130px" height="160px" roundedCircle />

										<Card.Body>
											<Card.Title>
                                                {artist.name}
                                            </Card.Title>
											<Card.Text>
                                                {/* <Link>{artist.songs}</Link> */}
                                                
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						);
					})}
				</Row>
			</CardGroup>
        </Container>
    );
}