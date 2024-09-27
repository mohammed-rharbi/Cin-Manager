    const movieRepositories = require('../repositories/movieRepositories');
    const cloudinary = require('cloudinary');




    class MovieService{


        async createMovie(movieData){
    

            const newMovie = await movieRepositories.create(movieData);

            return  newMovie
        }



        async getMovieById(id){


            const movie = await movieRepositories.getMovieById(id);
            if(!movie) throw new Error('Movie not found');
            return movie;
        }

        async getMovies(){

            const movies = await movieRepositories.getMovies();

            return movies;  

        }


        async updateMovie(id , movieData){


            const movie = await movieRepositories.updateMovie(id , movieData);

            return movie;

        }


        async deleteMovie(id){


            await movieRepositories.deleteMovie(id);
            
            return 'movie was deleted successfully';

        }


    }

    module.exports = new MovieService();