import { useState } from 'react';
import ReactPlayer from 'react-player';
import{Link} from 'react-router-dom';
export default function Searchbar({songs }) {

    const [search, setSearch] = useState("");
    const [filteredSong, setFilteredSong] = useState(songs);
    const [showFilteredSong, setShowFilteredSong] = useState(false)
    
    const handleChange = (e) => {
        setSearch(e.target.value)
        setFilteredSong(songs.filter(song => {
            setShowFilteredSong(true);
            return song.title.toLowerCase().includes(search.toLowerCase())
        }))
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setShowFilteredSong(true);
        setFilteredSong(songs.filter(song => {
            return song.title.toLowerCase().includes(search.toLowerCase())
        }))
        setSearch("")
    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" id="search" placeholder="Search For A Song" className="search" value={search} onChange={handleChange} />
            </form>
            {!showFilteredSong
					? songs && songs.map((song, index) => {
						return (
							<div className="filtered-song" key={index}>

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
							<div className="filtered-song" key={index}>

								<Link to={`/artists/${song.artist_id}`}>
									<div className="song">
										<h2>{song.title}</h2>
									</div>
								</Link>

							</div>
						)
                    })

				}
        </div>


    )
}