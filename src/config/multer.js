const multer = require('multer');
const path = require('path');


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../uploads');
//     cb(null, uploadPath); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

const uploadIT = multer({
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|avi|mkv|mov/; 
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only video files are allowed!'));
  }
}).single('video')

module.exports = uploadIT;
