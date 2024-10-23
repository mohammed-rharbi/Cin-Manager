const showtimeService = require('../services/showTimeService');
const {showTimeValodation} = require('../utils/showTimeValodation');





exports.createShowTime = async (req , res)=>{


    try{

        const {error} = showTimeValodation.validate(req.body);
        if(error) throw new Error(error.details[0].message);
        

        const { movie , time , room , price } = req.body;

        const newShowtime = await showtimeService.createShowtime({movie , time , room , price});
        res.status(200).json({message : 'showtime was created successfully',newShowtime});

    }catch(err){

        res.status(400).json({error : err.message})
    }

}

exports.getAllShowTimes = async (req , res) =>{


    try{

        const showTimes = await showtimeService.getAllShowtimes();
         res.status(200).json({message : 'showtimes were fetched successfully' , showTimes});
        
    }catch(err){

        res.status(400).json({error : err.message});

    }

}

exports.updateShowTime = async (req , res)=>{


    try{

        const {movie , time , room , price} = req.body;

        const updatedShowtime = await showtimeService.updateShowtime(req.params.id , {movie , time , room , price});

        res.status(200).json({ message : 'showtime was updated successfully' , updatedShowtime});

    }catch(err){

        res.status(400).json({error : err.message});

    }

}

exports.deleteShowTime = async (req , res)=>{


    try{


        const deletedShowtime = await showtimeService.deleteShowtime(req.params.id);

        res.status(200).json({message : 'showTime was deleted successfully'});

    }catch(err){

        res.status(400).json({error : err.message});

    }

}


exports.getSeats = async (req , res)=>{


    try{

        const seats = await showtimeService.getSetsByShowtime(req.params.id);

        res.status(200).json({message : 'seats were fetched successfully' , seats});
    }catch(err){

        res.status(400).json({error : err.message});
    }
}


exports.getShowtimeById = async (req , res)=>{

    try{


        const showtimes = await showtimeService.getShowtimeById(req.params.id);
        res.status(200).json({message : 'showtime was fetched successfully' , showtimes});
    }catch(err){

        res.status(400).json({error : err.message});
    }
}