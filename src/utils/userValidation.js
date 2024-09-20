const joi = require('joi');




const userValidtion = joi.object({

    name : joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})


module.exports = userValidtion