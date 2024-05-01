import { useEffect, useState } from "react";
import "./Show.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url, api_key } from "../../utils";
import Header from "../../components/Header/Header";
const Show = () => {
  const { showId } = useParams();
  const [show,setShow]=useState({});
  useEffect(() => {
    const getShow = async () => {
      try {
        const reqShow = await axios.get(
          `${api_url}/tv/${showId}?api_key=${api_key}`
        );
        const showData = reqShow.data;
        console.log(showData);
        setShow(showData);
      } catch (error) {
        console.log("sorry cant fetch show");
      }
    };getShow();
  },[showId]);
  const baseImageUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w300"; // Choose the desired poster size
    const imageUrl = `${baseImageUrl}${posterSize}${show.poster_path}`;
  return <div className="movie-page">
    <Header/>
    <div className="movie-content">
    <h1 className="movie__title">{show.name}</h1>
    <div className="movie-info">
        <img className="poster" src={imageUrl} alt={show.name}></img>
        <div className="movie__desc">
        {show.genres && Array.isArray(show.genres) && (
              <p className="desc">Genres:  
                {show.genres.map((item) => item.name).join(", ")}
              </p>
            )}
            {show.spoken_languages && Array.isArray(show.spoken_languages) && (
              <p className="desc">Spoken Languages:  
                {show.spoken_languages.map((item) => item.name).join(", ")}
              </p>
            )}

            <p className="desc">Runtime: {show.runtime}</p>
            <p className="desc">Release date: {show.release_date}</p>
            <p className="desc">Overview:{show.overview}</p>
        </div>
        <button className="button">Add to watchlist</button>
    </div>
    </div>
  </div>;
};

export default Show;
