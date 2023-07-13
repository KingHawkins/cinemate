export const createTicket = async (paypalId, seat) => {
  const movie_id = localStorage.getItem('movie');
  const movie = await fetchMovie(movie_id);
  fetch('http://127.0.0.1:8000/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify({
      //id: 'CIN32',
      movie: movie.title,
      cinema: 'Cinemate Cineplex',
      booking_id: paypalId,
      price: 10.0,
      seat_number: seat
    })
  })
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .then(jsondata => console.log(jsondata));
};



/*export const email = async (paypalId, seat) => {
   const movie_id = localStorage.getItem('movie');
   const movie = await fetchMovie(movie_id);
   fetch('http://127.0.0.1:8000/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify({
      id: movie.id,
      movie: movie.title,
      cinema: 'Cinemate Cineplex',
      booking_id: paypalId,
      price: 10.0,
      seat_number: seat
    })
  })
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .then(jsondata => console.log(jsondata));
}
*/

const fetchMovie = (id) => {
  return fetch(`http://127.0.0.1:8000/movies/${id}`)
    .then(response => response.json())
    .catch(err => console.error(err));
};
