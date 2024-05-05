
import MovieCard from "./MovieCard";
import '../styles.css';
import React, { useState } from "react";


export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const matchesGenre = (movie, genre) => {
        return genre === 'All Genres' || movie.genre.toLowerCase() === genre.toLowerCase();
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const matchesRating = (movie, rating) => {
        if (rating === 'All') {
            return true;
        } else if (rating === 'Good') {
            return movie.rating >= 8;
        } else if (rating === 'Ok') {
            return movie.rating >= 5 && movie.rating < 8;
        } else {
            return movie.rating < 5;
        }
    };

    const filteredMovies = movies.filter((movie) =>

        matchesGenre(movie, genre) &&
        matchesSearchTerm(movie, searchTerm) &&
        matchesRating(movie, rating)
    );
    return (
        <div>
            <input type='text'
                className='search-input'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Genre</label>
                    <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className='movies-grid'>
                {
                    filteredMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={watchlist.includes(movie.id)} />
                    ))
                }
            </div>
        </div>
    );
}