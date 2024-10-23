const MovieService = require('../services/movieService');
const ShowtimeService = require('../services/showTimeService');
const {movieValidation} = require('../utils/movieValdation');



exports.createMovie = async (req , res)=>{


    try{

        const {error} = movieValidation.validate(req.body);
        if(error) throw new Error(error.details[0].message);
     
        
        const image = req.file ? req.file.path : null;

        const newMovie = await MovieService.createMovie({ ...req.body , image});


        res.status(201).json({message : 'movie was created successfully' , movie : newMovie});

    }catch(err){    

        res.status(400).json({error : err.message});


    }

}


exports.addVideoToMovie = async (req , res)=>{


    try{

        const {movieId} = req.params;

        const videoFile = req.file;

        if(!movieId) throw new Error('movie id is required');
        if(!videoFile) throw new Error('video file is required');

        const videoUrl = await MovieService.uploadVideoToMovie(videoFile);

        const updatedMovie = await MovieService.addVideoToMovie(movieId , videoUrl);

        res.status(200).json({message : 'movie was updated successfully' , movie : updatedMovie});

    }catch(err){

        res.status(400).json({error : err.message || 'something went wrong'});
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

exports.getMovieById = async (req , res)=>{

    try{

        const movie = await MovieService.getMovieById(req.params.id);
        const showtimes = await ShowtimeService.getShowtimeByMovieId(movie.id);
        res.status(200).json({message : 'movie was fetched successfully' , movie , showtimes});

    }catch(err){

        res.status(400).json({error : err.message});

    }

}

exports.getRealtedMovies = async (req , res)=>{


        try{

            const movieId = req.params.id;

            const realted = await MovieService.getRealtedMovies(movieId);

            res.status(200).json({message:'movie realteds' , realted})

            if(!realted){
                return res.status(404).json({message:'no realteds'});
            }


        }catch(err){
            res.status(400).json({error: err.message})
        }
    }

    

 exports.getLatestMovies = async (req , res )=>{

    try{

        const latestMovies = await MovieService.getLatestMovies();

        if(!latestMovies){

            return res.status(402).json({message:'no latest movies'});
        }


        return res.status(200).json({message:'latest movies fetched successfully' , latestMovies})

    }catch(err){

        return res.status(500).json({message: err.message});
    }

 }   

