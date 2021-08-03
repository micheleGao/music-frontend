import { useState } from 'react';
export default function Searchbar({ songs }) {
    // const [songs, setSong] = useState({});
    const [search, setSearch] = useState('');
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
        setFilteredSong(true);
        setShowFilteredSong(songs.filter(song => {
            return song.title.toLowerCase().includes(search.toLowerCase())
        }))
        console.log('hey from the handle search')
        setSearch('')
    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" id="search" placeholder="Search" className="search" value={search} onChange={handleChange} />
            </form>
        </div>


    )
}