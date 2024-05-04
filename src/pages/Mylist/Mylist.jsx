import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Mylist.scss";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Link } from "react-router-dom";

const Mylist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("movies");

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");
        const reqWatchlist = await axios.get(
          `${api_url}/account/21244892/watchlist/${selectedCategory}?session_id=${sessionId}&api_key=${api_key}`
        );
        console.log(`watchlist ${selectedCategory}`, reqWatchlist.data.results);
        setWatchlist(reqWatchlist.data.results);
      } catch (error) {
        console.log("Could not load watchlist:", error);
      }
    };

    getWatchlist(); // Call getWatchlist inside useEffect
  }, [selectedCategory]); // Update useEffect dependency to include selectedCategory

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="watchlist">
      <select
        className="filter"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="movies">Movie</option>
        <option value="tv">TV</option>
      </select>
      <ul className="watchlist__list">
        {watchlist.map((item) => {
          return (
            <Link to={`/auth/${selectedCategory}/${item.id}`} key={item.id}>
              <MovieCard movie={item} />
            </Link>
          );
        })}
      </ul>
      </div>
      </>
  );
};

export default Mylist;
