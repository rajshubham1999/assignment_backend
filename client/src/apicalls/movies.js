import { axiosInstance } from ".";

export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/movie/add-movie', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    return response.data;
  } catch (err) {
    return err;
  }
}

export const GetAllMovies = async () => {
  try {
    const response = await axiosInstance.get('/api/movie/get-all-movies',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    return response.data;
  } catch (err) {
    return err;
  }
}
export const GetMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/api/movie/get-movie-by-id/${movieId}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};