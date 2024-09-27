const ShowtimeRepositories = require('../repositories/showTimeRepositories');
const roomRepositories = require('../repositories/roomRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const mongoose = require('mongoose');
const showtimeService = require('../services/showTimeService');


jest.mock('../repositories/showTimeRepositories');
jest.mock('../repositories/roomRepositories');
jest.mock('../repositories/seatRepositories');


describe('showtimeService', () => {


    afterEach(() => {
        jest.clearAllMocks();
    });

    
   
    test('should create a new showtime', async () => {
        const showtimeData = {
            movie: 'movie123',
            time: new Date(),
            room: new mongoose.Types.ObjectId(),
            price: 15.99
        };

        const roomSeats = [{ seatNumber: 1 }, { seatNumber: 2 }];

        const createdShowtime = {
            _id: new mongoose.Types.ObjectId(),
            ...showtimeData,
            seats: roomSeats
        };

        roomRepositories.getRoomById.mockResolvedValue({ _id: showtimeData.room });
        seatRepositories.getRoomSeats.mockResolvedValue(roomSeats);
        ShowtimeRepositories.getShowtimeByRoomAndTime.mockResolvedValue(null); 

        ShowtimeRepositories.create.mockResolvedValue(createdShowtime);

        const result = await showtimeService.createShowtime(showtimeData);

        expect(roomRepositories.getRoomById).toHaveBeenCalledWith(showtimeData.room);
        expect(seatRepositories.getRoomSeats).toHaveBeenCalledWith(showtimeData.room);
        expect(ShowtimeRepositories.getShowtimeByRoomAndTime).toHaveBeenCalledWith(showtimeData.room, showtimeData.time);
        expect(ShowtimeRepositories.create).toHaveBeenCalledWith({ movie: showtimeData.movie,
            time: showtimeData.time,
            room: showtimeData.room,
            price: showtimeData.price,
            seats: roomSeats
        });
        expect(result).toEqual(createdShowtime);
    }, 10000); 




    test('should get Available Showtimes  ', async () => {
        
        ShowtimeRepositories.getAvailableShowtimes.mockResolvedValue();

        const result = await showtimeService.getAllShowtimes();

        expect(ShowtimeRepositories.getAvailableShowtimes).toHaveBeenCalled();
        expect(result);
    });



    test('should update an existing showtime', async () => {

        const showtimeData = { movieId: 'movie123', roomId: 'room123', startTime: new Date() };
        const updatedShowtime = { _id: 'showtime123', ...showtimeData };

        ShowtimeRepositories.updateShowtime.mockResolvedValue(updatedShowtime);

        const result = await showtimeService.updateShowtime('showtime123', showtimeData);

        expect(ShowtimeRepositories.updateShowtime).toHaveBeenCalledWith('showtime123', showtimeData);
        expect(result).toEqual(updatedShowtime);
    });



    test('should delete an existing showtime', async () => {

        const deletedShowtime = { _id: 'showtime123' };

        ShowtimeRepositories.deleteShowtime.mockResolvedValue(deletedShowtime);

        const result = await showtimeService.deleteShowtime('showtime123');

        expect(ShowtimeRepositories.deleteShowtime).toHaveBeenCalledWith('showtime123');
        expect(result).toEqual(deletedShowtime);
    });



    test('should throw an error when deleting a non-existent showtime', async () => {

        ShowtimeRepositories.deleteShowtime.mockResolvedValue(null);

        await expect(showtimeService.deleteShowtime('nonexistentShowtimeId')).rejects.toThrow('Showtime not found');
    });


})