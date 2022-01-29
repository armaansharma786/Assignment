
 exports.validateFields                              = validateFields;
 
 function validateFields( req, res, schema) {
   let validation = schema.validate(req);//validating the schema
   if(validation.error) {
     var errorReason =
           validation.error.details !== undefined
             ? validation.error.details[0].message
             : 'Parameter missing or parameter type is wrong';
     sendParameterMissingResponse(res, errorReason);
     return false;
   }
   return true;
 }
 
 
 function sendParameterMissingResponse(res, errorReason) {
   errorReason = errorReason || "Required Parameters are missing"
   return res.status(400).json({
     code: 1,
     msg: errorReason
   })
 }