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
		</div>
	);
};