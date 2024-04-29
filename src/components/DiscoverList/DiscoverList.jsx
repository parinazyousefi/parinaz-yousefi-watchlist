import "./DiscoverList.scss";
import MovieCard from "../MovieCard/MovieCard";

const DiscoverList = ({ movies,shows }) => {
  return (
    <div className="discover__list">
      <h2> Discover</h2>
      <div className="movies">
        <h3 className="movies__title">Movies</h3>
        <div className="movies__list">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
      <div className="shows">
        <h3 className="shows__title">Shows</h3>
        <div className="shows__list">
        {shows.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default DiscoverList;
