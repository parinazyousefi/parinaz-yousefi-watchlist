import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ genres }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // Redirect to the search results page with the query
      navigate(`/auth/search?q=${encodeURIComponent(query)}`);
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
      <select className="filter">
        <option>Movie</option>
        <option>TV</option>
      </select>
      {genres && (
        <select className="filter">
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Search;
