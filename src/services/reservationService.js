const resrevationRepositories = require('../repositories/reservationRepositories');
const showTimeRepositories = require('../repositories/showTimeRepositories');
const seatRepositories = require('../repositories/seatRepositories');



class resrevationService {


    async createReservation(userId , {showTimeId , seateId}) {

        if(!userId) {
            throw new Error('user is required');
        }

        // console.log(userId);


        if(!showTimeId || !seateId) {
            throw new Error('showTime and seate are required');
        }
        
        const showtime = showTimeRepositories.getShowtimeById(showTimeId);

        if(!showtime) {
            throw new Error('showtime not found');
        }

        const seate =  await seatRepositories.getSeatById(seateId);
        // console.log(seate);

        if(!seate) {
            throw new Error('seate is not available');
        }
        
        seatRepositories.setSeatUnavailable(seateId);


        const reservation = await resrevationRepositories.create(userId , {showTimeId , seateId});

        return reservation;
    }


    async updateReservation(id , reservationData){

        if(!id) {
            throw new Error('id is required');
        }

        if(!reservationData) {
            throw new Error('reservationData is required');
        }

        
        return await resrevationRepositories.update(id , reservationData);
        
    }

    async getAllReservations() {

        return await resrevationRepositories.getAll();
        
    }

}


module.exports = new resrevationService()