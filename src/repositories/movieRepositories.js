const Movie = require('../models/movieSchema');







class MovieRepository{


async create (movieData){

    const newMovie = new Movie(movieData);
    return await newMovie.save();

    }
    

async getMovieById(id){

return await Movie.findOne({_id : id});
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


async getRealtedMovies(movieId , Director , gen , relseDate){


    const realted = await Movie.find({

        _id: { $ne: movieId },
        $or:[

           { deroctor: Director},
           { gen: gen},
           { relseDate : relseDate}
            
        ]
       
    }).limit(4)

    return realted 

}

async getLatestMovies(){

    return await Movie.find().sort({relseDate:-1}).limit(10);
}


}

module.exports = new MovieRepository();