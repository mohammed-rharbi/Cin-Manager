const MovieService = require('../services/movieService');
const {movieValidation} = require('../utils/movieValdation');



exports.createMovie = async (req , res)=>{


    try{

        const {error} = movieValidation.validate(req.body);
        if(error) throw new Error(error.details[0].message);
     

        const imgUrl = req.file;

        const newMovie = await MovieService.createMovie(req.body , imgUrl);


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