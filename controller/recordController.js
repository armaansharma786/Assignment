
const record = require('../models/record');

exports.getRecords = getRecords;

async function getRecords(req, res){
   try{
     let startDate = req.body.startDate;
     let endDate   = req.body.endDate;
     let minCount  = +req.body.minCount;
     let maxCount  = +req.body.maxCount;

     if(new Date(endDate) < new Date(startDate)){
       return res.status(400).json({
         code: 1,
         msg: "Start Date can't be greater than End Date" 
       })  
     }
     if(minCount > maxCount){
      return res.status(400).json({
        code: 1,
        msg: "Min Count can't be greater than Max Count" 
      })  
     }
     const records = await record.aggregate([
        {
          $project: {
            key: '$key',
            createdAt : '$createdAt',
            totalCount: {
                $sum: '$counts'
            },
            _id: 0
          }
        },
        {
          $match: {
            createdAt: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            },
            totalCount: {
                $gte: minCount,
                $lte: maxCount
            }
          }
        }
     ]);
     return res.json({
       code: 0,
       msg: "Records Fetched SuccessFully",
       record: records  
     })
   }catch(err){
     res.json({
       code: 1,
       msg: "Something went wrong. Please try again later",
       debug: err.stack  
     })
   } 
}