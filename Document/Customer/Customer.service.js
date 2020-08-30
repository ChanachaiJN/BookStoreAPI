const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../UtilityService/db');
const Customer = db.Customer;

module.exports = {
    getAll,
    getById,
    getByCusId,
    create,
    update,
    updateByCusId,
    CreateCustomerID,
    delete: _delete,
    deleteByCusid : _deleteByCusid
};


async function getAll() {
    return await Customer.find();
}

async function getById(id) {
    return await Customer.findById(id);
}
async function getByCusId(id) {
    return await Customer.findOne({CustomerID : id});
}

async function create(userParam) {


    const customer = new Customer(userParam);



    // save user
    await customer.save();

    
    return await customer;
}

async function updateByCusId(id, userParam) {
    const customer = await Customer.findById(id);

    // validate
    if (!Customer) throw 'customer not found';


    // copy userParam properties to user
    Object.assign(customer, userParam);

    await customer.save();

    return await customer;
}

async function update(id, userParam) {
    const customer = await Customer.findById(id);

    // validate
    if (!Customer) throw 'customer not found';


    // copy userParam properties to user
    Object.assign(customer, userParam);

    await customer.save();
}

async function _delete(id) {
    await Customer.findByIdAndRemove(id);
}
async function _deleteByCusid(id) {
    const customer = Customer.findOne({CustomerID : id});
    await Customer.findByIdAndRemove(customer.id);
}
async function CreateCustomerID(){
    return await  'CUS-'+ (await Customer.countDocuments() +1)
}