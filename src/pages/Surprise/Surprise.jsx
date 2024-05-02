import Header from "../../components/Header/Header";
import "./Surprise.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { api_key, api_url } from "../../utils";
import MovieCard from "../../components/MovieCard/MovieCard";

const Surprise = () => {
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [result,setResult]=useState('');
  const [genres, setGenres] = useState([]);
  useEffect(() => {
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
    fetchGenres();
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleFilter = async () => {
    // Construct endpoint based on selected category
    const endpoint =
      selectedCategory === "movie" ? "/discover/movie" : "/discover/tv";
    // Construct filter query with selected genre
    const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
    try {
      // Send API request to fetch filtered results
      const response = await axios.get(
        `https://api.themoviedb.org/3${endpoint}?api_key=${api_key}${genreQuery}`
      );
      const data = response.data.results;
      console.log(data);
      const i=Math.floor(Math.random() * 10);
      console.log(data[i]);
      setResult(data[i]);
    } catch (error) {
      console.log("Error fetching filtered results:", error);
    }
  };
  return (
    <div className="surprise">
      <Header />
      <div className="filter-section">
        <select
          className="filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>
        <select
          className="filter"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleFilter}>
          Filter
        </button>
      </div>
      <div className="random-result" key={result ? result.id : 'default'}>
        <Link to={`/auth/${selectedCategory}/${result.id}`}>
       <MovieCard movie={result} className='item'/>
       </Link>
      </div>
    </div>
  );
};
export default Surprise;
