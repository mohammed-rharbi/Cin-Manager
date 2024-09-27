const express = require('express');
const movieController = require('../controllers/movieController');
const {isAdmin , authMiddlware} = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/upload');



const router = express.Router();

router.use(authMiddlware);

router.get('/allMovies' , movieController.getMovies);

router.use(isAdmin);

router.post('/createMovie' , movieController.createMovie );
router.put('/updateMovie/:id' , movieController.updateMovie);
router.delete('/deleteMovie/:id' , movieController.deleteMovie);

module.exports = router;