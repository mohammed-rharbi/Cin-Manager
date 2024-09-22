const MovieService = require('../services/movieService');
const {movieValidation} = require('../utils/movieValdation');



exports.createMovie = async (req , res)=>{


    try{

        const {error} = movieValidation.validate(req.body);
        if(error) throw new Error(error.details[0].message);
     


        const newMovie = await MovieService.createMovie(req.body);


        res.status(201).json({message : 'movie was created successfully' , movie : newMovie});

    }catch(err){    

        res.status(400).json({error : err.message});


    }

}

exports.getMovies = async (req , res)=>{

    try{

        const movies = await MovieService.getMovies();

        res.status(200).json({message : 'movies were fetched successfully' , movies});

    }catch(err){

        res.status(400).json({error : err.message});

    }
}

exports.updateMovie = async (req , res)=>{

    try{

        // const {error} = movieValidation.validate(req.body);
        // if(error) throw new Error(error.details[0].message);


        const updatedMovie = await MovieService.updateMovie(req.params.id , req.body);
        res.status(200).json({message : 'movie was updated successfully' , movie : updatedMovie});

    }catch(err){
        res.status(400).json({error : err.message});
    }   

};


exports.deleteMovie = async (req , res)=>{


    try{

        const deletedMovie = await MovieService.deleteMovie(req.params.id);

        res.status(200).json({message : 'movie was deleted successfully' , movie : deletedMovie});

    }catch(err){

        res.status(400).json({error : err.message});

    }
};
