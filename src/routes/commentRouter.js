const express = require('express');
const CommentController = require('../controllers/commentController')
const {isCustomer , authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.use(authMiddlware , isCustomer);


router.post('/addComment' , CommentController.addComment );

router.get('/getComments/:id' , CommentController.getComments);


 

module.exports = router;