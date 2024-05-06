import { useEffect, useState } from "react";
import "./Movie.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import Header from "../../components/Header/Header";

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const reqMovie = await axios.get(
          `${api_url}/movie/${movieId}?api_key=${api_key}`
        );
        const movieData = reqMovie.data;
        setMovie(movieData);
      } catch (error) {
        console.log("Sorry, couldn't fetch movie data.");
      }
    };
    getMovie();
  }, [movieId]);

  const handleAddtoFavorite = async () => {
    try {
      // Get account ID from localStorage or wherever it's stored
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        console.log("session ID not found.");
        return;
      }

      const response = await axios.post(
        `${api_url}/account/21244892/watchlist?session_id=${sessionId}&api_key=${api_key}`,
        {
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }
      );
      console.log("Movie added to watchlist:", response.data);
    } catch (error) {
      console.log("Couldn't add the movie to the watchlist.", error);
    }
  };

  const handleDeteleFromFavorite=async()=>{
    try {
      // Get account ID from localStorage or wherever it's stored
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        console.log("session ID not found.");
        return;
      }

      const response = await axios.post(
        `${api_url}/account/21244892/watchlist?session_id=${sessionId}&api_key=${api_key}`,
        {
          media_type: "movie",
          media_id: movieId,
          watchlist: false,
        }
      );
      console.log("Movie added to watchlist:", response.data);
    } catch (error) {
      console.log("Couldn't add the movie to the watchlist.", error);
    }

  }

  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w300"; // Choose the desired poster size
  const imageUrl = `${baseImageUrl}${posterSize}${movie.poster_path}`;

  return (
    <div className="movie-page">
      <Header />
      <div className="movie-content">
        <h1 className="movie__title">{movie.title}</h1>
        <div className="movie-info">
          <img className="poster" src={imageUrl} alt={movie.title}></img>
          <div className="movie__desc">
            {movie.genres && Array.isArray(movie.genres) && (
              <p className="desc">
                Genres: {movie.genres.map((item) => item.name).join(", ")}
              </p>
            )}
            {movie.spoken_languages && Array.isArray(movie.spoken_languages) && (
              <p className="desc">
                Spoken Languages:{" "}
                {movie.spoken_languages.map((item) => item.name).join(", ")}
              </p>
            )}

            <p className="desc">Runtime: {movie.runtime}</p>
            <p className="desc">Release date: {movie.release_date}</p>
            <p className="desc">Overview: {movie.overview}</p>
          </div>
          <button className="button" onClick={handleAddtoFavorite}>
            Add to watchlist
          </button>
          <button className="button-delete" onClick={handleDeteleFromFavorite}>
            Delete from watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
