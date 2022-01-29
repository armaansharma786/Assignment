

const Joi       = require('joi');
const validator = require('../joiValidator');

exports.fetchRecords = fetchRecords;

function fetchRecords(req, res, next){
  let schema = Joi.object().keys({
    startDate: Joi.date().required(),
    endDate  : Joi.date().required(),
    minCount : Joi.number().positive().allow(0).required(),
    maxCount : Joi.number().positive().allow(0).required(),
  });
  let validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next()
  }
}