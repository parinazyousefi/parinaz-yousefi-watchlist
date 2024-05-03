import './Login.scss';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { api_key, api_url } from '../../utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateRequestToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/authentication/token/new?api_key=${api_key}`);
      const requestToken = response.data.request_token;
      localStorage.setItem('requestToken', requestToken);
      navigateExternal(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth/discover`);
    } catch (error) {
      setError(error.message || 'An error occurred while generating request token.');
      setLoading(false);
    }
  };

  const navigateExternal = (url) => {
    window.location.href = url;
  };

  return (
    <div className='login'>
      {error && <p className="error">{error}</p>}
      <button onClick={generateRequestToken} disabled={loading}>Connect to TMBD</button>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LoginPage;
