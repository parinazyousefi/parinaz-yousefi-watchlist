import React, { useEffect, useState } from "react";
import "./Show.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import Header from "../../components/Header/Header";

const Show = () => {
  const { showId } = useParams();
  const [show, setShow] = useState({});
  const [streamingAvailability, setStreamingAvailability] = useState({});

  useEffect(() => {
    const getShow = async () => {
      try {
        const reqShow = await axios.get(
          `${api_url}/tv/${showId}?api_key=${api_key}`
        );
        const showData = reqShow.data;
        setShow(showData);

        // Fetch streaming availability using TMDb ID
        const reqAvailability = await axios.get(
          `https://streaming-availability.p.rapidapi.com/get`,
          {
            params: {
              output_language: "en",
              tmdb_id: `tv/${showId}`,
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
          "Sorry, couldn't fetch show data or streaming availability."
        );
      }
    };
    getShow();
  }, [showId]);

  const handleAddtoFavorite = async () => {
    // Add to watchlist functionality
  };

  const handleDeleteFromFavorite = async () => {
    // Remove from watchlist functionality
  };

  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w300";
  const imageUrl = `${baseImageUrl}${posterSize}${show.poster_path}`;

  return (
    <div className="movie-page">
      <Header />
      <div className="movie-content">
        <h1 className="movie__title">{show.name}</h1>
        <div className="movie-info">
          <img className="poster" src={imageUrl} alt={show.name}></img>
          <div className="movie__desc">
            {show.genres && Array.isArray(show.genres) && (
              <p className="desc">
                Genres: {show.genres.map((item) => item.name).join(", ")}
              </p>
            )}
            {show.spoken_languages && Array.isArray(show.spoken_languages) && (
              <p className="desc">
                Spoken Languages:{" "}
                {show.spoken_languages.map((item) => item.name).join(", ")}
              </p>
            )}
            <p className="desc">Runtime: {show.runtime}</p>
            <p className="desc">Release date: {show.release_date}</p>
            <p className="desc">Overview: {show.overview}</p>
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

            {/* Display streaming availability */}
            {streamingAvailability.streamingInfo &&
              streamingAvailability.streamingInfo.ca &&
              streamingAvailability.streamingInfo.ca.map((result, index) => (
                <div key={index} className="streaming-availability">
                  <h3>Streaming Availability:</h3>
                  <p>
                    {result.service}: {result.streamingType}
                  </p>
                </div>
              ))}
          </div>
          <button className="button" onClick={handleAddtoFavorite}>
            Add to watchlist
          </button>
          <button className="button-delete" onClick={handleDeleteFromFavorite}>
            Delete from watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Show;
