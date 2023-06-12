import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import Movie from './components/Movie';
import SeatMap from './components/SeatMap';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';
import Landing from './components/Landing';
import About from './components/About';
import PayPalButton from './components/PayPalButton';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/about', element: <About /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/ticket', element: <Ticket /> },
  { path: '/movies', element: <Movies /> },
  { path: '/seatmap', element: <SeatMap /> },
  { path: '/seatmap/pay', element: <PayPalButton />},
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
