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

async updateMovie(id , movieData){

return await Movie.findByIdAndUpdate(id , movieData , {new : true})

}

async deleteMovie(id){

return await Movie.findByIdAndDelete(id);
}





}

module.exports = new MovieRepository();