const movieRepositories = require('../repositories/movieRepositories');
const cloudinary = require('cloudinary');




class MovieService{


    async createMovie(movieData , imgUrl){
 

        let url ;

        if(imgUrl){

            const result = await cloudinary.uploader.upload(imgUrl.path ,{

                folder : 'cinema-manager',
            });

            url = result.secure_url;
        }

        const movie = {
            ...movieData,
            image : url || null 
        }

        const newMovie = await movieRepositories.create(movie);

        return  newMovie
    }

    

    async getMovieById(id){


        const movie = await movieRepositories.getMovieById(id);
        if(!movie) throw new Error('movie not found');
        return movie;
    }

    async getMovies(){

        const movies = await movieRepositories.getMovies();

        return movies;  

    }


}

module.exports = new MovieService();