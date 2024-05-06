import './App.scss';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Discover from './pages/Discover/Discover';
import Movie from './pages/Movie/Movie';
import Show from './pages/Show/Show';
import SearchResult from './pages/SearchResult/SearchResult';
import Surprise from './pages/Surprise/Surprise';
import Mylist from './pages/Mylist/Mylist';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/auth/discover' element={<Discover/>}/>
        <Route path='/auth/search' element={<SearchResult/>}/>
        <Route path='/auth/surprise' element={<Surprise/>}/>
        <Route path='/auth/myList' element={<Mylist/>}/>
        <Route path='/auth/movie/:movieId' element={<Movie/>}/>
        <Route path='/auth/tv/:showId' element={<Show/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>


      
    </div>
  );
}

export default App;
