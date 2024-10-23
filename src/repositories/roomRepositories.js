const room = require('../models/roomSchema');




class RoomRepository {


    async create(roomData){

        const newRoom = new room(roomData);
        return await newRoom.save();

    }

    async getAllRooms(){

        return await room.find().populate('seats');
    }

    async updateRoom(id , roomData){

        return await room.findByIdAndUpdate(id , roomData , {new : true});
    }

    async deleteRoom(id){

        return await room.findByIdAndDelete(id);
    }

    async getRoomById(id){

        return await room.findById(id);
    }

}

module.exports =  new RoomRepository();