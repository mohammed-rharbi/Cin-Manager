const showtimeRepositories = require('../repositories/showTimeRepositories');
const roomRepositories = require('../repositories/roomRepositories');
const mailer = require('../config/mailer');
const userRepositories = require('../repositories/userRepositories');
const seatRepositories = require('../repositories/seatRepositories');
const reservationRepositories = require('../repositories/reservationRepositories');
const reservationService = require('../services/reservationService');


jest.mock('../repositories/showTimeRepositories');
jest.mock('../repositories/roomRepositories');
jest.mock('../repositories/seatRepositories');
jest.mock('../repositories/reservationRepositories');
jest.mock('../repositories/userRepositories');
jest.mock('../config/mailer');



describe('reservation service', () => {


    afterEach(() => {
        jest.clearAllMocks();
    });



    test('should create a reservation successfully', async () => {
        const userId = 'user123';
        const reservationData = { showTimeId: 'showtime123', seateId: 'seat123' };
        const showtime = { _id: 'showtime123' };
        const seat = { _id: 'seat123', isAvailable: true };
        const user = { _id: userId, email: 'test@example.com' };
        const createdReservation = { _id: 'reservation123', user: userId, ...reservationData };
        const emailContent = 'Reservation Confirmation Email';
    

        showtimeRepositories.getShowtimeById.mockResolvedValue(showtime);
        seatRepositories.getSeatById.mockResolvedValue(seat);
        seatRepositories.setSeatUnavailable.mockResolvedValue(true);
        reservationRepositories.create.mockResolvedValue(createdReservation);
        userRepositories.getUserById.mockResolvedValue(user);
        mailer.generateEmail.mockReturnValue(emailContent);
        mailer.sendConfirmation.mockResolvedValue(true);
    
        const result = await reservationService.createReservation(userId, reservationData);
    
        expect(showtimeRepositories.getShowtimeById).toHaveBeenCalledWith(reservationData.showTimeId);
        expect(seatRepositories.getSeatById).toHaveBeenCalledWith(reservationData.seateId);
        expect(seatRepositories.setSeatUnavailable).toHaveBeenCalledWith(reservationData.seateId);
        expect(reservationRepositories.create).toHaveBeenCalledWith(userId, reservationData);
        expect(mailer.sendConfirmation).toHaveBeenCalledWith(user.email, emailContent);
        expect(result).toEqual(createdReservation);
    });

    
    test('should throw an error if user is not provided when creating reservation', async () => {
        const reservationData = { showTimeId: 'showtime123', seateId: 'seat123' };
    
        await expect(reservationService.createReservation(null, reservationData)).rejects.toThrow('user is required');
    });

    
    test('should throw an error if showTimeId or seateId is missing when creating reservation', async () => {
        const userId = 'user123';
        
        await expect(reservationService.createReservation(userId, { showTimeId: null, seateId: 'seat123' })).rejects.toThrow('showTime and seate are required');
        await expect(reservationService.createReservation(userId, { showTimeId: 'showtime123', seateId: null })).rejects.toThrow('showTime and seate are required');
    });

    
    test('should throw an error if the seat is not available', async () => {
        const userId = 'user123';
        const reservationData = { showTimeId: 'showtime123', seateId: 'seat123' };
        const showtime = { _id: 'showtime123' };
        const seat = { _id: 'seat123', isAvailable: false };
    
        showtimeRepositories.getShowtimeById.mockResolvedValue(showtime);
        seatRepositories.getSeatById.mockResolvedValue(seat);
    
        await expect(reservationService.createReservation(userId, reservationData)).rejects.toThrow('seate is not available');
    });

    
    test('should cancel a reservation and mark seat as available', async () => {
        const userId = 'user123';
        const reservationId = 'reservation123';
        const reservation = { _id: reservationId, user: userId, seat: 'seat123' };
    
        reservationRepositories.getReservationById.mockResolvedValue(reservation);
        reservationRepositories.updateStatus.mockResolvedValue(true);
        seatRepositories.setSeatAvailable.mockResolvedValue(true);
    
        const result = await reservationService.cancelReservation(reservationId, userId);
    
        expect(reservationRepositories.getReservationById).toHaveBeenCalledWith(reservationId);
        expect(reservationRepositories.updateStatus).toHaveBeenCalledWith(reservationId);
        expect(seatRepositories.setSeatAvailable).toHaveBeenCalledWith(reservation.seat);
        expect(result).toEqual(reservation);
    });
    

})