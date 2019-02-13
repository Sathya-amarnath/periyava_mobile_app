const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./api/routes/users');
const categoryRoutes = require('./api/routes/categories');
const loginRoutes=require('./api/routes/login');
const chantRoutes=require('./api/routes/chantcount');

/*mongoose.connect('mongodb://127.0.0.1/mobile_app');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/
mongoose.connect('mongodb+srv://periyava_mn_satsang:' + process.env.MONGO_ATLAS_PW + '@node-rest-satsang-ch9qe.mongodb.net/test?retryWrites=true',{
    useMongoClient:true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/signup', loginRoutes);
app.use('/chant',chantRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;