const roomRepositories = require('../repositories/roomRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const showTimeRepositories = require('../repositories/showTimeRepositories');



class RoomService {

    async createRoom(roomData) {

        const { name , capacity , type } = roomData;

        const newRoom = await roomRepositories.create(roomData);



        const seatsPr = [];

        for (let i = 1; i <= capacity; i++) {

           seatsPr.push(seatRepositories.createSeat({ seateNumber: i , room: newRoom._id  })) ;
        }

        const seats = await Promise.all(seatsPr);

        newRoom.seats = seats.map(seat => seat._id);


        return await newRoom.save();

    }

    async getAllRooms() {

        return await roomRepositories.getAllRooms();
    }


    async updateRoom(id , roomData) {

        return await roomRepositories.updateRoom(id , roomData);

    }

    async deleteRoom(id) {
        const showTime = await showTimeRepositories.getShowtimeByRoom(id);
    

        if (!showTime || showTime.length === 0) {
            await seatRepositories.deletByRoom(id);
            return await roomRepositories.deleteRoom(id);
        }
    

        throw new Error('Cannot delete this room because it has associated showtimes.');
    }
    
    

}

module.exports = new RoomService();