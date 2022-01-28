

const Joi         = require('joi');
const validator   = require('../joiValidator');

exports.getRecords           = getRecords;

function getRecords(req, res, next){
  let schema = Joi.object().keys({
    startDate: Joi.date().required(),
    endDate  : Joi.date().required(),
    minCount : Joi.number().integer().positive().required(),
    maxCount : Joi.number().positive().required(),
  });
  let validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next()
  }
}