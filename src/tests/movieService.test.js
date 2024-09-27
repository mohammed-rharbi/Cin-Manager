const movieRepositories = require('../repositories/movieRepositories');
const movieService = require('../services/movieService');
const cloudinary = require('cloudinary');


jest.mock('../repositories/movieRepositories');



describe('movieService', () => {


    test('should create a new movie successfully', async () => {

        const movieData = { title: 'Test Movie', description: 'Action', director: 'Director Name', duration: 120 };
        const newMovie = { _id: 'movieId123', ...movieData };
      
        movieRepositories.create.mockResolvedValue(newMovie);
      
        const result = await movieService.createMovie(movieData);
      
        expect(movieRepositories.create).toHaveBeenCalledWith(movieData);
        expect(result).toEqual(newMovie);
      });



      test('should retrieve a movie by ID successfully', async () => {
        const movieId = 'movieId123';
        const movie = { _id: movieId, title: 'Test Movie', genre: 'Action' };
      
        movieRepositories.getMovieById.mockResolvedValue(movie);
      
        const result = await movieService.getMovieById(movieId);
      
        expect(movieRepositories.getMovieById).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(movie);
      });
      


      test('should throw an error when movie is not found', async () => {
        const movieId = 'movieId123';
      
        movieRepositories.getMovieById.mockResolvedValue(null);
      
        await expect(movieService.getMovieById(movieId)).rejects.toThrow('Movie not found');
      
        expect(movieRepositories.getMovieById).toHaveBeenCalledWith(movieId);
      });
      

      test('should update a movie successfully', async () => {
        const movieId = 'movieId123';
        const movieUpdateData = { title: 'Updated Movie Title' };
        const updatedMovie = { _id: movieId, title: 'Updated Movie Title', genre: 'Action' };
      

        movieRepositories.updateMovie.mockResolvedValue(updatedMovie);
      
        const result = await movieService.updateMovie(movieId, movieUpdateData);
      
        expect(movieRepositories.updateMovie).toHaveBeenCalledWith(movieId, movieUpdateData);
        expect(result).toEqual(updatedMovie);
      });
      

      test('should delete a movie successfully', async () => {
        const movieId = 'movieId123';
      

        movieRepositories.deleteMovie = jest.fn().mockResolvedValue({});
      
        const result = await movieService.deleteMovie(movieId);
      
        expect(movieRepositories.deleteMovie).toHaveBeenCalledWith(movieId);
        expect(result).toEqual('movie was deleted successfully');
      });
      





})