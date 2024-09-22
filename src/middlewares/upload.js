const {storage} = require('../config/cloud');
const multer = require('multer');


const  upload = multer({storage});

module.exports = upload;