const FavoriteRepositores = require('../repositories/favoriteRepositores');






class FavoritService {
    


    async addToFavorite(userId , movieId){

        const newFavorite = await FavoriteRepositores.create(userId , movieId)

        if(!newFavorite){

            console.log('there is a mistake');

        }

        return newFavorite;
    }


    async removFromFavorite(id){

        const removeIt = await FavoriteRepositores.remove(id);
        
        return 'movie was removed';
    }

    async getAll(id){

        const favortes = await FavoriteRepositores.getUserFavorite(id);

        return favortes;
    }


}


module.exports = new FavoritService();

