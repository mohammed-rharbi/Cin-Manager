const joi = require('joi');




const loginValidtion = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})


module.exports = loginValidtion