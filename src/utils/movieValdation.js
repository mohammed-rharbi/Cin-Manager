const joi = require('joi');



const movieValidation = joi.object({

    title : joi.string().min(3).max(50).required(),
    description: joi.string().min(5).max(400).required(),
    deroctor: joi.string().required(),
    duration: joi.number().required(),
    relseDate: joi.date().max('now').required(),
    image: joi.string(),
    vedio: joi.string(),
    gen: joi.string()
});



module.exports = {movieValidation}