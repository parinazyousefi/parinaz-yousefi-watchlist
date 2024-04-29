import "./Discover.scss";
import Header from "../../components/Header/Header";
import DiscoverList from "../../components/DiscoverList/DiscoverList";
import { api_key, api_url } from "../../utils.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Discover = () => {
  const [movies, setMovies] = useState([ ]);
  const [shows, setShows] = useState([ ]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const reqMovies = await axios.get(
          `${api_url}/discover/movie?api_key=${api_key}`
        );
        const reqShows = await axios.get(
          `${api_url}/discover/tv?api_key=${api_key}`
        );
        const moviesData = reqMovies.data;
        const moviesShow = reqShows.data;
        console.log(moviesData.results);
        setMovies(moviesData.results.slice(0,4));
        setShows(moviesShow.results.slice(0,4));
      } catch (error) {
        console.log("sorry cant get the data from api", error);
      }
    };getMovies();
  },[]);
  return (
    <div className="discover">
      <Header />
      <DiscoverList movies={movies} shows={shows} />
    </div>
  );
};
export default Discover;
