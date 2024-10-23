const Rating = require('../models/movieRating');


class RatingRepositore {


    async create(userId, movieId , ratingValue) {


        let Rate = await Rating.findOneAndUpdate(

            { user: userId , movie: movieId }, { rating: ratingValue } ,{ new: true, upsert: true } 

        );
    
        return Rate;
    }


    async getMovieRating(movieId){

        const rating =  await Rating.find({movie : movieId});

        if(!rating){
            return ('this movie does not have rating');
        }

        return rating ;

    }

    // async getMovieAverageRate(movieId){

    //     const rate = await Rating.find({movie: movieId });

    //     if(!rate){

    //         return ('no rate found for this movie');
    //     }
    // }
      



}

module.exports = new RatingRepositore();