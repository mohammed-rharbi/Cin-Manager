const CommentRepositore = require('../repositories/commentRepositorie')





class CommentsService {
    


    async addComment(data){

        const {userId , movieId , content} = data ;

        if(!content) throw new Error('content missing');

        if(!movieId ) throw new Error('movie id not found');

        if(!userId) throw new Error('user id not found')

            
        // console.log(userId , movieId , content);
        

        const newComment = await CommentRepositore.create(userId , movieId , content)

        if(!newComment){

            console.log('there is a mistake');

        }

        return newComment;
    }


    async getAll(id){

        const comments = await CommentRepositore.getComments(id);

        return comments;
    }


}


module.exports = new CommentsService();

