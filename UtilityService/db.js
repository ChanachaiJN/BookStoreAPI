const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect( config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../Document/User/user.model'),
    BookDatas: require("../Document/Books/Books_Data/BookData.model"),
    BookStocks : require ("../Document/Books/Books_Stock/bookStock.model"),
    RentTransaction : require("../Document/Rent_Transaction/renttransaction.model"),
    Customer : require("../Document/Customer/Customer.model")
}