import { useEffect, useState } from "react";
import axios from "axios";
import { api_key, api_url } from "../../utils.js";
import { Link, useLocation } from "react-router-dom";
import './SearchResult.scss';
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import Header from "../../components/Header/Header.jsx";

const SearchResult = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setQuery(queryParam);
    }
    fetchGenres();
  }, [location]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSearchResults(query);
    }
  }, [query]);

  useEffect(() => {
    const filteredResults = location.state?.results;
    if (filteredResults) {
      setResults(filteredResults);
    }
  }, [location.state]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `${api_url}/search/${selectedCategory}?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`
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
        `${api_url}/genre/${selectedCategory}/list?api_key=${api_key}&language=en-US`
      );
      const data = response.data;
      setGenres(data.genres);
    } catch (error) {
      console.log("Error fetching genres:", error);
      setGenres([]);
    }
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  const handleFilterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.get(
        `${api_url}/discover/${selectedCategory}?api_key=${api_key}&language=en-US&page=1&include_adult=false&with_genres=${selectedGenre}`
      );
      const data = response1.data;
      if (!data.errors) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log("Error fetching filtered results:", error);
      setResults([]);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Fetch genres for the selected category
    fetchGenres();
  };

  return (<>
    <Header/>
    <div className="search-result">
    <div className="find">
      <div className="search-bar">
        <form className="search-form" onSubmit={handleSearchFormSubmit}>
          <input
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="button">Search</button>
        </form>
      </div>
      <div className="filter-bar">
        <form className="filter-form" onSubmit={handleFilterFormSubmit}>
          <select className="filter" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
          </select>
          <select className="filter" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <button type="submit" className="button">Filter</button>
        </form>
      </div>
    </div>
      <div className="results">
        <ul className="result__list">
          {results.map((result) => (
            <Link to={`/auth/${selectedCategory}/${result.id}`} key={result.id}>
              <MovieCard movie={result} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  </>
  );
};

export default SearchResult;
