const Joi = require('joi')

module.exports.droneSchema = Joi.object({
       name: Joi.string().required(),
       size:Joi.string().required(),
       battery: Joi.string().required(),
       video:Joi.string().required(),
       description:Joi.string().required(),
       specification: Joi.string().required(),
       deleteImages:Joi.array()
    }).required()

   
 module.exports.projectSchema = Joi.object({
 
    name: Joi.string().required(),
    description:Joi.string().required(),
    drones: Joi.array().items(Joi.string()) ,
    link: Joi.string().required(),
    deleteImages:Joi.array()
   }).required()


   module.exports.ContactSchema = Joi.object({
      name:Joi.string().required(),
      email:Joi.string().email().required(),
      subject:Joi.string().required(),
      message:Joi.string().required()
   }).required()