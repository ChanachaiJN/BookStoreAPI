const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const schema = new Schema({
    CustomerID:{type: String, required: true,unique:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: String, default: new moment.utc().format('YYYY-MM-DD') }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;

    }
});

module.exports = mongoose.model('Customer', schema,'Customer');