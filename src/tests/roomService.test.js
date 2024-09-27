const roomRepositories = require('../repositories/roomRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const { save } = require('../repositories/userRepositories');
const roomService = require('../services/roomService');

jest.mock('../repositories/roomRepositories');
jest.mock('../repositories/seatRepositories');


describe('room service' , ()=>{


    test('should create a room and associated seats', async () => {
        const roomData = { name: 'Room 1', capacity: 3, type: 'VIP' };
        const newRoom = { _id: 'roomId123', ...roomData, save: jest.fn().mockResolvedValue(true) };
        const createdSeats = [{ _id: 'seat1' }, { _id: 'seat2' }, { _id: 'seat3' }];

        roomRepositories.create.mockResolvedValue(newRoom);
        seatRepositories.createSeat
            .mockResolvedValueOnce(createdSeats[0])
            .mockResolvedValueOnce(createdSeats[1])
            .mockResolvedValueOnce(createdSeats[2]);

        const result = await roomService.createRoom(roomData);


        expect(roomRepositories.create).toHaveBeenCalledWith(roomData);


        expect(seatRepositories.createSeat).toHaveBeenCalledTimes(3);
        expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 1, room: newRoom._id });
        expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 2, room: newRoom._id });
        expect(seatRepositories.createSeat).toHaveBeenCalledWith({ seateNumber: 3, room: newRoom._id });

        expect(newRoom.seats).toEqual(createdSeats.map(seat => seat._id));
        expect(newRoom.save).toHaveBeenCalled();

        expect(result).toEqual(true);
    });


    test('should retrieve all rooms', async () => {
        const rooms = [{ _id: 'room1' }, { _id: 'room2' }];
        roomRepositories.getAllRooms.mockResolvedValue(rooms);

        const result = await roomService.getAllRooms();

        expect(roomRepositories.getAllRooms).toHaveBeenCalled();
        expect(result).toEqual(rooms);
    });


    test('should update a room by ID', async () => {
        const id = 'room123';
        const roomData = { name: 'Updated Room', capacity: 50 };
        const updatedRoom = { _id: id, ...roomData };

        roomRepositories.updateRoom.mockResolvedValue(updatedRoom);

        const result = await roomService.updateRoom(id, roomData);

        expect(roomRepositories.updateRoom).toHaveBeenCalledWith(id, roomData);
        expect(result).toEqual(updatedRoom);
    });
    

    test('should delete a room and its associated seats', async () => {
        const roomId = 'room123';

        seatRepositories.deletByRoom.mockResolvedValue(true);
        roomRepositories.deleteRoom.mockResolvedValue({ _id: roomId });

        await roomService.deleteRoom(roomId);


        expect(seatRepositories.deletByRoom).toHaveBeenCalledWith(roomId);
        expect(roomRepositories.deleteRoom).toHaveBeenCalledWith(roomId);
    });


    test('should throw an error when deleting a non-existent room', async () => {

        seatRepositories.deletByRoom.mockResolvedValue(null);
        roomRepositories.deleteRoom.mockResolvedValue(null);

        await expect(roomService.deleteRoom('nonexistentRoomId')).rejects.toThrow('room not found');

        expect(roomRepositories.deleteRoom).toHaveBeenCalledWith('nonexistentRoomId');
    });


})
