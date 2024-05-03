import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import DiscoverList from "../../components/DiscoverList/DiscoverList";
import { api_key, api_url } from "../../utils.js";
import Search from "../../components/Search/Search.jsx";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionId = async () => {
      try {
        const requestToken = localStorage.getItem('requestToken');
        if (!requestToken) {
          // Redirect to login page if request token is not found
          navigate('/login');
          return;
        }

        const existingSessionId = localStorage.getItem('sessionId');
        console.log(existingSessionId);
        if (!existingSessionId) {
          // Generate session ID
          const response = await axios.post(`${api_url}/authentication/session/new?api_key=${api_key}`, {
            request_token: requestToken,
          });
          const sessionId = response.data.session_id;
          // Save session ID to local storage
          localStorage.setItem('sessionId', sessionId);
          console.log(sessionId);
        }
      } catch (error) {
        // Handle errors
        console.log("Error generating session ID:", error);
      }
    };

    getSessionId(); // Call getSessionId when component mounts
    fetchGenres(); // Fetch genres data
    getMovies(); // Fetch movies and shows data
  }, []);

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
      setMovies(moviesData.results.slice(0, 4));
      setShows(moviesShow.results.slice(0, 4));
    } catch (error) {
      console.log("sorry cant get the data from api", error);
    }
  };

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

  const redirectToSearchPage = () => {
    navigate("/auth/search");
  };

  return (
    <div className="discover">
      <Header />
      <Search genres={genres} isDiscover={true}/> {/* Pass genres prop to Search component */}
      <DiscoverList movies={movies} shows={shows} />
    </div>
  );
};

export default Discover;
