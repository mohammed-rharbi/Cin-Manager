const Comment = require('../models/commentsSchema');
const { populate } = require('../models/movieSchema');

class CommentRepositore {


    async create(userId, movieId, content) {


        const comments = new Comment({ user: userId, movie: movieId, content: content });

        await comments.save();

        return comments;
    }


    async remove(id) {

        return await Comment.findByIdAndDelete(id);

    }


    async getComments(id) {

        return await Comment.find({ movie: id }).populate('user');

    }


}

module.exports = new CommentRepositore();