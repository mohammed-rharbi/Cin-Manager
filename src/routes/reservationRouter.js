const express = require('express');
const reservationController = require('../controllers/reservationController');
const { isCustomer, authMiddlware } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management
 */

// All routes below require authentication as a customer
router.use(authMiddlware, isCustomer);

/**
 * @swagger
 * /api/reservation/createReservation:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtimeId:
 *                 type: string
 *                 description: ID of the showtime
 *               seatNumber:
 *                 type: string
 *                 description: Number of the seat to reserve
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/createReservation', reservationController.createReservation);

/**
 * @swagger
 * /api/reservation/cancelReservation/{id}:
 *   post:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the reservation to cancel
 *     responses:
 *       200:
 *         description: Reservation cancelled successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.post('/cancelReservation/:id', reservationController.cancelReservation);

/**
 * @swagger
 * /api/reservation/getAllReservations:
 *   get:
 *     summary: Get all reservations of the current user
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: A list of reservations
 *       401:
 *         description: Unauthorized
 */
router.get('/getAllReservations', reservationController.getUserReservations);

/**
 * @swagger
 * /api/reservation/updateReservation/{id}:
 *   put:
 *     summary: Update a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the reservation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *                 description: Updated seat number
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.put('/updateReservation/:id', reservationController.updateReservation);

module.exports = router;
