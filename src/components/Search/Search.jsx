import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api_key,api_url } from "../../utils";
import './Search.scss';

const Search = ({ genres, isDiscover }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // Redirect to the search results page with the query
      navigate(`/auth/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleFilter = async () => {
    // Construct endpoint based on selected category
    const endpoint = selectedCategory === "movie" ? "/discover/movie" : "/discover/tv";
    // Construct filter query with selected genre
    const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
    try {
      // Send API request to fetch filtered results
      const response = await axios.get(
        `https://api.themoviedb.org/3${endpoint}?api_key=${api_key}${genreQuery}`
      );
      const data = response.data;
      if (isDiscover) {
        // Redirect to the search results page with the filtered results
        navigate(`/auth/search`, { state: { results: data.results } });
      } else {
        // Show results on the same page
        // Handle filtered results here
      }
    } catch (error) {
      console.log("Error fetching filtered results:", error);
    }
  };

  return (
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
      <div className="filter-section">
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
        <button className="button" onClick={handleFilter}>Filter</button>
      </div>
    </div>
  );
};

export default Search;
