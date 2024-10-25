const showtime = require('../models/showTimeSchema');



class ShowtimeRepositories {


async create (showtimeData) {

    return await showtime.create(showtimeData);
}

async getAllShowtimes() {

    return await showtime.find();
}


async getAvailableShowtimes() {

    return await showtime.find({Available : true}).populate('room').populate('movie');

}


async getShowTimeByMovieId(id){

    return await showtime.find({movie : id  , Available : true}).populate('room');

}


async getShowtimeById(id) {


    return await showtime.findById(id).populate('room').populate('movie');

}

async updateShowtime(id , showtimeData) {


    return await showtime.findByIdAndUpdate(id , showtimeData , {new : true});
}

async deleteShowtime(id) {

    return await showtime.findByIdAndDelete({_id: id});
}

async getShowtimeByRoomAndTime(room , time) {

    return await showtime.findOne({room : room , time : time});
}



async getShowtimeByRoom(room ) {

    return await showtime.findOne({room : room });
}


}

module.exports = new ShowtimeRepositories();