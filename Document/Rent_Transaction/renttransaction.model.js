const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const schema = new Schema({
    CustomerID: {
        type: String,
        required: true
    },
    CustomerName:{
        type: String,
        required: true
    },
    CustomerLastName:{
        type: String,
        required: true
    },
    headerid: {
        type: String,
        required: true,
        unique: true
    },
    ItemKEY: {
        type: String,
        required: true
    },
    bookName :{
        type: String,
        required: true
    },
    createdDate: { type: String, default: new moment.utc().format('YYYY-MM-DD') },
    initPrice: {
        type: Number,
        required: true
    },
    rentPrice: {
        type: Number
    },
    StartDate: {
        type: String,
    },
    EndDate: {
        type: String
    },
    isEnd: {
        type: Boolean,
        default: false
    },
    FeePrice: {
        type: Number
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;

    }
});

module.exports = mongoose.model('rentTransaction', schema, 'rent_Transaction');