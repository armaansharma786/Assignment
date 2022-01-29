const express      = require('express');
const router       = express.Router();

const recordValidator = require('../validator/recordValidator');
const recordController = require('../controller/recordController');

//API to fetch the records
router.post('/fetch', recordValidator.fetchRecords, recordController.fetchRecords);

module.exports = router;
 