const joi = require('joi');



const movieValidation = joi.object({

    title : joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(200).required(),
    image: joi.string(),
    duration: joi.number().required(),
    relseDate: joi.date().required()
});



module.exports = {movieValidation}