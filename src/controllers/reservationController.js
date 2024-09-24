const reservationService = require('../services/reservationService');




exports.createReservation = async (req , res)=>{


    try{

        const userId = req.user.id;

        const {showTimeId , seateId} = req.body;

        //  console.log(showTimeId , seateId);


        const reservation = await reservationService.createReservation(userId , {showTimeId , seateId} );
        res.status(201).json({message : 'reservation was created successfully' , reservation : reservation});

    }catch(err){
        res.status(400).json({error : err.message});

    }


}