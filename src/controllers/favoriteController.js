const FavoritService = require('../services/favoriteServic');




class FavoriteController{



    async addToFavorite(req , res){


        try{

            
            const {movieId , userId} = req.body ;
            
            const favorite = await FavoritService.addToFavorite(userId , movieId);
            res.status(200).json({message:'movie was added', favorite});

        }catch(err){

            res.status(500).json({err: err.message})
        }

    }

    async getAll(req , res ){


        try{

            const {userId} = req.query

            const favorites = await FavoritService.getAll(userId);
            res.status(200).json({message: 'my favorites ' , favorites});
            
        }catch(err){
            res.status(500).json({err: err.message})
        }
    }



}

module.exports = new FavoriteController();