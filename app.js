
//Required Packages
const express     = require('express');
const createError = require('http-errors');
const app         = express();

//mongo db connection
require('./dbConnection/mongo');


const record     = require('./routes/record');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//require routes
app.use('/record', record);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("here------_>");
  res.status(err.status || 500).send('Something broke!');
});

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down: ERROR: ' + err + ', STACK: ' + err.stack);
  process.exit(1);

});
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down: ERROR: ' + err + ', STACK: ' + err.stack);
  process.exit(1);
});

const port = 3219;

app.listen(port,()=>console.log(`listening on port ${port}...`));

module.exports = app;