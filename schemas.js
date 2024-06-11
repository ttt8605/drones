const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html')
const extension = (joi) => ({
   type: 'string',
   base: joi.string(),
   messages: {
       'string.escapeHTML': '{{#label}} must not include HTML!'
   },
   rules: {
       escapeHTML: {
           validate(value, helpers) {
               const clean = sanitizeHtml(value, {
                   allowedTags: [],
                   allowedAttributes: {},
               });
               if (clean !== value) return helpers.error('string.escapeHTML', { value })
               return clean;
           }
       }
   }
});

const Joi = BaseJoi.extend(extension)

module.exports.droneSchema = Joi.object({
       name: Joi.string().required().escapeHTML(),
       size:Joi.string().required().escapeHTML(),
       battery: Joi.string().required().escapeHTML(),
       video:Joi.string().required().escapeHTML(),
       description:Joi.string().required().escapeHTML(),
       specification: Joi.string().required().escapeHTML(),
       deleteImages:Joi.array()
    }).required()

   
 module.exports.projectSchema = Joi.object({
 
    name: Joi.string().required().escapeHTML(),
    description:Joi.string().required().escapeHTML(),
    drones: Joi.array().items(Joi.string()) ,
    link: Joi.string().required().escapeHTML(),
    deleteImages:Joi.array()
   }).required()


   module.exports.ContactSchema = Joi.object({
      name:Joi.string().required().escapeHTML(),
      email:Joi.string().email().required().escapeHTML(),
      subject:Joi.string().required().escapeHTML(),
      message:Joi.string().required().escapeHTML()
   }).required()