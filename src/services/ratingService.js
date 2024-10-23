const RatingRepositore = require('../repositories/movieRatingRepositorie');




class RatingService {
    


    async RateMovie(userId , movieId , movieRate){


        const Rate = await RatingRepositore.create(userId , movieId , movieRate)

        if(!Rate){

            throw new Error('movie wasnt rated');

        }

        return Rate;
    }



    async getAll(id){

        const rating = await RatingRepositore.getMovieRating(id);

        return rating;
    }


    async getMovieRate(movieId){


        const rate = await RatingRepositore.getMovieRating(movieId);

        if(!rate){
            
            throw new Error('no rate found for this movie');
        }

        if(rate.length === 0){

            return new Error('the rate is 0');
        }


        const totalRate = rate.reduce((sum , rating ) => sum + rating.rating , 0);
        const avgRate = totalRate / rate.length ;

       

        return avgRate;

    }


}


module.exports = new RatingService();

