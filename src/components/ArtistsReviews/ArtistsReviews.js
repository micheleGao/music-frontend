import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';

export default function ArtistsReviews(){
    const [reviews, setReviews] = useState([])
    const getReviewsDetail = async () => {
		try {
			const response = await fetch(`http://localhost:8000/reviews`);
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				setReviews(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getReviewsDetail();
	}, []);

    console.log(reviews)

    return(
            <Container>
                <div>
                    {!reviews.length && <p>No songs just yet</p>}
                    {reviews.length > 0 &&
                        reviews.map((review) => {
                            return (
                                <Container
                                    className='p-5 border rounded-3 bg-light'
                                    key={review.id}>
                                    <h1>Artist name: {review.artist_name}</h1>
                                    <h1>{review.title}</h1>
                                    <p>{review.body}</p>
                                    <small>{review.created}</small>
                                    <div>
									
								</div>
                                </Container>
                            );
                        })}
                </div>
			</Container>

    )
}