const joi = require('joi');



const movieValidation = joi.object({

    title : joi.string().min(3).max(30).required(),
    description: joi.string().min(5).max(200).required(),
    deroctor: joi.string().required(),
    duration: joi.number().required(),
    relseDate: joi.date().required(),
    image: joi.string(),
});



module.exports = {movieValidation}