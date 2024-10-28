const room = require('../models/roomSchema');




class RoomRepository {


    async create(roomData){

        const newRoom = new room(roomData);
        return await newRoom.save();

    }

    async getAllRooms(){

        return await room.find().populate('seats');
    }

    async updateRoom(id , {name , capacity , type , description , image}){

        return await room.findByIdAndUpdate(id , {name : name , capacity: capacity , type: type , image: image , description: description} , {new : true});
    }

    async deleteRoom(id){

        return await room.findByIdAndDelete(id);
    }

    async getRoomById(id){

        return await room.findById(id);
    }

}

module.exports =  new RoomRepository();