import './App.css';
import './styles.css'; // Importing the styles.css file
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import React, { useState, useEffect } from "react";
import Watchlist from './components/Watchlist';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);


  useEffect(() => {

    fetch('movies.json')
      .then(response => response.json())
      .then(data => setMovies(data));

  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };


  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/"
              element={<MoviesGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />}>
            </Route>
            <Route path="/watchlist"
              element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />}>
            </Route>
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
