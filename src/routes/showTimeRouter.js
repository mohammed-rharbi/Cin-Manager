const express = require('express');
const showtimeController = require('../controllers/showTimeController');
const { authMiddlware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Showtimes
 *   description: Showtimes management
 */

/**
 * @swagger
 * /api/showTime/allShowtimes:
 *   get:
 *     summary: Retrieve all showtimes
 *     tags: [Showtimes]
 *     responses:
 *       200:
 *         description: A list of all showtimes
 *       500:
 *         description: Server error
 */
router.get('/allShowtimes', showtimeController.getAllShowTimes);

/**
 * @swagger
 * /api/showTime/getShowtime/{id}:
 *   get:
 *     summary: Retrieve a showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the showtime
 *     responses:
 *       200:
 *         description: A showtime object
 *       404:
 *         description: Showtime not found
 */
router.get('/getShowtime/:id', showtimeController.getShowtimeById);

// All routes below require authentication
router.use(authMiddlware);

/**
 * @swagger
 * /api/showTime/getShowTimeSeats/{id}:
 *   get:
 *     summary: Get seats availability for a showtime
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the showtime
 *     responses:
 *       200:
 *         description: A list of seats for the showtime
 *       404:
 *         description: Showtime not found
 */
router.get('/getShowTimeSeats/:id', showtimeController.getSeats);

// All routes below require admin access
router.use(isAdmin);

/**
 * @swagger
 * /api/showTime/createShowtime:
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/createShowtime', showtimeController.createShowTime);

/**
 * @swagger
 * /api/showTime/updateShowtime/{id}:
 *   put:
 *     summary: Update an existing showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the showtime to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Showtime not found
 */
router.put('/updateShowtime/:id', showtimeController.updateShowTime);

/**
 * @swagger
 * /api/showTime/deleteShowtime/{id}:
 *   delete:
 *     summary: Delete a showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the showtime to delete
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Showtime not found
 */
router.delete('/deleteShowtime/:id', showtimeController.deleteShowTime);

module.exports = router;
