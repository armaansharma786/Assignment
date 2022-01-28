
const express      = require('express');
const router       = express.Router();

const recordValidator = require('../validator/recordValidator');
const recordController = require('../controller/recordController');
 
router.post('/get', recordValidator.getRecords, recordController.getRecords);

module.exports = router;
 