
import './App.css';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import MovieDetails from './components/Movies/MovieDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        <Route path="/api/movie/get-movie-by-id/:movieId" element={<MovieDetails />} />
        {/* <Route path="/movie/:movieId" element={<MovieDetails />} />  */}
      
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
