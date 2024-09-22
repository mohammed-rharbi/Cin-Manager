const seat = require('../models/seatSchema');


class SeatRepositories {


    async createSeat(seatData) {


        const newSeat = new seat(seatData);

        return await newSeat.save();

    }

    async getAllSeats() {
        return await seat.find();
    }

    async getSeatById(id) {
        return await seat.findById(id);
    }

    async deletByRoom(RoomId) {

        return await seat.deleteMany({room : RoomId});
    }

}

module.exports = new SeatRepositories()