const reservationService = require('../services/reservationService');





exports.createReservation = async (req , res)=>{


    try{

        const userId = req.user.id;

        const {showTimeId , seateId} = req.body;

        const reservation = await reservationService.createReservation(userId , {showTimeId , seateId} );
        res.status(201).json({message : 'reservation was created successfully' , reservation : reservation});

    }catch(err){
        res.status(404).json({error : err.message});

    }
}

exports.cancelReservation = async (req , res)=>{

    try{

        const reservationId = req.params.id;
        const userId = req.user.id;

        const reservation = await reservationService.cancelReservation(reservationId , userId);
        res.status(200).json({message : 'reservation was canceled successfully'});
    }catch(err){
        res.status(400).json({error : err.message});
    }

}

exports.updateReservation = async (req , res)=>{


    try{
        const reservationId = req.params.id;
        const userId = req.user.id;
        const reservationData = req.body;
        const reservation = await reservationService.updateReservation(reservationId , userId ,reservationData);

        res.status(200).json({message : 'reservation was updated successfully' , reservation : reservation});
    }catch(err){
        res.status(400).json({error : err.message});
    }
}

exports.getUserReservations = async (req , res)=>{

    try{
        const userId = req.user.id;
        const reservations = await reservationService.getAllReservations(userId);
        res.status(200).json({message : 'reservations were fetched successfully' , reservations : reservations});

    }catch(err){
        res.status(400).json({error : err.message});
    }

}