const express = require('express');
const router = express.Router();
const BookDataService = require('./Books_Data/BookData.service');
const BookStockService = require('./Books_Stock/bookStock.service');
// routes
router.post('/CreateNewBook', register);
router.post('/ImportBook', importNewBook);
router.get('/Stock/',getAllStock);
router.post('/SearchAvailStockByKeyword',getStockByBookName);
router.get('/BookList/',getAll);
router.post('/SearchBookByKeyword',getFromKeyWord);
module.exports = router;

function register(req,res,next){
    BookDataService.create(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

function getStockByBookName(req,res,next){
    BookStockService.SearchByKeyWord(req.body.keyword)
    .then(stock => res.json(stock))
    .catch(err => next(err));
}


function getFromKeyWord(req,res,next){
    BookDataService.SearchByKeyWord(req.body.keyword)
    .then(stock => res.json(stock))
    .catch(err => next(err));
}


function importNewBook(req,res,next){
    BookStockService.create(req.body)
    .then(stock => res.json(stock))
    .catch(err => next(err));
}

function getAllStock(req,res,next){
    BookStockService.getAll()
    .then(stock => res.json(stock))
    .catch(err => next(err));

}
function getAll(req,res,next){
    BookDataService.getAll()
    .then(stock => res.json(stock))
    .catch(err => next(err));

}