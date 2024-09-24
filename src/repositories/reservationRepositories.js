const resrevation = require('../models/reservationSchema');




class resrevationRepositories {


async create (userId , {showTimeId , seateId}) {

        
console.log(userId , showTimeId , seateId);
    const newReservation = new resrevation({
        user : userId,
        showtime : showTimeId,
        seat : seateId
    });

    return await newReservation.save();
}
async getAll () {


    return await resrevation.find();
}

async update (reservationId , reservationData){

    return await resrevation.findByIdAndUpdate(reservationId , reservationData);
}

async delete (reservationId){

    return await resrevation.findByIdAndDelete(reservationId);
}

async getActiveReservations () {

    return await resrevation.find({status : 'active'});
}

async getReservationById (reservationId) {

    return await resrevation.findById(reservationId);
}


}

module.exports = new resrevationRepositories()