import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import Movie from './components/Movie';
import SeatMap from './components/SeatMap';
import Tickets from './components/Tickets';
import Ticket from './components/Ticket';
import Landing from './components/Landing';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/landing', element: <Landing /> },
  { path: '/tickets', element: <Tickets /> },
  { path: '/tickets/ticket', element: <Ticket /> },
  { path: '/movies', element: <Movies /> },
  { path: '/seatmap', element: <SeatMap /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/movies/movie', element: <Movie /> }
]);

function App () {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
