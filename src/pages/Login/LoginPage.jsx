import './Login.scss';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { api_key, api_url } from '../../utils';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateRequestToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/authentication/token/new?api_key=${api_key}`);
      const requestToken = response.data.request_token;
      navigateExternal(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth/discover`)
      createSessionId(requestToken);
    } catch (error) {
      setError(error.message || 'An error occurred while generating request token.');
      setLoading(false);
    }
  };

  const createSessionId = async (requestToken) => {
    try {
      setLoading(true);
      const response = await axios.post(`${api_url}/authentication/session/new`, {
        request_token: requestToken,
      });
      console.log(response);
      const sessionId = response.data.session_id;
      console.log(sessionId);
      // Redirect or navigate to another page after creating session ID if needed
    //   navigate(`https://www.themoviedb.org/authenticate/${response}?redirect_to=http://localhost:3000`)
    //   navigate(`/auth/discover`);
    } catch (error) {
      setError(error.message || 'An error occurred while creating session ID.');
    } finally {
      setLoading(false);
    }
  };
  
  const navigateExternal = (url) => {
    window.location.href = url;
  };

  return (
    <div className='login'>
      {error && <p className="error">{error}</p>}
      {/* <Button text="Log in" onClick={generateRequestToken} disabled={loading} /> */}
      <button className='button' onClick={generateRequestToken} disabled={loading} >Connect to TMBD</button>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LoginPage;
