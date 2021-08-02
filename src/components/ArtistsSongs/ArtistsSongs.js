import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";


export default function ArtistsSongs() {
	const [songs, setSong] = useState({});
	const { id } = useParams()
	const getSongDetail = async () => {
		try {
			const response = await fetch(`http://localhost:8000/songs`);
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				setSong(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSongDetail();
	}, []);

	console.log(songs.length)

	return (
		<div>
			<Container>
				{!songs.length && <p>No songs just yet</p>}
				{songs.length > 0 &&
					songs.map((song) => {

						return (
							<Container
								className='p-5 border rounded-3 bg-light'
								key={song.id}>
								<h1>{song.title}</h1>
								<p>{song.album}</p>
								<div>
									<ReactPlayer
										url={song.play_url}
									/>
								</div>
							</Container>

						);
					})}
			</Container>
			{/* <h1>songs</h1>
				<small>{songs.title}</small>
				<small>{songs.album}</small>
				<small>{songs.play_url}</small>
				<small>{songs.artist}</small> */}

		</div>
	)
}