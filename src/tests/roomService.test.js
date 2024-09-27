const roomRepositories = require('../repositories/roomRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const { save } = require('../repositories/userRepositories');
const roomService = require('../services/roomService');

jest.mock('../repositories/roomRepositories');
jest.mock('../repositories/seatRepositories');


describe('room service' , ()=>{


    test('schold create a room successfully' , async ()=>{

        const mockRoom = {name : 'agora' , capacity:100 , type:'3d'  };
        const newRoom = {id:'123' , ...mockRoom , save : jest.fn().mockResolvedValue(true)};


        roomRepositories.create.mockResolvedValue(mockRoom);
        const result = roomService.createRoom(mockRoom);
        expect(result).toEqual(mockRoom);

    })










    // describe('createRoom', () => {
    //     test('should create a room and associated seats', async () => {
    //         const roomData = { name: 'Room 1', capacity: 3, type: 'VIP' };
    //         const newRoom = { _id: 'roomId123', ...roomData, save: jest.fn().mockResolvedValue(true) };
    //         const createdSeats = [{ _id: 'seat1' }, { _id: 'seat2' }, { _id: 'seat3' }];

    //         roomRepositories.create.mockResolvedValue(newRoom);
    //         seatRepositories.createSeat
    //             .mockResolvedValueOnce(createdSeats[0])
    //             .mockResolvedValueOnce(createdSeats[1])
    //             .mockResolvedValueOnce(createdSeats[2]);

    //         const result = await RoomService.createRoom(roomData);

    //         expect(roomRepositories.create).toHaveBeenCalledWith(roomData);

    //         expect(seatRepositories.createSeat).toHaveBeenCalledTimes(3);
    //         expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 1, room: newRoom._id });
    //         expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 2, room: newRoom._id });
    //         expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 3, room: newRoom._id });

    //         expect(newRoom.seats).toEqual(createdSeats.map(seat => seat._id));
    //         expect(newRoom.save).toHaveBeenCalled();

    //         expect(result).toEqual(true);
    //     });
    // });

})
