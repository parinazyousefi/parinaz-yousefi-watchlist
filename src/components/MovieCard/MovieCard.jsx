import "./MovieCard.scss";
import sample from "../../assets/images/sample.jpg";

const MovieCard = ({ movie }) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w300"; // Choose the desired poster size
    const imageUrl = `${baseImageUrl}${posterSize}${movie.poster_path}`;
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="poster" />
      <h4 className="movie-name">{movie.title}</h4>
      <h4 className="movie-name">{movie.name}</h4>
    </div>
  );
};

export default MovieCard;
