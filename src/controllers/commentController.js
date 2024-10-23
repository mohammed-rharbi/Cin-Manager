const commentsService = require('../services/commentService');




class CommentController{



    async addComment(req , res){



        try{

            // const {userId , movieId , content} = ;

            // console.log(req.body)
            
            const comment = await commentsService.addComment(req.body);


            if(!comment){

                return res.status(404).json('comment messing')
            }

            res.status(200).json({message:'comment was added', comment});

        }catch(err){

            res.status(500).json({err: err.message})
        }

    }

    async getComments(req , res ){


        try{

            const movie = req.params.id

            // console.log(movie)


            const comments = await commentsService.getAll(movie);

            if(!comments){
                return res.status(404).json('no comments found')
            }

            res.status(200).json({message: 'commints found !! ' , comments});
            
        }catch(err){
            res.status(500).json({err: err.message})
        }
    }



}

module.exports = new CommentController();