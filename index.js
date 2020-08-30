require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('../BookStoreAPI/UtilityService/jwt');
const errorHandler = require('../BookStoreAPI/UtilityService/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
 app.use(jwt());

// api routes
app.use('/users', require('./Document/User/users.controller'));
app.use('/customer',require('./Document/Customer/Customer.controller'));
app.use('/books',require('./Document/Books/Books.controller'));
app.use('/rent',require('./Document/rent.controller'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
