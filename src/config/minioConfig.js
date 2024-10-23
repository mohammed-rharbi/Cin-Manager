const minio = require('minio');
const dotenv = require('dotenv');


dotenv.config();

const  minioClient = new minio.Client({
    
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: process.env.MINIO_NAME_Key,
    secretKey: process.env.MINIO_KeySecret,
    useSSL: false

})

module.exports = minioClient;