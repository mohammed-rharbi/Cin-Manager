const express = require('express');
const movieController = require('../controllers/movieController');
const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');
// const upload = require('../middlewares/upload');



const router = express.Router();


router.get('/allMovies' , movieController.getMovies);

router.use(authMiddlware , isAdmin);


router.post('/createMovie' , movieController.createMovie );
router.put('/updateMovie/:id' , movieController.updateMovie);
router.delete('/deleteMovie/:id' , movieController.deleteMovie);

module.exports = router;