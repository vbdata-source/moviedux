import React from "react";
import '../styles.css';
import MovieCard from "./MovieCard";

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
    return (
        <div>
            <h1>Watchlist</h1>
            <div className="watchlist">
                {
                    watchlist.map(id => {
                        const movie = movies.find(movie => movie.id === id);
                        return <MovieCard key={movie.id} movie={movie} isWatchlisted={true} toggleWatchlist={toggleWatchlist} />
                    })
                }
            </div>
        </div>
    );
}