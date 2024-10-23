const RatingService = require('../services/ratingService');



class RatingController{



async rateMovie (req , res){

    const {movieId , userId , rate} = req.body;

    try{


        if(!rate || rate < 1 || rate > 5){
            return res.status(500).json({message:'the rate most be above 1 and under 5'});
        }

        const rating = await RatingService.RateMovie(movieId, userId, rate);


        return res.status(200).json({message:'movie is reated',  rating});

    }catch(err){

        return res.status(500).json({message:'movie was not ben rated ' , err});
    }

}    


async getAllMovieRatinges (req , res){

    const movieId = req.params.id;


    try{
        

        const movieRating = await RatingService.getAll(movieId);

        

        if(!movieRating || movieRating.length === 0){
            return res.status(404).json({message:'this movie does not have rating'});
        }

        return res.status(200).json({message:'movieRating fetched successfully ' ,ratig: movieRating});

    }catch(err){
        
        return res.status(500).json({err: err.message})
    }

}

async getMovieRate (req , res){

    const movieId = req.params.id;

    try{
        
        const avgRate = await RatingService.getMovieRate(movieId);


        return res.status(200).json({message:'movieRating fetched successfully' , avgRate});

    }catch(err){
        
        return res.status(500).json({err: err.message})
    }

}




}

module.exports = new RatingController()