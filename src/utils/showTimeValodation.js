const joi = require('joi');



const showTimeValodation = joi.object({

    movie : joi.string().min(3).max(30).required(),
    room: joi.string().min(5).max(200).required(),
    time: joi.date().required(),
    price: joi.number().required(),
});



module.exports = {showTimeValodation}