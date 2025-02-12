const roomService = require('../services/roomService');


exports.createRoom = async (req , res)=>{


    const { name , capacity , type , description } = req.body;


    try{

        const image = req.file ? req.file.path : null;
        

        newRoom = await roomService.createRoom({...req.body , image});
        res.status(201).json({message : 'room was created successfully' , room : newRoom});
}

    catch(err){
        res.status(400).json({error : err.message});

    }
}

exports.getRooms = async (req , res)=>{


    try{

        const rooms = await roomService.getAllRooms();

        res.status(200).json({message : 'rooms were fetched successfully' , rooms});

    }catch(err){

        res.status(400).json({error : err.message});

    }

}

exports.updateRoom = async (req , res)=>{


    try{

        console.log(req.body)


        const {name , capacity , type , description  } = req.body 
        
        const image = req.file ? req.file.path : null ;

        
        const updatedRoom = await roomService.updateRoom(req.params.id , {name , capacity , type , description , image});

        res.status(200).json({message : 'room was updated successfully' , room : updatedRoom});

    }catch(err){

        res.status(400).json({error : err.message});

    }
}

exports.deleteRoom = async (req , res)=>{



    try{

        await roomService.deleteRoom(req.params.id);

        

        res.status(200).json({message : 'room was deleted successfully'});
    }

    catch(err){

        res.status(400).json({error : err.message});

    }
}

exports.getRoomById = async (req , res)=>{


    try{

        const roomId = req.params.id 

        const room = await roomService.getRoomById(roomId);
        res.status(200).json({message:"room ftched successfully" , room});

    }catch(err){
        
        res.status(400).json('error while fetching room')
    }
}
