const joi = require('joi');



const roomValidation = joi.object({

    name : joi.string().min(3).max(30).required(),
    capacity: joi.number().min(5).max(200).required(),
    type: joi.string().required(),
    description: joi.string(),
    image: joi.string()
});



module.exports = {roomValidation}