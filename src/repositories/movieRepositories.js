const Movie = require('../models/movieSchema');







class MovieRepository{


async create (movieData){

    const newMovie = new Movie(movieData);
    return await newMovie.save();

    }
    

async getMovieById(id){

return await Movie.findById(id);
}


async getMovies(){

return await Movie.find();

}





}

module.exports = new MovieRepository();