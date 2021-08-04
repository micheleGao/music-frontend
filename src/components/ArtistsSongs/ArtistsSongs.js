import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";


export default function ArtistsSongs({ handleChange, handleSearch, search, showFilteredSong, filteredSong }) {
	const [songs, setSong] = useState([]);
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

	// let musics = Object.keys(songs).sort(function(a, b){return songs[a]-songs[b];});
	// console.log(musics)

	return (
		<div>
			<Searchbar handleChange={handleChange} searchString={search} showFilteredSong={showFilteredSong} filteredSong={filteredSong} handleSearch={handleSearch} songs={songs} />
			{/* <Container> */}
				{/* {!songs.length && <p>No songs just yet</p>}
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
					})}  */}

				 {/* {!showFilteredSong 
					? songs && songs.map((song, index) => {
						return (
							<div className="TP" key={index}>

								<Link to={`/artists/${song.artist_id}`}> 
									<div className="songs">
										<h1>{song.title}</h1>
										<ReactPlayer
										width="100px"
										height="100px"
										url={song.play_url}
										/>
									</div>
								</Link>
							</div>
						)
					})
					: filteredSong.map((song, index) => {
                        return (
							<div className="TP" key={index}>

								<Link to={`/songs/${song.artist_id}`}>
									<div className="song">
										<h2>{song.title}</h2>
									</div>

								</Link>

							</div>
						)
                    })

				}
			</Container> */}

			{/* </Container> */}


		</div>
	);
};