
const Record = require('../models/record');

exports.fetchRecords = fetchRecords;

async function fetchRecords(req, res){
   try{
     let startDate = req.body.startDate;
     let endDate   = req.body.endDate;
     let minCount  = +req.body.minCount;
     let maxCount  = +req.body.maxCount;

     if(new Date(endDate) < new Date(startDate)){//case when enddate is smaller than start date. return 400
       return res.status(400).json({
         code: 1,
         msg: "Start Date can't be greater than End Date" 
       })  
     }
     if(minCount > maxCount){//case when minCount is greater than maxCount. return 400;
      return res.status(400).json({
        code: 1,
        msg: "Min Count can't be greater than Max Count" 
      })  
     }
     const records = await Record.aggregate([
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
       msg: "Success",
       records: records  
     })
   }catch(err){
     res.json({
       code: 1,
       msg: err.message || "Something went wrong. Please try again later" 
     })
   } 
}