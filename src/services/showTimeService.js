const ShowtimeRepositories = require('../repositories/showTimeRepositories');
const roomRepositories = require('../repositories/roomRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const seatSchema = require('../models/seatSchema');



class showtimeService {



    async createShowtime(showtimeData) {

        const { movie , time , room , price   } = showtimeData;

        const  roomData = await roomRepositories.getRoomById(room);
        if(!roomData) {
            throw new Error('room not found');
        }

        const roomSeats = await seatRepositories.getRoomSeats(room);

        const existingShowTime = await ShowtimeRepositories.getShowtimeByRoomAndTime(room , time);

        if(existingShowTime) {
            throw new Error('showtime already scheduled');
        }
        
        const seats = roomSeats

         if(!seats) {
            throw new Error('seats not found');
        }

        const newShowtime = await ShowtimeRepositories.create( { movie , time , room , price , seats } );
        

        return newShowtime
    };

    async updateShowtime(id , showtimeData) {


        return await ShowtimeRepositories.updateShowtime(id , showtimeData);

    }

    async getAllShowtimes() {

        return await ShowtimeRepositories.getAvailableShowtimes();
    }

    async getShowtimeById(id) {

        return await ShowtimeRepositories.getShowtimeById(id);
    }

    async deleteShowtime(id) {


        return await ShowtimeRepositories.deleteShowtime(id);

    }

    async getSetsByShowtime(id){


        const showtime = await ShowtimeRepositories.getShowtimeById(id);
        if(!showtime) {
            throw new Error('showtime not found');
        }
       
        const seats = showtime.seats;
        return {seats};
    }
    

}

module.exports = new showtimeService();