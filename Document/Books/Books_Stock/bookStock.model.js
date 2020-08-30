const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const schema = new Schema({
    ItemKEY: {
        type: String,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true
    },
    UpdateDate: {
        type: Date,
        default: new moment()
    },
    CreateDate:{ type: String, default: new moment.utc().format('YYYY-MM-DD') },
    isRent: {
        type: Boolean,
        default: false
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;

    }
});

module.exports = mongoose.model('Book_Stock', schema, 'Books_InStock');