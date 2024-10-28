const express = require('express');
const roomController = require('../controllers/roomController');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management
 */

/**
 * @swagger
 * /api/room/getRooms:
 *   get:
 *     summary: Retrieve all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A list of rooms
 *       500:
 *         description: Server error
 */
router.get('/getRooms', roomController.getRooms);



router.get('/getRoom/:id' , roomController.getRoomById);


// All routes below require authentication
router.use(authMiddlware);

/**
 * @swagger
 * /api/room/createRoom:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               roomNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/createRoom', upload.single('image'), roomController.createRoom);

// All routes below require admin access
router.use(isAdmin);

/**
 * @swagger
 * /api/room/updateRoom/{id}:
 *   put:
 *     summary: Update an existing room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */

router.put('/updateRoom/:id', upload.single('image'), roomController.updateRoom);

/**
 * @swagger
 * /api/room/deleteRoom/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room to delete
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.delete('/deleteRoom/:id', roomController.deleteRoom);

module.exports = router;
