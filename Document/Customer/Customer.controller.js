const express = require('express');
const router = express.Router();
const CustomerService = require('./Customer.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:cusid', getByCusId);

module.exports = router;



function register(req, res, next) {
    CreateCusID().then(function(CustomerID){

        req.body.CustomerID = CustomerID ;
        console.log( req.body.CustomerID);
    CustomerService.create(req.body)
        .then(customer => res.json(customer))
        .catch(err => next(err));
    })
}
    
   

function getAll(req, res, next) {
    CustomerService.getAll()
        .then(Customers => res.json(Customers))
        .catch(err => next(err));
}


function getByCusId(req, res, next) {
    CustomerService.getByCusId(req.params.cusid)
        .then(Customers => Customers ? res.json(Customers) : res.sendStatus(404))
        .catch(err => next(err));
}

function  CreateCusID(){
    return CustomerService.CreateCustomerID().then(CustomerID => {return CustomerID});
}