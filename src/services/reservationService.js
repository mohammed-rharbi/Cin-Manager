const resrevationRepositories = require('../repositories/reservationRepositories');
const showTimeRepositories = require('../repositories/showTimeRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const userRepositories = require('../repositories/userRepositories');
const mailer = require('../config/mailer');



class resrevationService {


    async createReservation(userId , {showTimeId , seateId}) {

        if(!userId) {
            throw new Error('user is required');
        }

        if(!showTimeId || !seateId) {
            throw new Error('showTime and seate are required');
        }
        
        const showtime = showTimeRepositories.getShowtimeById(showTimeId);

        if(!showtime) {
            throw new Error('showtime not found');
        }

        const seate =  await seatRepositories.getSeatById(seateId);

        if(!seate) {
            throw new Error('seate is not available');
        }
        
        seatRepositories.setSeatUnavailable(seateId);

        const reservation = await resrevationRepositories.create(userId , {showTimeId , seateId});


        const  resever = await userRepositories.getUserById(userId);
        if(!resever) throw new Error('user not found');

        const email = resever.email;





        const emailContent = mailer.generateEmail(reservation);

        await mailer.sendConfirmation(email  , emailContent);
        

        return reservation;
    }


    async updateReservation(reservationId , userId ,reservationData){

     
        const reservation = await resrevationRepositories.getReservationById(reservationId);
        if (!reservation) {
            throw new Error('reservation not found');
        }
        
        if(reservation.user.toString() !== userId){
            throw new Error('unauthorized');
        }

        if(reservationData.seat){

            const seat = await seatRepositories.getSeatById(reservationData.seat);

            if(!seat || seat.isAvailable == false){ 
                throw new Error('seate is not available');
            }

            seatRepositories.setSeatUnavailable(reservation.seat);
            const newSeat = await seatRepositories.setSeatAvailable(reservationData.seat);

            reservation.seat = newSeat._id;
        }

        if(reservationData.showTime){
            
            reservation.showtime = reservationData.showTime;
        }


        return reservation;
        // return await resrevationRepositories.update(id , reservationData);
        
    }



    async getAllReservations() {

        return await resrevationRepositories.getAll();
        
    }


    async cancelReservation(reservationId , userId){

        const reservation = await resrevationRepositories.getReservationById(reservationId);
        if (!reservation) {
            throw new Error('reservation not found');
        }
        
        if(reservation.user.toString() !== userId){
            throw new Error('unauthorized');
        }

        // reservation.status = 'canceled';
        resrevationRepositories.updateStatus(reservationId);
        seatRepositories.setSeatAvailable(reservation.seat);

        return reservation;
    }


    async getAllUserReservations(userId) {

        return await resrevationRepositories.getReservationById(userId);
    }

}


module.exports = new resrevationService()