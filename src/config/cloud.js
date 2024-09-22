const cloud = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');



cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_Key,
    api_secret: process.env.CLOUD_API_KeySecret
});


const storage = new CloudinaryStorage({

    cloudinary: cloud,

    params: {
        folder: 'cinema-manager',
        allowedFormats: ['jpg' , 'png' , 'jpeg']
    }

});


module.exports = {storage , cloud};
