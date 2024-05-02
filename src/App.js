import './App.scss';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Discover from './pages/Discover/Discover';
import Movie from './pages/Movie/Movie';
import Show from './pages/Show/Show';
import SearchResult from './pages/SearchResult/SearchResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/auth/discover' element={<Discover/>}/>
        <Route path='/auth/search' element={<SearchResult/>}/>
        <Route path='/auth/movie/:movieId' element={<Movie/>}/>
        <Route path='/auth/tv/:showId' element={<Show/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
