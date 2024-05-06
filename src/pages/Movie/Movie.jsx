import React, { useEffect, useState } from "react";
import "./Movie.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import Header from "../../components/Header/Header";

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [streamingAvailability, setStreamingAvailability] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const reqMovie = await axios.get(
          `${api_url}/movie/${movieId}?api_key=${api_key}`
        );
        const movieData = reqMovie.data;
        setMovie(movieData);

        // Fetch streaming availability using TMDb ID
        const reqAvailability = await axios.get(
          `https://streaming-availability.p.rapidapi.com/get`,
          {
            params: {
              output_language: "en",
              tmdb_id: `movie/${movieId}`,
            },
            headers: {
              "X-RapidAPI-Key":
                "a7c07eceb0mshf7f6faf8bd32687p1749eajsnb40000a04591",
              "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
            },
          }
        );
        const availabilityData = reqAvailability.data.result;
        setStreamingAvailability(availabilityData);
      } catch (error) {
        console.log(
          "Sorry, couldn't fetch movie data or streaming availability."
        );
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

  const handleDeteleFromFavorite = async () => {
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
  };

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
            {movie.spoken_languages &&
              Array.isArray(movie.spoken_languages) && (
                <p className="desc">
                  Spoken Languages:{" "}
                  {movie.spoken_languages.map((item) => item.name).join(", ")}
                </p>
              )}
               {/* Display cast */}
            {streamingAvailability.cast &&
              Array.isArray(streamingAvailability.cast) &&
              streamingAvailability.cast.length > 0 && (
                <div className="cast">
                  <h3>Cast:</h3>
                  <p>
                    {streamingAvailability.cast
                      .map((castMember, index) => castMember)
                      .join(", ")}
                  </p>
                </div>
              )}

            <p className="desc">Runtime: {movie.runtime}</p>
            <p className="desc">Release date: {movie.release_date}</p>
            <p className="desc">Overview: {movie.overview}</p>

            {/* Display streaming availability */}
            {streamingAvailability.streamingInfo &&
              streamingAvailability.streamingInfo.ca &&
              streamingAvailability.streamingInfo.ca.map((result, index) => (
                <div key={index} className="streaming-availability">
                  <h3>Streaming Availability:</h3>
                  <p>{result.service}: {result.streamingType}</p>
                </div>
              ))}
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
