const FavoriteMovie = require('../models/favoriteMovieSchema');

class FavoriteRepositores {


    async create(userId, movieId) {

        let favorite = await FavoriteMovie.findOneAndUpdate(
            { user: userId }, { $addToSet: { movies: movieId } }, { new: true, upsert: true }
        );

        return favorite;
    }


    async remove(id) {

        return await FavoriteMovie.findByIdAndDelete(id);

    }


    async getUserFavorite(id) {

        return await FavoriteMovie.find({ user: id }).populate('movies');

    }


}

module.exports = new FavoriteRepositores();