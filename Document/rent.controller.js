const express = require('express');
const router = express.Router();
const moment = require('moment')
const RentTransactionService = require('./Rent_Transaction/renttransaction.service');
const BookStockService = require('./Books/Books_Stock/BookStock.service');
const BookDataService = require('./Books/Books_Data/BookData.service');

// routes
router.post('/CreateNewRent', CreateNewRent);
router.get('/RentTransaction', getAll);
router.post('/SearchRentTransaction', SearchRentTransaction);
router.get('/RentTransaction/:headerid', getByHeaderId);
router.get('/CurrentTransaction', currentRent);
router.post('/returnbooks', returnbooks);
router.get('/CustomerTransaction/:cusid', getByCusId);
router.get('/BookTransaction/:bookname', getByBookName);
module.exports = router;

function CreateNewRent(req, res, next) {

    RentTransactionService.create(req.body).then(customer => res.json(customer))
    .catch(err => next(err));




}

function SearchRentTransaction(req, res, next) {
console.log(req.body,req.body.keyword);
    RentTransactionService.SearchByKeyWord(req.body.keyword).then(customer => res.json(customer))
    .catch(err => next(err));




}
function currentRent(req,res,next){
    RentTransactionService.getCurrentRent().then(customer => res.json(customer))
    .catch(err => next(err));
}
function returnbooks(req, res, next) {
    RentTransactionService.EndRentTransaction(req.body).then(customer => res.json(customer))
    .catch(err => next(err));
}


function getAll(req, res, next) {
    RentTransactionService.getAll().then(users => res.json(users))
        .catch(err => next(err));
}

function getByHeaderId(req, res, next) {
    RentTransactionService.getByheaderid(req.params.headerid).then(users => res.json(users))
        .catch(err => next(err));
}

function getByCusId(req, res, next) {
    RentTransactionService.getByCustomer(req.params.cusid).then(users => res.json(users))
        .catch(err => next(err));
}

function getByBookName(req, res, next) {
    RentTransactionService.getByBookName(req.params.bookname).then(users => res.json(users))
        .catch(err => next(err));
}
