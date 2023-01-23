// import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

//cf38e241
const API_URL = 'http://www.omdbapi.com?apikey=cf38e241';


const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	}

	useEffect(() => {
		searchMovies('Requiem');

	}, []);
	return (
		<div className='app'>
			<h1>Media Query</h1>
			<div className='search'>
				<input
					placeholder="search for movies"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							searchMovies(searchTerm)
						}
					}}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{
				movies?.length > 0
					? (
						<div className="container">
							{movies.map((movie) => (
								<MovieCard movie={movie} />
							))}
						</div>
					) : (
						<div className="empty">
							<h2>No movies found</h2>
						</div>
					)}
		</div>
	);
}

export default App;