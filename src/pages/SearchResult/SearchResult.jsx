import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_key, api_url } from "../../utils.js";
import { Link, useLocation } from "react-router-dom";
import './SearchResult.scss';
import MovieCard from "../../components/MovieCard/MovieCard.jsx";

const SearchResult = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setQuery(queryParam);
      fetchSearchResults(queryParam);
    }
    fetchGenres();
  }, [location]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `${api_url}/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`
      );
      const data = response.data;
      if (!data.errors) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log("Error fetching search results:", error);
      setResults([]);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${api_url}/genre/movie/list?api_key=${api_key}&language=en-US`
      );
      const data = response.data;
      setGenres(data.genres);
    } catch (error) {
      console.log("Error fetching genres:", error);
      setGenres([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchSearchResults(query);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className="search-result">
      <Header />
      <div className="search-bar">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
        <select className="filter">
        <option>Movie</option>
        <option>TV</option>
      </select>
        <select className="filter" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="results">
        <ul className="result__list">
          {results.map((result) => (
            <Link to={`/auth/movie/${result.id}`} key={result.id}>
              <MovieCard movie={result} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResult;
