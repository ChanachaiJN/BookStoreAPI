const db = require('../../UtilityService/db');
const BookStockService = require('../Books/Books_Stock/BookStock.service');
const RentHeader = db.RentTransaction;
const Books = db.BookDatas;
const Stock = db.BookStocks;
const Customer = db.Customer;
const moment = require('moment');
const Calculate = require('../../UtilityService/Calculate');
module.exports = {
    getAll,
    getById,
    create,
    delete: _delete,
    getByheaderid,
    EndRentTransaction,
    getByCustomer,
    getByBookName,
    getCurrentRent
};


async function getAll() {
    return await RentHeader.find();
}

async function getById(id) {
    return await RentHeader.findById(id);
}
async function getByheaderid(id) {
    return await RentHeader.findOne({
        headerid: id
    });
}

async function getByCustomer(id) {
    return await RentHeader.find({
        CustomerID: id
    });
}
async function getByBookName(id) {
    return await RentHeader.find({
        bookName: id
    });
}
async function getCurrentRent() {
    return await RentHeader.find({
        isEnd: false
    });
}

async function EndRentTransaction(userParam) {
    let Transaction = await RentHeader.findOne({
        CustomerID: userParam.CustomerID,
        ItemKEY: userParam.ItemKEY,
        isEnd: false
    });
    if (!Transaction) throw 'this Transaction is End Or Not Exists';
    Transaction.EndDate = new moment.utc(userParam.EndDate).format('YYYY-MM-DD');
    let EndTransaction = Calculate.CalRentPrice(Transaction);
    BookStockService.updateIsRent(Transaction.ItemKEY, false);
    const header = new RentHeader(EndTransaction);
    await header.save();

    return await header;
}

async function create(userParam) {


    let currentstocklist = await Stock.find({
        bookName: userParam.bookName,
        isRent: false
    });
    if (currentstocklist.length < 2) throw userParam.bookName + ' only has 1 ';
    let currentCustomer = await Customer.findOne({
        CustomerID: userParam.CustomerID
    });
    let currentstock = await Stock.findOne({
        bookName: userParam.bookName,
        isRent: false
    });
    userParam.CustomerName = currentCustomer.firstName;
    userParam.CustomerLastName = currentCustomer.lastName;
    userParam.ItemKEY = currentstock.ItemKEY;
    userParam.StartDate = new moment.utc(userParam.StartDate).format('YYYY-MM-DD');
    let CurrentBooks = await Books.findOne({
        bookName: userParam.bookName
    });
    console.log(CurrentBooks, CurrentBooks.initPrice);
    userParam.bookName = CurrentBooks.bookName;
    userParam.initPrice = CurrentBooks.rentPrice;
    userParam.headerid = 'HD-' + (await RentHeader.countDocuments() + 1);
    BookStockService.updateIsRent(userParam.ItemKEY, true);
    const header = new RentHeader(userParam);

    // save user
    await header.save();

    return await header;
}

async function _delete(id) {
    const header = RentHeader.find({
        headerid: id
    });
    await RentHeader.findByIdAndRemove(header.id);
}