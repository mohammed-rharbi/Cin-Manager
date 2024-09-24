const showtime = require('../models/showTimeSchema');



class ShowtimeRepositories {


async create (showtimeData) {

    return await showtime.create(showtimeData);
}

async getAllShowtimes() {

    return await showtime.find();
}


async getAvailableShowtimes() {

    return await showtime.find({Available : true});
}


async getShowtimeById(id) {


    return await showtime.findById(id);

}

async updateShowtime(id , showtimeData) {


    return await showtime.findByIdAndUpdate(id , showtimeData , {new : true});
}

async deleteShowtime(id) {

    return await showtime.findByIdAndDelete(id);
}

async getShowtimeByRoomAndTime(room , time) {

    return await showtime.findOne({room : room , time : time});
}

}

module.exports = new ShowtimeRepositories();