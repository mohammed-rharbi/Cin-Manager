const express = require('express');
const movieController = require('../controllers/movieController');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const uploadIT = require('../config/multer');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /api/movie/allMovies:
 *   get:
 *     summary: Retrieve a list of all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of all movies
 *       500:
 *         description: Server error
 */
router.get('/allMovies', movieController.getMovies);

/**
 * @swagger
 * /api/movie/getMovie/{id}:
 *   get:
 *     summary: Retrieve a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: A movie object
 *       404:
 *         description: Movie not found
 */
router.get('/getMovie/:id', movieController.getMovieById);




/**
 * @swagger
 * /api/movie/getRealtedMovies/{id}:
 *   get:
 *     summary: Retrieve Related Movies for a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: A movie object
 *       404:
 *         description: Movie not found
 */

router.get('/getRealtedMovies/:id' , movieController.getRealtedMovies);




/**
 * @swagger
 * /api/movie/allMovies:
 *   get:
 *     summary: Retrieve a list of Latest movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of Latest movies 
 *       500:
 *         description: Server error
 */
router.get('/getLatestMovies' , movieController.getLatestMovies);


// All routes below require authentication
router.use(authMiddlware);

// All routes below require admin access
router.use(isAdmin);

/**
 * @swagger
 * /api/movie/createMovie:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/createMovie', upload.single('image'), movieController.createMovie);

/**
 * @swagger
 * /api/movie/{movieId}/addVideo:
 *   post:
 *     summary: Add a video to a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to which the video will be added
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video added to the movie
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.post('/:movieId/addVideo', uploadIT.single('video'), movieController.addVideoToMovie);

/**
 * @swagger
 * /api/movie/updateMovie/{id}:
 *   put:
 *     summary: Update an existing movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.put('/updateMovie/:id', movieController.updateMovie);

/**
 * @swagger
 * /api/movie/deleteMovie/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.delete('/deleteMovie/:id', movieController.deleteMovie);




module.exports = router;
