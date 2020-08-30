const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const schema = new Schema({
    bookName: { type: String,  required: true,unique:true },
    bookPrice :{type: Number,  required: true},
    rentPrice :{type: Number,  required: true},
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Book', schema,'books_Data');