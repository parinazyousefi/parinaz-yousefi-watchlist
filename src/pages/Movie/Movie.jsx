import { useEffect, useState } from "react";
import "./Movie.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
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
        console.log(movieData);
        setMovie(movieData);
      } catch (error) {
        console.log("sorry cant fetch movie");
      }
    };
    getMovie();
  }, [movieId]);
  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w300"; // Choose the desired poster size
  const imageUrl = `${baseImageUrl}${posterSize}${movie.poster_path}`;
  // const handleAddtoFavorite=(movie)=>{
  //     useEffect(()=>{

  //         // const resAdd=await axios.post()
  //     })

  // }
  return (
    <div className="movie-page">
      <Header />
      <div className="movie-content">
        <h1 className="movie__title">{movie.title}</h1>
        <div className="movie-info">
          <img className="poster" src={imageUrl} alt={movie.title}></img>
          <div className="movie__desc">
            {movie.genres && Array.isArray(movie.genres) && (
              <p className="desc">Genres:  
                {movie.genres.map((item) => item.name).join(", ")}
              </p>
            )}
            {movie.spoken_languages && Array.isArray(movie.spoken_languages) && (
              <p className="desc">Spoken Languages:  
                {movie.spoken_languages.map((item) => item.name).join(", ")}
              </p>
            )}

            <p className="desc">Runtime: {movie.runtime}</p>
            <p className="desc">Release date: {movie.release_date}</p>
            <p className="desc">Overview: {movie.overview}</p>
          </div>
          <button className="button">Add to watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
