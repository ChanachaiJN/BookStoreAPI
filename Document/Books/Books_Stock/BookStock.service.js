const db = require('../../../UtilityService/db');
const BookStocks = db.BookStocks;
const BookData = db.BookDatas;
module.exports = {
    getAll,
    getById,
    getByKEY,
    create,
    delete: _delete,
    getByBookName,
    getAvailByBookName,
    deleteByItemKEY: _deleteByItemKEY,
    updateIsRent
};


async function getAll() {
    return await BookStocks.find();
}

async function getById(id) {
    return await BookStocks.findById(id);
}
async function getByKEY(id) {
    return await BookStocks.findOne({
        ItemKEY: id
    });
}
async function getByBookName(bookName) {
    return await BookStocks.find({
        bookName: bookName
    });
}

async function getAvailByBookName(bookName) {

    let Availstock = await BookStocks.find({
        bookName: bookName,
        isRent: false
    });
    if(Availstock.length < 2){
        throw bookName + ' only has 1 '
    }

    return await BookStocks.findOne({
        bookName: bookName,
        isRent: false
    });
}
async function create(userParam) {


    const bookstock = new BookStocks(userParam);
    let currentbookdata = await BookData.findOne({
        bookName: userParam.bookName
    });
    let currentbookstock = await BookStocks.findOne({
        ItemKEY: userParam.ItemKEY
    });
    if (!currentbookdata) throw userParam.bookName + ' not exist in Shelf'
    if (currentbookstock) throw userParam.ItemKEY + '  exist in System'

    // save user
    await bookstock.save();
    return await bookstock;
}

async function _delete(id) {
    await BookStocks.findByIdAndRemove(id);
}
async function _deleteByItemKEY(id) {
    const BookStocks = BookStocks.findOne({
        ItemKEY: id
    });
    await BookStocks.findByIdAndRemove(BookData.id);
}

async function updateIsRent(ItemKEY, isRent) {
    let book = await BookStocks.findOne({
        ItemKEY: ItemKEY
    });

    // validate
    if (!book) throw 'Book not found';
    book.isRent = isRent;

    await book.save();
}