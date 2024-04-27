import './App.scss';
import SignUpPage from './pages/SignUp/SignUpPage';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
