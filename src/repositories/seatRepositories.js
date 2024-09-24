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
        return await seat.findOne({_id: id});
    }

    async deletByRoom(RoomId) {

        return await seat.deleteMany({room : RoomId });
    }

    async getRoomSeats(RoomId) {

        return await seat.find({room : RoomId , isAvailable : true});
    }

    async setSeatUnavailable (seatId) {

        return await seat.findByIdAndUpdate(seatId , {isAvailable : false});
    }
}

module.exports = new SeatRepositories()