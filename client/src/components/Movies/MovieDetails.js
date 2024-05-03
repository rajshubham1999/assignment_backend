import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetMovieById } from '../../apicalls/movies';

const MovieDetails = () => {
  const { movieId } = useParams(); // Extract the movie ID from URL params
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log('Fetching movie details for ID:', movieId); // Added console log
        const response = await GetMovieById(movieId);
        console.log('API response:', response); // Added console log
        if (response.success) {
          setMovie(response.data);
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  console.log('Movie:', movie); // Added console log

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;

