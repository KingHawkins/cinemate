import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import Movie from './components/Movie';
import SeatMap from './components/SeatMap';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/movies', element: <Movies /> },
  { path: '/seatmap', element: <SeatMap /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/movies/movie-info', element: <Movie /> }
]);

function App () {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
