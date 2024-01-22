const Joi = require("joi");

exports.user = Joi.object()
  .keys({
    firstname: Joi.string()
    .min(3)
    .max(40)
    .required(),
    lastname: Joi.string()
    .min(3)
    .max(40)
    .required(),
    email: Joi.string()
    .min(3)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .max(40)
    .required(),
    password: Joi.string()
    .min(3)
    .max(40)
    .required(),
    phone: Joi.string()
    .min(3)
    .max(40)
    .required(),
  });
  exports.userRole = Joi.object()
  .keys({
    id: Joi.number()
    .required(),
    role: Joi.string()
    .required(),
    permissions:Joi.array()
    .required(),
  });
  exports.item = Joi.object()
  .keys({
    name: Joi.string()
    .min(3)
    .max(40)
    .required(),
    itemType: Joi.string()
    .min(3)
    .max(40)
    .required(),
    variant_id: Joi.number()
    .required(),
  });